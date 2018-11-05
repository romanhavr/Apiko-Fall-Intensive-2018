import React from 'react';
import ProductScene from '../Product/ProductScene';
import AdminProductScene from '../Product/AdminProductScene';

const ProductListScene = ({
    loading,
    admin,
    products,
    onProductTitleClick,
    onProductDeleteClick,
    onCartAddClick
}) =>  {
    if (loading) 
      return <p>Loading...</p>
    return (
    <div>
        <h3>Product list</h3>    
        {admin
            ? products.map((p) => (
                <AdminProductScene
                    key = {p.id}
                    {...p}
                    onTitleClick = {onProductTitleClick}
                    onDeleteClick = {onProductDeleteClick}
                />)
            )
            : products.map((p) => (
                <ProductScene
                    key={p.id}
                    {...p}
                    onCartAddClick = {onCartAddClick}
                />)
            )
        }        
    </div>
)};

export default ProductListScene;