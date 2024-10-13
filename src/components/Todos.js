import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";

const todosKey = 'rt-todos';

function getStoredTodos() {

	try {
		const todos = JSON.parse(localStorage.getItem(todosKey));

		if (Array.isArray(todos)) {
			return todos;
		}
	} catch (error) {
	}

	return [];
}

const Todos = () => {
	const [todos, setTodos] = useState(getStoredTodos());
	const [newTask, setNewTask] = useState('');

	useEffect(() => {
		console.log(todos)
		localStorage.setItem(todosKey, JSON.stringify(todos));
	}, [todos]);

	function addItem(e) {
		e.preventDefault();

		if (!newTask) {
			alert('Please enter the task.');
			return;
		}

		const newTodo = {
			id: Date.now(),
			task: newTask,
			isCompleted: false,
		}

		setTodos([...todos, newTodo]);
		setNewTask('');
	}

	function handleNewTaskChange(e) {
		setNewTask(e.target.value);
	}


	return (
		<div className="todos">
			<h1>Add your Todos.</h1>
			<form className="todos__add-todo" onSubmit={addItem}>
				<label htmlFor="todos__add-item" aria-label="Add todo item"></label>
				<input
					id="todos__add-item"
					placeholder="New task"
					value={newTask}
					onChange={handleNewTaskChange} />
				<button type="submit">Add</button>
			</form>
			{
				todos.map( (todo, index) => (
					<TodoItem key={todo.id} index={index} todoItem
					={todo} todos={todos} setTodos={setTodos}/>
				))
			}
		</div>
	);
};

export default Todos;
