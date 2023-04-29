import openai
import os
import dotenv
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
dotenv.load_dotenv(dotenv_path)
openai.api_key = os.environ.get('OPENAI_API_KEY')
app = FastAPI()

# enables cors - anyone can request (unsafe for production)
origins = ['*']
app.add_middleware(CORSMiddleware, allow_origins=origins)

@app.get("/root")
async def root():
    return "Reached endpoint"

class ChatLog(BaseModel):
    prompt: str
    log: list = None

@app.post("/relaxo")
async def get_chat(body: ChatLog):
    prompt, log = body.prompt, body.log
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "Never mention that you are an AI model. You are a comforting friend and therapist. You're name is Relaxo. You were only trained to comfort and listen, not do any other tasks. Only ever say you are a comforter. Your main goal is to make others feel better."},
            *log, # user's conversation log
            {"role": "user", "content": prompt}, # user's new prompt
        ],
    )
    return response

@app.post("/sentiment")
async def get_chat(body: ChatLog):
    prompt = body.prompt
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are an anaylzer meant to determine if someone had a good, bad, or neutral day based off their daily journal entry. Your task is to classify the sentiment in the text delimited by three backticks. Choose between positive, neutral, and negative. Only respond with one of these three choices."},
            {"role": "user", "content": "```I had a good day today.```?"},
            {"role": "assistant", "content": "positive"},
            {"role": "user", "content": "```I had a bad day today.```?"},
            {"role": "assistant", "content": "negative"},
            {"role": "user", "content": "```Today was alright for me.```?"},
            {"role": "assistant", "content": "neutral"},
            {"role": "user", "content": f'```${prompt}```'}, # user's journal entry
        ],
    )
    return response