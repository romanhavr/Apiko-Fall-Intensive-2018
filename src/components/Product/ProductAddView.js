import React from 'react';

const ProductAdd = ({
    titleValue,
    priceValue,
    imageUrlValue,
    descriptionValue,
    onTitleValueChange,
    onPriceValueChange,
    onImageUrlValueChange,
    onDescriptionValueChange,
    onProductAddSave
}) => (
        <div className='product-edit'>
            <img 
                src={imageUrlValue 
                        ? imageUrlValue 
                        : 'http://www.grup-tek.com/kucult.php?w=400&h=300&src=http://www.grup-tek.com//tema/assets/img/default.gif'}
                className='edit-image'
                alt={titleValue}
            />
            <p><b>Enter title:</b></p>    
            <input
                value = {titleValue}
                placeholder = 'Product title'
                className = 'input'
                onChange={(e) => {onTitleValueChange(e.target.value)}}
            />
            <p><b>Enter image URL:</b></p>
            <input
                value = {imageUrlValue}
                placeholder = 'Product image URL'
                className = 'input'
                onChange={(e) => {onImageUrlValueChange(e.target.value)}}
            />
            <p><b>Enter price (UAH):</b></p>
            <input
                type = 'number'
                value = {priceValue}
                placeholder = 'Product price'
                className = 'input'
                onChange={(e) => {onPriceValueChange(e.target.value)}}
            />
            <p><b>Enter description:</b></p> 
            <textarea
                value = {descriptionValue}
                placeholder = 'Product description'
                className = 'textarea'
                onChange={(e) => {onDescriptionValueChange(e.target.value)}}
            />
            <hr />
            <button
                className='add-edit-delete-button add-pay-save'
                onClick = {onProductAddSave}
            >
                &emsp;Save&emsp;
            </button>
        </div>
);

export default ProductAdd;