import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Todos from './todos';
import About from './about';
import Home from './home';
import Help from './help';

export const routes = [
    {
        path: '/',
        exact: true,
        sidebar: () => <div>Home</div>,
        main: () => <Home />
          
      },
      {
        path: '/about',
        sidebar: () => <div>About</div>,
        main: () => <About />
      },
     {
        path: '/todolist',
        exact: true,
        sidebar: () => <div>TODO list</div>,
        main: () => <Todos />
      },  
        {
          path: '/todolist/all',
          sidebar: () => <div>all todos</div>,
          main: () => <div><Todos /></div>
        },
        {
          path: '/todolist/not-completed',
          sidebar: () => <div>not completed todos</div>,
          main: () => <Todos />
        },
        {
          path: '/todolist/completed',
          sidebar: () => <div>completed todos</div>,
          main: () => <Todos />
        },
      
      {
        path: '/help',
        sidebar: () => <div>Help</div>,
        main: () => <Help />
      }
];

const Main = () => (
    <Router>
      <div>
        <div className='sidebar box'>
        <h3>Menu</h3>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/about'>About</Link>
            </li>
            <li>
              <Link to='/help'>Help</Link>
            </li>
          </ul>
          <ul style={{paddingLeft: '25px'}}>
            <Link to='/todolist'>TODO list</Link>
            <li>
              <Link to='/todolist/all'>all todos</Link>
            </li>
            <li>
              <Link to='/todolist/not-completed'>not completed todos</Link>
            </li>
            <li>
              <Link to='/todolist/completed'>completed todos</Link>
            </li>
          </ul>
          <span><b>Your are here:</b></span>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.sidebar}
            />
          ))}
        </div>
        <div className='content' style={{ flex: 1, padding: '10px' }}>
						{routes.map((route, index) => (
						<Route
							key={index}
							path={route.path}
							exact={route.exact}
							component={route.main}
						/>
						))}
					</div>
        </div>
    </Router>
  );

  export default Main;
