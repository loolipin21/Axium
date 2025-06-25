from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional
import os
from dotenv import load_dotenv
import httpx
from fastapi.middleware.cors import CORSMiddleware
import json
import re

# Load environment variables from .env
load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

if not OPENAI_API_KEY:
    raise RuntimeError("OPENAI_API_KEY not found in environment variables.")

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

class OpenAIRequest(BaseModel):
    prompt: str
    model: Optional[str] = "gpt-3.5-turbo"
    max_tokens: Optional[int] = 500
    temperature: Optional[float] = 0.7

class OpenAIResponse(BaseModel):
    response: str

@app.post("/recipes", response_model=OpenAIResponse)
async def call_openai(request: OpenAIRequest):
    url = "https://api.openai.com/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {OPENAI_API_KEY}",
        "Content-Type": "application/json"
    }
    data = {
        "model": request.model,
        "messages": [{"role": "user", "content": request.prompt}],
        "max_tokens": request.max_tokens,
        "temperature": request.temperature
    }
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(url, headers=headers, json=data)
            response.raise_for_status()
            result = response.json()
            content = result["choices"][0]["message"]["content"]
            print(content)

            # Extract JSON array from LLM response
            match = re.search(r'(\[.*\])', content, re.DOTALL)
            if not match:
                raise HTTPException(status_code=500, detail="No JSON array found in LLM response.")
            json_str = match.group(1)
            try:
                # Validate JSON
                recipes = json.loads(json_str)
            except Exception as e:
                raise HTTPException(status_code=500, detail=f"Invalid JSON array in LLM response: {e}")

            # Return the validated JSON array as a string
            return OpenAIResponse(response=json.dumps(recipes))
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
