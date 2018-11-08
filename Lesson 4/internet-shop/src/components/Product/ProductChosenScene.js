import React from 'react';
import { withRouter } from "react-router-dom";

const ProductChosenScene = ({
    match,
    products,
    onCartAddClick
}) => {
    const id = match.params.id;
    const product = products.find(i => i.id === id);
    return (
        <div className='product'>
            <h4>{product.title}</h4>
                <table>
                    <tbody>
                        <tr>
                            <td className='table-image chosen'>
                                <img 
                                    src={product.image}
                                    className='product-image'
                                    alt={product.title}
                                />
                            </td>
                            <td valign='top'>
                                <span><b>{product.price} UAH</b></span>
                                <button className='buy-button'>
                                    Buy
                                </button>
                                <button
                                    className='add-edit-delete-button'
                                    onClick = {() => onCartAddClick(product)}
                                >
                                    Add to cart
                                </button>
                                <div>
                                    <p>Description:</p>
                                    {product.description}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            <hr />
        </div>
);}

export default withRouter(ProductChosenScene);