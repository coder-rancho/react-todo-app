import { useEffect, useState } from "react";

const TodoItem = ({ index, todoItem, todos, setTodos }) => {
	const [checked, setChecked] = useState(todoItem?.isCompleted ?? false);
	const [isEditing, setIsEditing] = useState(false);
	const [task, setTask] = useState(todoItem?.task ?? '');
	const [todo, setTodo] = useState(todoItem);
	const [isInvalidInput, setIsInvalidInput] = useState(false);

	useEffect(() => {
		setTodos(todos.map( item => {

			if (item.id === todo.id) {
				return todo;
			}

			return item;
		}));
	}, [todo]);

	function handleCheckbox() {
		setTodo({...todo, isCompleted: !checked});
		setChecked(!checked);
	}

	function handleTask(e) {
		const updatedTask = e.target.value;

		if ( !updatedTask ) {
			setIsInvalidInput(true);
		} else {
			setIsInvalidInput(false);
		}

		setTask(updatedTask);
		setTodo({...todo, task: updatedTask});
	}

	function handleEditing(e) {

		if ( isEditing && !task ) {
			alert('Please enter the task.');
			return;
		}
		setIsEditing(!isEditing);
	}

	function handleDelete(e) {
		setTodos( todos.filter( item => item.id !== todo.id) );
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
				value={task} />
			<button className="todo-item__edit-btn" onClick={handleEditing}>{isEditing ? 'Save' : 'Edit' }</button>
			<button className="todo-item__delete-btn" onClick={handleDelete}>Delete</button>

		</div>
	);
};

export default TodoItem;