import { useEffect, useState, useRef } from "react";

const TodoItem = ({ index, todoItem, todos, setTodos }) => {
	const textareaElem = useRef();
	const [checked, setChecked] = useState(todoItem?.isCompleted ?? false);
	const [isEditing, setIsEditing] = useState(false);
	const [task, setTask] = useState(todoItem?.task ?? '');
	const [todo, setTodo] = useState(todoItem);
	const [isInvalidInput, setIsInvalidInput] = useState(false);

    useEffect(() => {
        if (isEditing) {
            textareaElem.current.focus();
        }
    }, [isEditing]);

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
		const updatedTask = e.target.value?.trim();

		if ( !updatedTask ) {
			setIsInvalidInput(true);
		} else {
			setIsInvalidInput(false);
		}

		setTask(updatedTask);
		setTodo({...todo, task: updatedTask});
	}

	function handleEditing(e) {

		if (!isEditing) {
			textareaElem.current.focus();
			console.log(textareaElem.current)
		}

		if ( isEditing && !task ) {
			alert('Please enter the task first.');
			return;
		}
		setIsEditing(!isEditing);
	}

	function handleDelete(e) {

		const proceed = window.confirm('Are you sure you want to delete this todo.');
		if ( !proceed ) {
			return;
		}
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
				value={task} 
				ref={textareaElem} />
			<button className="todo-item__edit-btn" onClick={handleEditing}>{isEditing ? 'Save' : 'Edit' }</button>
			<button className="todo-item__delete-btn" onClick={handleDelete}>Delete</button>

		</div>
	);
};

export default TodoItem;