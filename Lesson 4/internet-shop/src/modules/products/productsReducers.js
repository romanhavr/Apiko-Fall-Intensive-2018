import { handleActions } from 'redux-actions';
import * as constants from './productsConstants';

const initialState = {
    products: [],
    isLoading: false,
    error: null,
};

export default handleActions(
    {
        [constants.FETCH_PRODUCTS_START]: () => ({
            isLoading: true,
            error: null,
        }),
        [constants.FETCH_PRODUCTS_OK]: (state, action) => ({
            isLoading: false,
            products: action.payload.ids,
        }),
        [constants.FETCH_PRODUCTS_ERROR]: (state, action) => ({
            isLoading: false,
            error: action.payload.messsage,
        })
    },
    initialState,
)