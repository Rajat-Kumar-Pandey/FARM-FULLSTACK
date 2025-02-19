from database import collection
from bson import ObjectId
from datetime import datetime
from models import Priority

# ✅ Convert MongoDB document to a dictionary
def todo_helper(todo) -> dict:
    return {
        "id": str(todo["_id"]),
        "task_id": todo["task_id"],
        "title": todo["title"],
        "description": todo["description"],
        "category": todo["category"],
        "priority": todo["priority"],
        "completed": todo["completed"],
        "created_at": todo["created_at"]
    }

# ✅ Fetch all Todos (Sorted by task_id)
async def fetch_all_todos():
    todos = []
    cursor = collection.find({}).sort("task_id", 1)
    async for document in cursor:
        todos.append(todo_helper(document))
    return todos

# ✅ Fetch Todo by Task ID
async def fetch_todo_by_id(task_id: int):
    todo = await collection.find_one({"task_id": task_id})
    return todo_helper(todo) if todo else None

# ✅ Search Todos by Title
async def search_todos_by_title(search: str):
    todos = []
    cursor = collection.find({"title": {"$regex": search, "$options": "i"}}).sort("task_id", 1)
    async for document in cursor:
        todos.append(todo_helper(document))
    return todos

# ✅ Fetch Todos by Category
async def fetch_todos_by_category(category: str):
    todos = []
    cursor = collection.find({"category": category.upper()}).sort("task_id", 1)
    async for document in cursor:
        todos.append(todo_helper(document))
    return todos

# ✅ Fetch Todos by Priority
async def fetch_todos_by_priority(priority: Priority):
    todos = []
    cursor = collection.find({"priority": priority.value}).sort("task_id", 1)
    async for document in cursor:
        todos.append(todo_helper(document))
    return todos

# ✅ Fetch Todos by Category and Priority
async def fetch_todos_by_category_and_priority(category: str, priority: Priority):
    todos = []
    query = {"category": category.upper(), "priority": priority.value}
    cursor = collection.find(query).sort("task_id", 1)
    async for document in cursor:
        todos.append(todo_helper(document))
    return todos

# ✅ Fetch Completed Tasks
async def fetch_completed_tasks():
    todos = []
    cursor = collection.find({"completed": True}).sort("task_id", 1)
    async for document in cursor:
        todos.append(todo_helper(document))
    return todos

# ✅ Fetch Not Completed Tasks
async def fetch_not_completed_tasks():
    todos = []
    cursor = collection.find({"completed": False}).sort("task_id", 1)
    async for document in cursor:
        todos.append(todo_helper(document))
    return todos

# ✅ Create a New Todo
async def create_todo(todo: dict):
    last_task = await collection.find_one({}, sort=[("task_id", -1)])
    new_task_id = last_task["task_id"] + 1 if last_task else 1
    todo["task_id"] = new_task_id
    todo["created_at"] = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")

    # ✅ Store category in uppercase for consistency
    if "category" in todo:
        todo["category"] = todo["category"].upper()
    
    result = await collection.insert_one(todo)
    created_todo = await collection.find_one({"_id": result.inserted_id})
    return todo_helper(created_todo)

# ✅ Update a Todo
async def update_todo(task_id: int, update_fields: dict):
    if not update_fields:
        return False  # No fields provided

    result = await collection.update_one({"task_id": task_id}, {"$set": update_fields})
    return result.modified_count > 0

# ✅ Mark Task as Completed
async def mark_todo_completed(task_id: int):
    result = await collection.update_one({"task_id": task_id}, {"$set": {"completed": True}})
    return result.modified_count > 0

# ✅ Delete a Todo
async def remove_todo(task_id: int):
    result = await collection.delete_one({"task_id": task_id})
    return result.deleted_count > 0
