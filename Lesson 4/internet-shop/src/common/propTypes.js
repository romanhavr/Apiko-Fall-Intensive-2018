import { shape, string, number } from 'prop-types';

export const productPropTypes = shape({
    id: number.isRequired,
    title: string.isRequired,
    description: string.isRequired,
    image: string.isRequired,
    price: number.isRequired
})

export const userPropTypes = shape({
    id: number.isRequired,
    firstName: string.isRequired,
    lastName: string,
    email: string.isRequired
})