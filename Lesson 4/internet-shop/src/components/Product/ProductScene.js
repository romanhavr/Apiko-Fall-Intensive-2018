import React from 'react';
import { withRouter } from "react-router-dom";
import { BrowserRouter as Router, Link } from "react-router-dom";

const ProductScene = ({
    id,
    title,
    description,
    price,
    image,
    onCartAddClick
}) => (
    <div className='product'>
        <Link to={`/product/${id}`}>
            <h4>{title}</h4>
        </Link>
            <table>
                <tbody>
                    <tr>
                        <td className='table-image'>
                            <img 
                                src={image}
                                className='product-image'
                                alt={title}
                            />
                        </td>
                        <td valign='top'>
                            <span><b>{price} UAH</b></span>
                            <button className='buy-button'>
                                Buy
                            </button>
                            <button
                                className='add-edit-delete-button'
                                onClick = {() => onCartAddClick(id)}
                            >
                                Add to cart
                            </button>
                            <div>
                                <p>Description:</p>
                                {description}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        <hr />
    </div>
);

export default withRouter(ProductScene);