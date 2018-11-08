import React from 'react';
import ProductScene from '../Product/ProductScene';
import AdminProductScene from '../Product/AdminProductScene';

const ProductListScene = ({
    isLoading,
    isError,
    error,
    admin,
    products,
    onProductTitleClick,
    onProductDeleteClick,
    onCartAddClick
}) =>  {
    if (isLoading) 
      return <p>Loading...</p>
      console.log('isError - ',isError);
      console.log('products - ',products);
    if (isError) 
      return <p>Error...</p>
    return (
    <div>
        <h3>Product list</h3>    
        {admin
            ? products.map((p) => (
                <AdminProductScene
                    key = {p.id}
                    {...p}
                    item = {p}
                    onTitleClick = {onProductTitleClick}
                    onDeleteClick = {onProductDeleteClick}
                />)
            )
            : products.map((p) => (
                <ProductScene
                    key={p.id}
                    {...p}
                    item = {p}
                    onCartAddClick = {onCartAddClick}
                />)
            )
        }        
    </div>
)};

export default ProductListScene;