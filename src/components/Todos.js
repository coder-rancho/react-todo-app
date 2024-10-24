import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";

const todosKey = 'rt-todos';

/**
 * Retrieves stored todos from localStorage.
 * @returns {Array} The list of todos or an empty array if none are found.
 */
function getStoredTodos() {
	try {
		const todos = JSON.parse(localStorage.getItem(todosKey));
		if (Array.isArray(todos)) {
			return todos;
		}
	} catch (error) {
		console.error("Failed to parse todos from localStorage:", error);
	}
	return [];
}

/**
 * Todos component manages the list of todo items, allowing users to add and display tasks.
 *
 * @returns {JSX.Element} The rendered Todos component
 */
const Todos = () => {
	const [todos, setTodos] = useState(getStoredTodos());
	const [newTask, setNewTask] = useState('');
	const [isInvalidInput, setIsInvalidInput] = useState(false);

	/**
	 * Syncs the todos state with localStorage whenever it changes.
	 */
	useEffect(() => {
		localStorage.setItem(todosKey, JSON.stringify(todos));
	}, [todos]);

	/**
	 * Adds a new todo item to the list.
	 * @param {Event} e - The submit event from the form
	 */
	function addItem(e) {
		e.preventDefault();
		document.getElementById('todos__add-item')?.focus();

		if (!newTask.trim()) {
			alert('Task is empty, Please enter the task first.');
			return;
		}

		const newTodo = {
			id: Date.now(),
			task: newTask.trim(),
			isCompleted: false,
		}

		setTodos([...todos, newTodo]);
		setNewTask('');
	}

	/**
	 * Updates the newTask state and manages input validation.
	 * @param {Event} e - The change event from the input
	 */
	function handleNewTaskChange(e) {
		const task = e.target.value;

		if (!task.trim()) {
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
					className={isInvalidInput ? 'invalid-input' : ''}
					id="todos__add-item"
					placeholder="New task"
					value={newTask}
					onChange={handleNewTaskChange} />
				<button type="submit">Add</button>
			</form>
			{
				todos.map((todo, index) => (
					<TodoItem key={todo.id} index={index} todoItem={todo} todos={todos} setTodos={setTodos} />
				))
			}
		</div>
	);
};

export default Todos;
