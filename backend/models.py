from pydantic import BaseModel
from typing import Optional
from enum import Enum

class Priority(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"

class Todo(BaseModel):
    id: Optional[str] = None  # ✅ Allow missing id
    task_id: Optional[int] = None  # ✅ Let FastAPI generate it
    title: str
    description: str
    category: str
    priority: Priority = Priority.low
    completed: bool = False
    created_at: Optional[str] = None  # ✅ Allow missing created_at


# ✅ New: Partial Update Model
class TodoUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    priority: Optional[Priority] = None
    completed: Optional[bool] = None