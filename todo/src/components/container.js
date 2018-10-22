import React from 'react';
import '.././App.css';
import TodoList from './todo-list';

const Container = ({
	value,
	description,
	onClick,
	onChangeTitle,
	onChangeDescription,
	onChangeEditDescription,
	inputRef,
	todosItems,
	onTodoTitleClick,
	onTodoDeleteClick,
	onTodoCancelClick,
	onTodoSaveClick,
	onTodoEditClick,
	getCompletedCount,
	getNotCompletedCount,
	getTotalCount,
	onShowAllClick,
	onShowCompletedClick,
	onShowNotCompletedClick,
}) => (
	<div>
		<div className='header box'>
			<h3>Add TODO:</h3>
			<div>	
				<input 
					className='input'
					placeholder='Add TODO title here...'
					value={value}
					onChange={(e) => {onChangeTitle(e.target.value)}}
					ref={inputRef}
				> 
				</input>
			</div>
			<div>
				<textarea
					className='todo-description'
					placeholder='Add TODO description here...'
					value={description}
					onChange={(e) => {onChangeDescription(e.target.value)}}
				/>
				<button
					onClick={onClick}
					className='add-button'
				>
					Add todo
				</button>
			</div>
		</div>
		<TodoList 
			todosItems={todosItems}
			onTitleClick={onTodoTitleClick}
			onDeleteClick={onTodoDeleteClick}
			onCancelClick={onTodoCancelClick}
			onSaveClick={onTodoSaveClick}
			onEditClick={onTodoEditClick}
			onEditChange={onChangeEditDescription}
		/>
		<div className='info box'>
			<h3>Info:</h3>
			<span className='show-title'>Todos completed:
				<span className='count'> {getCompletedCount}</span>
			</span>
			<br />
			<button onClick={onShowCompletedClick} className='show-button'>
				Show completed
			</button>
			<br />
			<span className='show-title'>Todos not completed:
				<span className='count'>{getNotCompletedCount}</span>
			</span>
			<br />
			<button onClick={onShowNotCompletedClick} className='show-button'>
				Show not completed
			</button>
			<br />
			<span className='show-title'>Todos total:
				<span className='count'>{getTotalCount}</span>
			</span>
			<br />
			<button onClick={onShowAllClick} className='show-button'>
				Show all
			</button>
			<br />
		</div>
	</div>
);

export default Container;