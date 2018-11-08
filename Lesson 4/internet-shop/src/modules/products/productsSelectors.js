import { createSelector } from 'reselect';

const getProductIds = state => console.log('state - ',state);
//state.products.ids};
const getProductEntities = state => state.entities.products;

export const getProducts = createSelector( 
    [getProductIds, getProductEntities],
    (ids, entities) => {console.log('ids - ',ids,' ',entities);
    ids.map( id => entities[id])});

export const getProduct = createSelector(
    (state, id) => state.entities.products[id],
);