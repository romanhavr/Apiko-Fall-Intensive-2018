import React from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { routes } from './routes';

const Header = () => (
    <Router>
            
            <div className="header">
                <h1>My Internet SHOP</h1>
                <input
                    className='search'
                    placeholder='Search...'
                />
                <span className='user-login'>
                    <b>USER</b> / Log out
                </span>
                <Link to={routes.cart}>
                    <span className='cart'>
                        Cart
                    </span>
                </Link>
            </div>
    </Router>
);

export default Header;