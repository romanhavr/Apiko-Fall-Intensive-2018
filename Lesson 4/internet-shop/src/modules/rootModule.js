import { combineReducers } from 'redux';
import products from './products/productsReducers';
import cart from './cart/cartReducers';
import entities from './entities/entitiesReducer';

export default combineReducers({
    products,
    cart,
    entities,
});