import { useEffect, useState, useRef } from "react";

/**
 * TodoItem component renders a single todo item with functionalities
 * such as editing, deleting, and marking as completed.
 *
 * @param {Object} props - The component props
 * @param {number} props.index - The index of the todo item in the list
 * @param {Object} props.todoItem - The todo item object
 * @param {Array} props.todos - The current list of todos
 * @param {Function} props.setTodos - Function to update the list of todos
 * 
 * @returns {JSX.Element} The rendered TodoItem component
 */
const TodoItem = ({ index, todoItem, todos, setTodos }) => {
	const textareaElem = useRef();
	const [checked, setChecked] = useState(todoItem?.isCompleted ?? false);
	const [isEditing, setIsEditing] = useState(false);
	const [task, setTask] = useState(todoItem?.task ?? '');
	const [todo, setTodo] = useState(todoItem);
	const [isInvalidInput, setIsInvalidInput] = useState(false);

	/**
	 * Focus the textarea when editing mode is active.
	 */
	useEffect(() => {
		if (isEditing) {
			textareaElem.current.focus();
		}
	}, [isEditing]);

	/**
	 * Update the todos state whenever the todo object changes.
	 */
	useEffect(() => {

		if (isInvalidInput) {
			return;
		}

		setTodos(todos.map(item => {
			if (item.id === todo.id) {
				return todo;
			}
			return item;
		}));
	}, [todo]);

	/**
	 * Toggle the completion status of the todo item.
	 */
	function handleCheckbox() {
		setTodo({ ...todo, isCompleted: !checked });
		setChecked(!checked);
	}

	/**
	 * Update the task and validation state based on user input.
	 * @param {Event} e - The change event from the textarea
	 */
	function handleTask(e) {
		const updatedTask = e.target.value;

		if (!updatedTask.trim()) {
			setIsInvalidInput(true);
		} else {
			setIsInvalidInput(false);
		}

		setTask(updatedTask);
		setTodo({ ...todo, task: updatedTask });
	}

	/**
	 * Toggle editing mode and handle initial focus or validation.
	 * @param {Event} e - The click event from the edit button
	 */
	function handleEditing(e) {
		if (!isEditing) {
			textareaElem.current.focus();
		}

		if (isEditing && !task.trim()) {
			alert('Task is empty, Please enter the task first.');
			textareaElem.current.focus()
			return;
		}
		setIsEditing(!isEditing);
	}

	/**
	 * Confirm and delete the todo item from the list.
	 * @param {Event} e - The click event from the delete button
	 */
	function handleDelete(e) {
		const proceed = window.confirm('Are you sure you want to delete this todo.');
		if (!proceed) {
			return;
		}
		setTodos(todos.filter(item => item.id !== todo.id));
	}

	return (
		<div className="todo-item">
			<input type="checkbox" onChange={handleCheckbox} checked={checked} />
			<label htmlFor={`todo-${index}`} aria-label="Todo Item"></label>
			<textarea
				id={`todo-${index}`}
				className={`todo-item__task ${todo?.isCompleted && 'todo-item__task--completed'} ${isInvalidInput ? 'invalid-input' : ''}`}
				onChange={handleTask}
				disabled={!isEditing}
				value={task} 
				ref={textareaElem} />
			<button className="todo-item__edit-btn" onClick={handleEditing}>{isEditing ? 'Save' : 'Edit' }</button>
			<button className="todo-item__delete-btn" onClick={handleDelete}>Delete</button>
		</div>
	);
};

export default TodoItem;
