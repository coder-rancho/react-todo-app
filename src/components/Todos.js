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
	const [isInvalidInput, setIsInvalidInput] = useState(false);

	useEffect(() => {
		localStorage.setItem(todosKey, JSON.stringify(todos));
	}, [todos]);

	function addItem(e) {
		e.preventDefault();
		document.getElementById('todos__add-item')?.focus();

		if (!newTask) {
			alert('Please enter the task first.');
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
		const task = e.target.value?.trim(); 

		if (!task) {
			setIsInvalidInput(true);
		} else {
			setIsInvalidInput(false);
		}

		setNewTask(task);
	}

	return (
		<div className="todos">
			<h1 className="todos__heading">Todo App</h1>
			<form className="todos__add-item-form" onSubmit={addItem}>
				<label htmlFor="todos__add-item" aria-label="Add todo item"></label>
				<input
					autoFocus
					className={ isInvalidInput ? 'invalid-input' : ''}
					id="todos__add-item"
					placeholder="New task"
					value={newTask}
					onChange={handleNewTaskChange} />
				<button  type="submit">Add</button>
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
