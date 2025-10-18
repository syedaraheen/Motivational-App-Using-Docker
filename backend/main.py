from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import random

app = FastAPI(title="Daily Motivation API", version="1.0.0")

# Add CORS middleware to allow frontend to call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://frontend:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Motivational quotes database
MOTIVATIONAL_QUOTES = [
    "Stay positive and keep coding!",
    "Every expert was once a beginner. Every pro was once an amateur.",
    "The only way to do great work is to love what you do.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "The future belongs to those who believe in the beauty of their dreams.",
    "Don't watch the clock; do what it does. Keep going.",
    "The way to get started is to quit talking and begin doing.",
    "Innovation distinguishes between a leader and a follower.",
    "Life is what happens to you while you're busy making other plans.",
    "The only impossible journey is the one you never begin."
]

@app.get("/")
async def root():
    return {"message": "Daily Motivation API is running!"}

@app.get("/api/message")
async def get_motivational_message():
    """Return a random motivational quote"""
    quote = random.choice(MOTIVATIONAL_QUOTES)
    return {"message": quote, "author": "Daily Motivation App"}

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)