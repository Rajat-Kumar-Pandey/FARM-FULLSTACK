from fastapi import FastAPI  # type: ignore
from fastapi.middleware.cors import CORSMiddleware  # type: ignore
from routes import router
from dotenv import load_dotenv # type: ignore
import os
from urllib.parse import quote_plus

# ✅ Load environment variables from .env
load_dotenv()

# ✅ Get MongoDB Credentials
MONGO_USERNAME = quote_plus(os.getenv("MONGO_USERNAME"))
MONGO_PASSWORD = quote_plus(os.getenv("MONGO_PASSWORD"))

# ✅ Construct MongoDB Connection String
MONGO_URI = f"mongodb+srv://{MONGO_USERNAME}:{MONGO_PASSWORD}@mongodatabse.p8yvd.mongodb.net/TodoList?retryWrites=true&w=majority"

# ✅ Get Other Configurations
SECRET_KEY = os.getenv("SECRET_KEY")
BACKEND_HOST = os.getenv("BACKEND_HOST", "0.0.0.0")
BACKEND_PORT = int(os.getenv("BACKEND_PORT", 8000))

app = FastAPI()

# ✅ CORS Configuration (Frontend running on Vite)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# ✅ Register Routes
app.include_router(router, prefix="/api", tags=["Todos"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the Todo API"}

if __name__ == "__main__":
    import uvicorn  # type: ignore
    uvicorn.run("main:app", host=BACKEND_HOST, port=BACKEND_PORT, reload=True)
