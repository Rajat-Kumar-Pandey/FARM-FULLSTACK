from fastapi import APIRouter, HTTPException, Query
from models import Todo, TodoUpdate, Priority
from typing import List, Optional
from crud import (
    fetch_all_todos, fetch_todo_by_id, fetch_todos_by_priority,
    fetch_completed_tasks, fetch_not_completed_tasks, fetch_todos_by_category,
    fetch_todos_by_category_and_priority, create_todo, update_todo, 
    mark_todo_completed, remove_todo, search_todos_by_title
)

router = APIRouter()

# ✅ Get All Todos
@router.get("/todo/all", response_model=List[Todo])
async def get_all_todos():
    return await fetch_all_todos()

# ✅ Search Todos by Title
@router.get("/todo/search", response_model=List[Todo])
async def search_todos(search: str = Query(..., min_length=1)):
    return await search_todos_by_title(search)

# ✅ Filter Todos by Category and Priority
@router.get("/todo/filter", response_model=List[Todo])
async def filter_todos(
    category: Optional[str] = Query(None), 
    priority: Optional[Priority] = Query(None)
):
    if category and priority:
        return await fetch_todos_by_category_and_priority(category, priority)
    elif category:
        return await fetch_todos_by_category(category)
    elif priority:
        return await fetch_todos_by_priority(priority)
    return await fetch_all_todos()

# ✅ Get Todos by Completion Status
@router.get("/todo/completed", response_model=List[Todo])
async def get_completed_todos():
    return await fetch_completed_tasks()

@router.get("/todo/not-completed", response_model=List[Todo])
async def get_not_completed_todos():
    return await fetch_not_completed_tasks()

# ✅ Get Todo by ID
@router.get("/todo/{task_id}", response_model=Todo)
async def get_todo(task_id: int):
    todo = await fetch_todo_by_id(task_id)
    if todo:
        return todo
    raise HTTPException(status_code=404, detail=f"Todo with ID {task_id} not found")

# ✅ Get Todos by Priority
@router.get("/todo/priority/{priority}", response_model=List[Todo])
async def get_priority_todos(priority: Priority):
    return await fetch_todos_by_priority(priority)

# ✅ Create a Todo
@router.post("/todo", response_model=Todo)
async def create_todo_item(todo: Todo):
    response = await create_todo(todo.model_dump())
    if response:
        return response
    raise HTTPException(status_code=400, detail="Failed to create task")

# ✅ Update a Todo
@router.put("/todo/{task_id}")
async def update_todo_handler(task_id: int, todo: TodoUpdate):
    update_data = todo.model_dump(exclude_unset=True)

    if not update_data:
        raise HTTPException(status_code=400, detail="No fields provided for update")

    response = await update_todo(task_id, update_data)
    if response:
        return {"message": f"Todo {task_id} updated successfully"}
    
    raise HTTPException(status_code=404, detail="Todo not found or no changes made")

# ✅ Mark Todo as Completed
@router.put("/todo/complete/{task_id}")
async def mark_completed(task_id: int):
    response = await mark_todo_completed(task_id)
    if response:
        return {"message": f"Marked task ID {task_id} as completed"}
    raise HTTPException(status_code=404, detail="Todo not found or already completed")

# ✅ Delete a Todo
@router.delete("/todo/{task_id}")
async def delete_todo(task_id: int):
    response = await remove_todo(task_id)
    if response:
        return {"message": f"Deleted task ID {task_id}"}
    raise HTTPException(status_code=404, detail=f"Todo with ID {task_id} not found")
