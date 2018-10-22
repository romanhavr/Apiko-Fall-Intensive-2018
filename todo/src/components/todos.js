import React, { Component } from 'react';
import '.././App.css';
import Container from './container';
import uuid from 'uuid';

class Todos extends Component {
	constructor(props) {
		super(props)
		
		this.onChangeInputValue = this.onChangeInputValue.bind(this);
		this.onChangeDescriptionValue = this.onChangeDescriptionValue.bind(this);
		this.handleAddTodo = this.handleAddTodo.bind(this);
		this.handleShowAllClick = this.handleShowAllClick.bind(this);
		this.handleShowCompletedClick = this.handleShowCompletedClick.bind(this);
		this.handleShowNotCompletedClick = this.handleShowNotCompletedClick.bind(this);
		this.handleTodoTitleClick = this.handleTodoTitleClick.bind(this);
		this.handleTodoDeleteClick = this.handleTodoDeleteClick.bind(this);
		this.handleTodoCancelClick = this.handleTodoCancelClick.bind(this);
		this.handleTodoSaveClick = this.handleTodoSaveClick.bind(this);
		this.handleTodoEditClick = this.handleTodoEditClick.bind(this);
		this.handleTodoEditDescription = this.handleTodoEditDescription.bind(this);
		this.getCompletedTodosCount = this.getCompletedTodosCount.bind(this);
		this.getNotCompletedTodosCount = this.getNotCompletedTodosCount.bind(this);
		this.getTotalTodosCount = this.getTotalTodosCount.bind(this);
		this.listSwitcher = this.listSwitcher.bind(this);
		this._inputRef = React.createRef();
		
		this.state = {
			inputValue: '',
			descriptionValue: '',
			descriptionEditValue: '',
			showTodosListIndex: 'all',
			todos: [],	
			allTodos: [],		
		}
	}
	
	componentDidMount() {
		this.getStateFromLocalStorage();
		
		window.addEventListener(
			"beforeunload",
			this.saveStateToLocalStorage.bind(this)
		);
		
		setTimeout(
			this.listSwitcher,
			0,
			window.location.pathname.slice(10)
		)
	};

	componentWillUnmount() {
		window.removeEventListener(
			"beforeunload",
			this.saveStateToLocalStorage.bind(this)
		);
			
		this.saveStateToLocalStorage();
	};

	getStateFromLocalStorage() {
		if (localStorage.todos) {
			let value = localStorage.getItem('todos');
			value = JSON.parse(value);
			this.setState({ 
				todos: value,
				allTodos: value 
			});
		};
	};

	saveStateToLocalStorage() {		
		localStorage.setItem('todos', JSON.stringify(this.state.allTodos));
	};
	
	onChangeInputValue(inputValue) {
		this.setState({inputValue});
	};

	onChangeDescriptionValue(descriptionValue) {
		this.setState({descriptionValue});
	};
	
	handleAddTodo() {
		const {inputValue} = this.state;

		if (inputValue.trim().length === 0) {
			return
		};
		
		const todo = createTodo(
			this.state.inputValue,
			this.state.descriptionValue,
		);
		
		this.setState({
			descriptionValue: '',
			inputValue: '',
			todos: [todo].concat(this.state.todos),
			allTodos: [todo].concat(this.state.allTodos)
		});	

		this._inputRef.current.focus();
	};
	
	handleTodoTitleClick(e, id) {
		const currentTodoIndex = this.state.allTodos.findIndex(i => 
			i.id === id);
		
		if (currentTodoIndex === -1) {
			return
		}
		const todo = this.state.allTodos[currentTodoIndex];
		todo.completed = !todo.completed;
		
		if (todo.completed) {
			todo.title = 'Completed - ' + todo.title;
		} else {
			todo.title = todo.title.slice(12);
		}
		
		const newTodos = [...this.state.allTodos];
		
		newTodos[currentTodoIndex] = todo;

		this.listSwitcher(this.state.showTodosListIndex, newTodos);
	};
	
	listSwitcher(showTodosListIndex
		, newTodos = this.state.allTodos
		) {
			
		switch (showTodosListIndex) {
		case 'completed':
			this.setState({
				todos: newTodos.filter(i => 
					i.completed),
			});
			break;
		case 'not-completed':
			this.setState({
				todos: newTodos.filter(i => 
				!i.completed)
			});
			break;
		case 'all':
			this.setState({
				todos: newTodos
			});
			break;
		default:
			this.setState({
				todos: newTodos
			});
		};
	}

