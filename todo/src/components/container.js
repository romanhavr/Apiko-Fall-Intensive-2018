import React from 'react';
import '.././App.css';
import TodoItem from './todo-item';

const Container = ({
	value,
	onClick,
	onChangeValue,
	inputRef,
	todosItems,
	onTodoTitleClick,
	onTodoDeleteClick,
	getCompletedCount,
	getNotCompletedCount,
	getTotalCount,
	onShowAllClick,
	onShowCompletedClick,
	onShowNotCompletedClick,
}) => (
	<div>
		<div className='header'>
			<input 
				placeholder='Add todo here...'
				value={value}
				onChange={(e) => {onChangeValue(e.target.value)}}
				ref={inputRef}
				className='input'
			> 
			</input>
			<button
				onClick={onClick}
				className='add-button'
			>
				Add todo
			</button>
		</div>
		<div className='todos'>
			<h3>Todos list</h3>
				<ul>
					{todosItems.map( item => (
						<TodoItem 
							{...item}
							key={item.id}
							onTitleClick={onTodoTitleClick}
							onDeleteClick={onTodoDeleteClick}
						/>
						))
					}
				</ul>
		</div>
		<div className='info'>
			<h3>Info:</h3>
			<span className='show-title'>Todos completed:
				<span className='count'> {getCompletedCount}</span>
			</span>
			<br />
			<button onClick={onShowCompletedClick} className='show-button'>
				Show completed todos
			</button>
			<br />
			<span className='show-title'>Todos not completed:
				<span className='count'>{getNotCompletedCount}</span>
			</span>
			<br />
			<button onClick={onShowNotCompletedClick} className='show-button'>
				Show not completed todos
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