from dotenv import load_dotenv

from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import PydanticOutputParser

from backendd.model import PharmaDocument


# ============================================================
# 1. LOAD ENVIRONMENT VARIABLES
# ============================================================

load_dotenv()


# ============================================================
# 2. PYDANTIC OUTPUT PARSER
# ============================================================

parser = PydanticOutputParser(
    pydantic_object=PharmaDocument
)


# ============================================================
# 3. GROQ MODEL
# ============================================================

model = ChatGroq(
    model="openai/gpt-oss-20b",
    temperature=0,
    max_tokens=4096,
    reasoning_effort="low",
    include_reasoning=False
)


# ============================================================
# 4. PROMPT TEMPLATE
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
# 5. ANALYZE DOCUMENT FUNCTION
# ============================================================

def analyze_document(document: str) -> PharmaDocument:

    if not document.strip():
        raise ValueError(
            "Document cannot be empty."
        )

    # --------------------------------------------------------
    # Create final prompt
    # --------------------------------------------------------

    final_prompt = prompt.invoke({
        "document": document,
        "format_instructions": (
            parser.get_format_instructions()
        )
    })


    # --------------------------------------------------------
    # Send document to Groq
    # --------------------------------------------------------

    response = model.invoke(final_prompt)


    # --------------------------------------------------------
    # Check model response
    # --------------------------------------------------------

    if not response.content:

        raise ValueError(
            "Groq returned an empty response."
        )


    # --------------------------------------------------------
    # Show raw response for debugging
    # --------------------------------------------------------

    print("\n========================================")
    print("          RAW MODEL RESPONSE")
    print("========================================\n")

    print(response.content)

    print("\n========================================")


    # --------------------------------------------------------
    # Parse response using Pydantic
    # --------------------------------------------------------

    result = parser.parse(
        response.content
    )


    return result


# ============================================================
# 6. TERMINAL APPLICATION
# ============================================================

if __name__ == "__main__":

    print("\n========================================")
    print("         PHARMALENS DOCUMENT ANALYZER")
    print("========================================\n")


    # --------------------------------------------------------
    # Get document
    # --------------------------------------------------------

    document = input(
        "Enter pharmaceutical document:\n\n"
    )


    try:

        # ----------------------------------------------------
        # Analyze document
        # ----------------------------------------------------

        result = analyze_document(document)


        # ----------------------------------------------------
        # Print structured output
        # ----------------------------------------------------

        print("\n\n========================================")
        print("       PHARMALENS STRUCTURED OUTPUT")
        print("========================================\n")

        print(
            result.model_dump_json(
                indent=2
            )
        )


        # ----------------------------------------------------
        # Complete
        # ----------------------------------------------------

        print("\n========================================")
        print("              COMPLETE")
        print("========================================")


    except Exception as e:

        print("\n========================================")
        print("          PHARMALENS ERROR")
        print("========================================\n")

        print(str(e))

        print("\n========================================")