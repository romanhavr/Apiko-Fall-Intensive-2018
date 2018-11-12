import { combineReducers } from 'redux';
import products from './products/productsReducers';
import cart from './cart/cartReducers';
import entities from './entities/entitiesReducers';
import adminProducts from './adminProducts/adminProductsReducers';

export default combineReducers({
    products,
    cart,
    entities,
    adminProducts,
})