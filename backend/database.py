import os
from dotenv import load_dotenv # type: ignore
import motor.motor_asyncio # type: ignore
from urllib.parse import quote_plus  # Import for URL encoding

# ✅ Load environment variables from .env file
load_dotenv()

# ✅ Get MongoDB credentials securely
MONGO_USERNAME = quote_plus(os.getenv("MONGO_USERNAME"))
MONGO_PASSWORD = quote_plus(os.getenv("MONGO_PASSWORD"))
MONGO_CLUSTER = os.getenv("MONGO_CLUSTER")
MONGO_DBNAME = os.getenv("MONGO_DBNAME")

# ✅ Construct MongoDB URI
MONGO_URI = f"mongodb+srv://{MONGO_USERNAME}:{MONGO_PASSWORD}@{MONGO_CLUSTER}/{MONGO_DBNAME}?retryWrites=true&w=majority"

# ✅ Create a MongoDB Client
client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URI)
database = client[MONGO_DBNAME]  # Reference the database  
collection = database["todo"]  # Reference the collection
