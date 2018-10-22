import React from 'react';
import '.././App.css';

const TodoItem = ({
	title,
	id,
	completed,
	description,
	descriptionEdit,
	edit,
	onTitleClick,
	onDeleteClick,
	onEditClick,
	onSaveClick,
	onCancelClick,
	onEditChange,
}) => (
	<div>	
		<div className='todo-items'>
			{completed ? 
				<div
					className='todo-title-completed'
					onClick={(e) => onTitleClick(e, id)}
					title={description}
				>
					{title}
				</div>
			:
				<div
					className='todo-title'
					onClick={(e) => onTitleClick(e, id)}
					title={description}
				>
					{title}
				</div>
			}
			<button 
				className='todo-button'
				onClick={() => onEditClick(id)}
			>
			&#8803;
			</button>
			<button 
				className='todo-button'
				onClick={() => onDeleteClick(id)}
			>
			&#10008;
			</button>
		</div>
		{ edit ? 
			<div className='edit-description'>
				<textarea 
					className='edit-description-text'
					defaultValue={description}
					value={descriptionEdit}
					onChange={(e) => {onEditChange(e.target.value)}}
					
				/>
				<button 
					className='todo-button todo-edit-button'
					onClick={() => onSaveClick(id)}
				>
					&#x2714;
				</button>
				<button 
					className='todo-button todo-edit-button'
					onClick={() => onCancelClick(id)}
				>
					&#10008;
				</button>
			</div>
			:
			<span />
		}
	</div>
);

export default TodoItem;