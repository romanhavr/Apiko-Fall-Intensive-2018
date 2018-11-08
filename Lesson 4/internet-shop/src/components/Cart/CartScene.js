import React from 'react';
import { connect } from 'react-redux';
import * as cartSelectors from '../../modules/cart/cartSelectors';

const CartScene = ({
    items,
    totalPrice,
    products
}) => {
    
  //  let items = [];
  //  let totalPrice = 0;
    
  //  ids.map( id =>
  //      items.push(products.find( i => i.id === id)));
    console.log('products CART - ',products)
    console.log('items CART - ',items)
    console.log('totalPrice CART - ',totalPrice)
  //  items.map( i => totalPrice += i.price)
    
    if (items.length === 0) {
       return <p>There are not chosen products in your Cart.</p>
    } 

    return (
    <div>
        <p />
        {items.map( p => 
            (<div 
                className='cart-list'
                key={p.id}
            >
            <img 
                src={p.image}
                className='cart-image'
                alt={p.title}
            />
            <span>
                {p.title}
            </span>
            <span>
                {p.price} UAH
            </span>
        </div>)
        )}
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

const mapStateToProps = (state) => ({
    items: cartSelectors.getProducts(state),
    totalPrice: cartSelectors.getTotalPrice(state),
    //state.products.products,
    //items: state.cart.items,
})

export default connect(mapStateToProps)(CartScene);