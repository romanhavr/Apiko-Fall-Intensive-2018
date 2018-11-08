import { normalize } from 'normalizr';
import * as schemes from '../../api/schemes';
import * as actions from './productsActions';
import * as Api from '../../api/api';

export const fetchProducts = () => async (dispatch) => {
    try {
        dispatch(actions.fetchProductsStart());

        const res = await Api.Products.fetch();
        const { result, entities } = normalize(
            res.data,
            schemes.ProductCollection
        );

        dispatch(actions.fetchProductsOk({
            ids: result,
            entities,
        }));
    } catch (err) {
        dispatch(actions.fetchProductsError(err.message));
    };
};

/* const normalize = (arr, useId = 'id') => arr.reduce((acc, current) => {
    const id = current[useId];
    acc.ids.push(id);
    acc.entities[id] = current;

    return acc;
}, {
    ids: [],
    entities: {},
}) */