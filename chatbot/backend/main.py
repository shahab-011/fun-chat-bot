import os

from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from langchain_groq import ChatGroq
from langchain_core.messages import AIMessage, HumanMessage, SystemMessage


app = FastAPI(title="Teacher AI API")

cors_origins_raw = os.getenv("CORS_ORIGINS", "*")
allowed_origins = [origin.strip() for origin in cors_origins_raw.split(",") if origin.strip()]
is_wildcard = "*" in allowed_origins

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=not is_wildcard,
    allow_methods=["*"],
    allow_headers=["*"],
)

model_name = os.getenv("GROQ_MODEL", "openai/gpt-oss-20b")
model = ChatGroq(
    model=model_name,
    temperature=0,
    max_tokens=1024,
)

MODES = {
    "angry": "You are an angry teacher. Respond to the user in an angry tone.",
    "depressed": "You are a depressed teacher. Respond to the user in a depressed tone.",
    "happy": "You are a happy teacher. Respond to the user in a happy tone.",
    "sad": "You are a sad teacher. Respond to the user in a sad tone.",
}

messages = []
current_mode = None

class ChatRequest(BaseModel):
    message: str
    mode: str

@app.get("/")
def home():
    return {"message": "Teacher AI API is running"}

@app.post("/chat")
def chat(request: ChatRequest):
    global messages
    global current_mode

    if request.mode not in MODES:
        return {"response": "Invalid teacher mode."}

    if current_mode != request.mode:
        current_mode = request.mode
        messages = [SystemMessage(content=MODES[request.mode])]

    messages.append(HumanMessage(content=request.message))
    response = model.invoke(messages)
    messages.append(AIMessage(content=response.content))

    return {"response": response.content}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="127.0.0.1", port=8000, reload=False)
