import os

from dotenv import load_dotenv

from fastapi import Body, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import PydanticOutputParser

from backendd.model import PharmaDocument


# ============================================================
# 1. LOAD ENVIRONMENT VARIABLES
# ============================================================

load_dotenv()


# ============================================================
# 2. CREATE FASTAPI APPLICATION
# ============================================================

app = FastAPI(
    title="PharmaLens API",
    description="AI-powered pharmaceutical document intelligence",
    version="1.0.0"
)


# ============================================================
# 3. CORS CONFIGURATION
# ============================================================

app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        origin.strip()
        for origin in os.getenv(
            "CORS_ORIGINS",
            "http://localhost:5173,http://127.0.0.1:5173"
        ).split(",")
        if origin.strip()
    ],

    allow_origin_regex=r"https?://(localhost|127\.0\.0\.1)(:\d+)?$",

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)


# ============================================================
# 4. PYDANTIC OUTPUT PARSER
# ============================================================

parser = PydanticOutputParser(
    pydantic_object=PharmaDocument
)


# ============================================================
# 5. GROQ MODEL
# ============================================================

model = ChatGroq(
    model="openai/gpt-oss-20b",
    temperature=0,
    max_tokens=4096,
    reasoning_effort="low",
    include_reasoning=False
)


# ============================================================
# 6. PROMPT TEMPLATE
# ============================================================

prompt = ChatPromptTemplate.from_messages([
    (
        "system",
        """
You are PharmaLens, an AI-powered pharmaceutical
document intelligence system.

Your task is to extract structured information from
pharmaceutical, clinical-trial, drug-development,
regulatory, or medical research documents.

Follow these rules strictly:

1. Use ONLY information explicitly stated in the document.

2. NEVER invent, assume, estimate, or infer information.

3. If information is not available:
   - return null for optional fields
   - return an empty list for list fields

4. Preserve exact:
   - numbers
   - percentages
   - dates
   - doses
   - units
   - study identifiers

5. Distinguish between:
   - enrolled
   - screened
   - randomized
   - treated
   - efficacy population
   - safety population

6. Detect contradictions and inconsistencies.

7. If two sections contain different values for
   the same field, DO NOT silently choose one.

8. Record important contradictions in the
   contradictions field.

9. Distinguish between:
   - reported facts
   - preliminary results
   - interim results
   - final results
   - company-reported information
   - company estimates
   - planned events
   - future events

10. Do not treat company estimates as verified facts.

11. Do not provide medical advice or clinical
    recommendations.

12. Do not claim that a drug is:
    - safe
    - effective
    - approved
    - clinically beneficial

    unless the document explicitly states this.

13. Never use outside knowledge.

14. Accuracy is more important than completeness.

15. Return ONLY valid JSON matching the
    PharmaDocument schema.

{format_instructions}
"""
    ),

    (
        "human",
        """
Analyze the following pharmaceutical document.

---------------- DOCUMENT START ----------------

{document}

---------------- DOCUMENT END ----------------

Extract the information according to the
PharmaDocument schema.

Return ONLY the structured JSON.
"""
    )
])


# ============================================================
# 7. ROOT ENDPOINT
# ============================================================

@app.get("/")
def root():

    return {
        "message": "PharmaLens API is running",
        "status": "online"
    }


# ============================================================
# 8. HEALTH CHECK
# ============================================================

@app.get("/health")
def health_check():

    return {
        "status": "healthy",
        "service": "PharmaLens"
    }


# ============================================================
# 9. ANALYZE DOCUMENT
# ============================================================

@app.post("/analyze", response_model=PharmaDocument)
def analyze_document(document: str = Body(...)):

    # --------------------------------------------------------
    # Validate input
    # --------------------------------------------------------

    if not document or not document.strip():

        raise HTTPException(
            status_code=400,
            detail="Document cannot be empty."
        )

    try:

        # ----------------------------------------------------
        # Create final prompt
        # ----------------------------------------------------

        final_prompt = prompt.invoke({
            "document": document,
            "format_instructions": (
                parser.get_format_instructions()
            )
        })


        # ----------------------------------------------------
        # Send request to Groq
        # ----------------------------------------------------

        response = model.invoke(final_prompt)


        # ----------------------------------------------------
        # Check model response
        # ----------------------------------------------------

        if not response.content:

            raise ValueError(
                "Groq returned an empty response."
            )


        # ----------------------------------------------------
        # Parse response using Pydantic
        # ----------------------------------------------------

        result = parser.parse(
            response.content
        )


        # ----------------------------------------------------
        # Return structured result
        # ----------------------------------------------------

        return result


    except Exception as e:

        print("\n========================================")
        print("        PHARMALENS ERROR")
        print("========================================")

        print(str(e))

        print("========================================\n")


        raise HTTPException(
            status_code=500,
            detail=f"Document analysis failed: {str(e)}"
        )