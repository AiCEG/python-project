from flask import Flask, render_template, request, redirect, url_for, jsonify
from todo import get_todos, todos, Todo, update_todo_order

app = Flask(__name__)

@app.route('/')
def home():
    response = request.args.get('response')
    return render_template('index.html', todos=todos, response=response)

@app.route('/add', methods=['POST'])
def add_todo():
    content = request.form.get('content')
    if content:
        new_id = max([todo.id for todo in todos]) + 1 if todos else 1
        new_todo = Todo(new_id, content)
        todos.append(new_todo)
        response = generate_response(content)
        return redirect(url_for('home', response=response))
    return redirect(url_for('home'))

@app.route('/update_order', methods=['POST'])
def update_order():
    new_order = request.json.get('order')
    if new_order:
        update_todo_order(new_order)
    return jsonify(success=True)

def generate_response(input_text):
    return f"You entered: {input_text}"

if __name__ == '__main__':
    app.run(debug=True)
