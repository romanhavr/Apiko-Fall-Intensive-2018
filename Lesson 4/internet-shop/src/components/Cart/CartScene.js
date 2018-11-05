import React from 'react';

const CartScene = ({
    cartProducts,
    products
}) => {

    // So far (untill "state" is used for storing product list) 
    // here in CartScene I show ALL the list of products to see how it works.
    // I don't get WHY it doesn't see "state" when handle click on Cart link 
    // from product list. But see the "state" when page is reloaded on Cart. 

    // Normaly this page is shown in modal window and after refresh - simple page,
    // but so far it can act this way only without "map" function.

    let totalPrice = 0;
    products.map( p => (totalPrice += p.price))
                    
    return (
    <div>
        <p />
        {products.map( (p) =>
            (<div 
                className='cart-list'
                key={p.id}
            >
                <span>
                    {p.title}
                </span>
                <span>
                    {p.price}
                </span>
            </div>))
        }
        <hr />
        <div className='cart-list'>
            <span>
                <b>
                    Total price:
                </b>
            </span>
            <span>
                <b>
                    {totalPrice} UAH
                </b>
            </span>
        </div>
    </div>
)}

export default CartScene;