	handleTodoDeleteClick(id) {
		this.setState({
			todos: this.state.todos.filter(i => i.id !== id),
			allTodos: this.state.allTodos.filter(i => i.id !== id),
		})
	};

	handleTodoEditClick(id) {
		const currentTodoIndex = this.state.allTodos.findIndex(i => 
			i.id === id);
		
		if (currentTodoIndex === -1) {
			return
		}
		const todo = this.state.allTodos[currentTodoIndex];
		todo.edit = !todo.edit;
		
		const newTodos = [...this.state.allTodos];
		newTodos[currentTodoIndex] = todo;
		
		this.setState({
			todos: newTodos,
			allTodos: newTodos
		});
	}

	handleTodoCancelClick(id) {
		const currentTodoIndex = this.state.allTodos.findIndex(i => 
			i.id === id);
		
		if (currentTodoIndex === -1) {
			return
		}
		const todo = this.state.allTodos[currentTodoIndex];
		todo.edit = !todo.edit;
		
		const newTodos = [...this.state.allTodos];
		
		newTodos[currentTodoIndex] = todo;
		
		this.setState({
			todos: newTodos,
			allTodos: newTodos,
		})
	}

	handleTodoSaveClick(id) {
		const currentTodoIndex = this.state.allTodos.findIndex(i => 
			i.id === id);
		
		if (currentTodoIndex === -1) {
			return
		}
		const todo = this.state.allTodos[currentTodoIndex];
		todo.edit = false;
		todo.description = this.state.descriptionEditValue;
		
		const newTodos = [...this.state.allTodos];
		
		newTodos[currentTodoIndex] = todo;
		
		this.setState({
			todos: newTodos,
			allTodos: newTodos,
		});
	}

	handleTodoEditDescription(descriptionEditValue) {
			this.setState({descriptionEditValue});
	}
	
	getCompletedTodosCount() {
		return this.state.allTodos.filter(i => i.completed).length;
	};
	
	getNotCompletedTodosCount() {
		return this.state.allTodos.filter(i => !i.completed).length;
	};
	
	getTotalTodosCount() {
		return this.state.allTodos.length;
	};
	
	handleShowCompletedClick() {
		const newShowListIndex = 'completed';
		this.listSwitcher(newShowListIndex);
		
		this.setState({
			showTodosListIndex: newShowListIndex,
		});
	};
	
	handleShowNotCompletedClick() {
		const newShowListIndex = 'not-completed';
		this.listSwitcher(newShowListIndex);

		this.setState({
			showTodosListIndex: newShowListIndex,
		});
	};
	
	handleShowAllClick() {
		let newShowListIndex = 'all';
		this.listSwitcher(newShowListIndex);

		this.setState({
			showTodosListIndex: newShowListIndex,
		});
	};

	render() {
		return (
			<div className='container'>
				<Container 
					value = {this.state.inputValue}
					description = {this.state.descriptionValue}
					descriptionEdit = {this.state.descriptionEditValue}
					onChangeTitle = {this.onChangeInputValue}
					onChangeDescription = {this.onChangeDescriptionValue}
					onClick = {this.handleAddTodo}
					onShowAllClick = {this.handleShowAllClick}
					onShowCompletedClick = {this.handleShowCompletedClick}
					onShowNotCompletedClick = {this.handleShowNotCompletedClick}
					inputRef = {this._inputRef}
					todosItems = {this.state.todos}
					onTodoTitleClick = {this.handleTodoTitleClick}
					onTodoDeleteClick = {this.handleTodoDeleteClick}
					onTodoCancelClick = {this.handleTodoCancelClick}
					onTodoSaveClick = {this.handleTodoSaveClick}
					onTodoEditClick = {this.handleTodoEditClick}
					onChangeEditDescription = {this.handleTodoEditDescription}
					getCompletedCount = {this.getCompletedTodosCount()}
					getNotCompletedCount = {this.getNotCompletedTodosCount()}
					getTotalCount = {this.getTotalTodosCount()}
				/>
			</div>
		);
	}
}

const createTodo = (title, description) => ({
	id: uuid.v1(),
	title: title,
	description: description,
	completed: false,
	edit: false
});

export default Todos;