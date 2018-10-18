import React, { Component } from 'react';
import './App.css';
import Container from './components/container';
import uuid from 'uuid';

class App extends Component {
	constructor(props) {
		super(props)
		
		this.onChangeInputValue = this.onChangeInputValue.bind(this);
		this.handleAddTodo = this.handleAddTodo.bind(this);
		this.handleShowAllClick = this.handleShowAllClick.bind(this);
		this.handleShowCompletedClick = this.handleShowCompletedClick.bind(this);
		this.handleShowNotCompletedClick = this.handleShowNotCompletedClick.bind(this);
		this.handleTodoTitleClick = this.handleTodoTitleClick.bind(this);
		this.handleTodoDeleteClick = this.handleTodoDeleteClick.bind(this);
		this.getCompletedTodosCount = this.getCompletedTodosCount.bind(this);
		this.getNotCompletedTodosCount = this.getNotCompletedTodosCount.bind(this);
		this.getTotalTodosCount = this.getTotalTodosCount.bind(this);
		this.listSwitcher = this.listSwitcher.bind(this);
		this._inputRef = React.createRef();
		
		this.state = {
			inputValue: '',
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
			try {
				value = JSON.parse(value);
				this.setState({ 
					todos: value,
					allTodos: value 
				});
			} catch (e) {
				this.setState({ 
					todos: value,
					allTodos: value
				});
			}
		}
	};

	saveStateToLocalStorage() {
		localStorage.setItem('todos', JSON.stringify(this.state.allTodos));
	};
	
	onChangeInputValue(inputValue) {
		this.setState({inputValue});
	};
	
	handleAddTodo() {
		const {inputValue} = this.state;
		if (inputValue.trim().length === 0) {
			return
		};
		
		const todo = createTodo(this.state.inputValue);
		
		this.setState({
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

		this.listSwitcher(newTodos, this.state.showTodosListIndex);
	};
	
	listSwitcher(newTodos, showTodosListIndex) {
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
		this.listSwitcher(this.state.allTodos, newShowListIndex);
		
		this.setState({
			showTodosListIndex: newShowListIndex,
		});
	};
	
	handleShowNotCompletedClick() {
		const newShowListIndex = 'not-completed';
		this.listSwitcher(this.state.allTodos, newShowListIndex);

		this.setState({
			showTodosListIndex: newShowListIndex,
		});
	};
	
	handleShowAllClick() {
		let newShowListIndex = 'all';
		this.listSwitcher(this.state.allTodos, newShowListIndex);

		this.setState({
			showTodosListIndex: newShowListIndex,
		});
	};
	
	render() {
		return (
		    <div className='app'>
				<h1>TODO app</h1>
				<Container
					value = {this.state.inputValue}
					onChangeValue = {this.onChangeInputValue}
					onClick = {this.handleAddTodo}
					onShowAllClick = {this.handleShowAllClick}
					onShowCompletedClick = {this.handleShowCompletedClick}
					onShowNotCompletedClick = {this.handleShowNotCompletedClick}
					inputRef = {this._inputRef}
					todosItems = {this.state.todos}  //
					onTodoTitleClick = {this.handleTodoTitleClick}
					onTodoDeleteClick = {this.handleTodoDeleteClick}
					getCompletedCount = {this.getCompletedTodosCount()}
					getNotCompletedCount = {this.getNotCompletedTodosCount()}
					getTotalCount = {this.getTotalTodosCount()}
				/>
			</div>
		);
	}
}

const createTodo = (value) => ({
	id: uuid.v1(),
	title: value,
	completed: false
});

export default App;
