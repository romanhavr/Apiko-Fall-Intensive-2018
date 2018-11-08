import { createSelector } from 'reselect';

const getProductIds = state => state.cart.items;
const getProductEntities = state => state.entities.products;

export const getProducts = createSelector( 
    [getProductIds, getProductEntities],
    (ids, entities) => ids.map( id => entities[id]));

export const getTotalPrice = createSelector(
    [getProducts],
    items => items.reduce((acc, item) => acc + item.price, 0));