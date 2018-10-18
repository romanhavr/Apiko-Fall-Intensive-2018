import React from 'react';
import '.././App.css';

const TodoItem = ({
	title,
	id,
	completed,
	onTitleClick,
	onDeleteClick
}) => (
	<div className='todo-items'>
		{completed ? 
			<div
				className='todo-title-completed'
				onClick={(e) => onTitleClick(e, id)}
			>
				{title}
			</div>
		:
			<div
				className='todo-title'
				onClick={(e) => onTitleClick(e, id)}
			>
				{title}
			</div>
		}
		<button 
			className='todo-delete-button'
			onClick={() => onDeleteClick(id)}>&#10008;
		</button>
	</div>
);

export default TodoItem;