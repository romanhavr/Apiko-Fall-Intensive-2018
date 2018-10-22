import React from 'react';
import '.././App.css';
import TodoItem from './todo-item';

const TodoList = ({
    todosItems,
	onTitleClick,
    onDeleteClick,
    onCancelClick,
    onSaveClick,
    onEditClick,
    onEditChange,
}) => (
    <div className='todos box'>
		<h3>Todos list</h3>
			<ul>
				{todosItems.map( item => (
					<TodoItem 
						{...item}
                        key={item.id}
						onTitleClick={onTitleClick}
                        onDeleteClick={onDeleteClick}
                        onCancelClick={onCancelClick}
                        onEditClick={onEditClick}
                        onSaveClick={onSaveClick}
                        onEditChange={onEditChange}
					/>
					))
				}
			</ul>
    </div>
);

export default TodoList;