import motor.motor_asyncio
from urllib.parse import quote_plus  # Import for URL encoding

# ✅ URL-encode username and password
username = quote_plus("rajatkumarpandey333")
password = quote_plus("Rajat_k.r_P@666")

# ✅ MongoDB Connection
MONGO_URI = f"mongodb+srv://{username}:{password}@mongodatabse.p8yvd.mongodb.net/TodoList?retryWrites=true&w=majority"

# ✅ Create a MongoDB Client
client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URI)
database = client.TodoList  # Reference the database
collection = database.todo  # Reference the collection
