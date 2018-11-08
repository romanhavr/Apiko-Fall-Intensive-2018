import React from 'react';
import { withRouter } from 'react-router-dom';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { connect } from 'react-redux';
// import * as cartActions from '../modules/cart/cartActions';
import { routes } from './routes';

const Header = ({
    cartItemsCount,
}) => (
        <div className="header">
            <h1>My Internet SHOP</h1>
            <input
                className='search'
                placeholder='Search...'
            />
            <span className='user-login'>
            <b>User</b> / Log out
            </span>
            <Link to={routes.cart}>
                <span className='cart'>
                    Cart 
                    {cartItemsCount 
                        ? <span> ({cartItemsCount})</span>
                        : null
                    }
                </span>
            </Link>
        </div>
);

const mapStateToProps = state => ({
    cartItemsCount: state.cart.items.length,
})

export default connect(mapStateToProps)(withRouter(Header));

/*
  {isAdmin
                    ? <b>Admin</b>
                    : <b>User</b>
                }
*/