class Todo:
    def __init__(self, id, content):
        self.id = id
        self.content = content

todos = [
    Todo(1, "Buy groceries"),
    Todo(2, "Clean the house"),
    Todo(3, "Finish this project")
]

def get_todos():
    return todos

def update_todo_order(new_order):
    global todos
    todos = [next(todo for todo in todos if todo.id == id) for id in new_order]
