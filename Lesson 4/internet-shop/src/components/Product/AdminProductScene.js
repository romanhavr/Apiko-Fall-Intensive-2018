import React from 'react';
import { withRouter } from 'react-router-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const AdminProductScene = ({
    id,
    title,
    description,
    price,
    image,
    onTitleClick,
    onDeleteClick,
    show
}) => {
    return (
    <div className='product'>
            <span 
                onClick={() => onTitleClick(id)}
            >
                {title}
            </span>
            <button
                className='add-edit-delete-button delete'
                onClick={() => onDeleteClick(id)}
            >
                Delete
            </button>
            
            <Link 
                to={{
                pathname: `/admin/product/edit/${id}`,
                state: { modal: true, id:`${id}` }
             }}>
                 <button
                className='add-edit-delete-button edit'
            >
                Edit
            </button>
            </Link>
            <button
                className='add-edit-delete-button'
                onClick={() => onTitleClick(id)}
            >
                Show / Hide Info
            </button>
            {show ?
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <img 
                                    src={image}
                                    className='admin-image'
                                    alt={title}
                                />
                            </td>
                            <td valign='top'>
                                <span><b>{price} UAH</b></span>
                                
                                <div>
                                    <p>Description:</p>
                                    {description}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                : null
            }
        <hr />
    </div>
);}

export default withRouter(AdminProductScene);