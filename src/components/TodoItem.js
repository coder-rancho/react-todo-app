import { useEffect, useState } from "react";

const TodoItem = ({ index, todoItem, todos, setTodos }) => {
	const [checked, setChecked] = useState(todoItem?.isCompleted ?? false);
	const [isEditing, setIsEditing] = useState(false);
	const [task, setTask] = useState(todoItem?.task ?? '');
	const [todo, setTodo] = useState(todoItem);

	useEffect(() => {

		setTodos(todos.map( item => {

			if (item.id === todo.id) {
				return todo;
			}

			return item;
		}));

	}, [todo])

	function handleCheckbox() {
		setTodo({...todo, isCompleted: !checked});
		setChecked(!checked);
	}

	function handleTask(e) {
		const updatedTask = e.target.value;

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
		<div className="todoItem">
			<input type="checkbox" onChange={handleCheckbox} checked={checked} />
			<label htmlFor={`todo-${index}`} aria-label="Todo Item"></label>
			<input
				id={`todo-${index}`}
				className={`todoItem__task ${todo?.isCompleted && 'todoItem__task--completed'}`}
				value={task}
				onChange={handleTask}
				disabled={!isEditing}/>
			<button onClick={handleEditing}>{isEditing ? 'Save' : 'Edit' }</button>
			<button onClick={handleDelete}>Delete</button>

		</div>
	);
};

export default TodoItem;