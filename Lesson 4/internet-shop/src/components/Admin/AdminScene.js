import React from 'react';
import { Switch} from 'react-router';
import { withRouter } from 'react-router-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Modal from '../../common/modal';
import ProductListScene from '../ProductList/ProductListScene';
import ProductEdit from '../Product/ProductEdit';
import ProductAdd from '../Product/ProductAdd';
import {NotFoundScene} from '../NotFound/NotFoundScene';
import { routes } from '../../common/routes';
import * as Api from '../../api/api';
import uuid from 'uuid';

class AdminScene extends React.Component {
    constructor(props) {
		super(props);

        this.handleProductTitleClick = this.handleProductTitleClick.bind(this);
        this.handleProductDeleteClick = this.handleProductDeleteClick.bind(this);
        this.handleProductEditSave = this.handleProductEditSave.bind(this);
        this.handleProductAddSave = this.handleProductAddSave.bind(this);
        this.handleTitleValueChange = this.handleTitleValueChange.bind(this);
        this.handlePriceValueChange = this.handlePriceValueChange.bind(this); 
        this.handleImageUrlValueChange = this.handleImageUrlValueChange.bind(this); 
        this.handleDescriptionValueChange = this.handleDescriptionValueChange.bind(this); 

        this.state = {
            products: [],
            loading: true,
            titleValue: '',
            priceValue: '',
            imageUrlValue: '',
            descriptionValue: ''
        };
    } 

    async componentDidMount() {
        const productsData = await Api.Products.fetch
        //Products
        ();
        this.setState({
            products: productsData.data,
            loading: false,
            admin: true
        });
    }; 

    handleProductTitleClick(id) {
        const currentProductIndex = this.state.products.findIndex(i => 
            i.id === id);
    
        if (currentProductIndex === -1) {
            return
        }
        const product = this.state.products[currentProductIndex];
        product.show = !product.show;

        const newProducts = [...this.state.products];
        newProducts[currentProductIndex] = product;
        
        this.setState({
            products: newProducts
        });
    };

    handleProductDeleteClick(id) {
        this.setState({
            products: this.state.products.filter(i => i.id !== id)
        })
    };

    handleTitleValueChange(titleValue) {
		this.setState({titleValue});
    };

    handlePriceValueChange(priceValue) {
        this.setState({priceValue});
    }

    handleImageUrlValueChange(imageUrlValue) {
        this.setState({imageUrlValue});
    }

    handleDescriptionValueChange(descriptionValue) {
        this.setState({descriptionValue});
    }

    handleProductEditSave(id) {
        const currentProductIndex = this.state.products.findIndex(i => 
            i.id === id);
    
        if (currentProductIndex === -1) {
            return
        }
        const product = this.state.products[currentProductIndex];
        product.title = this.state.titleValue 
            ? this.state.titleValue 
            : product.title;
        product.price = this.state.priceValue
            ? this.state.priceValue 
            : product.price;
        product.image = this.state.imageUrlValue
            ? this.state.imageUrlValue 
            : product.image;
        product.description = this.state.descriptionValue
            ? this.state.descriptionValue 
            : product.description;

        const newProducts = [...this.state.products];
        newProducts[currentProductIndex] = product;
        
        this.setState({
            products: newProducts,
            titleValue: '',
            priceValue: '',
            imageUrlValue: '',
            descriptionValue: ''
        });
    }

    handleProductAddSave() {
        
        const product = {};
        product.id = uuid.v1();
        product.title = this.state.titleValue 
            ? this.state.titleValue 
            : alert('Enter product title!');
        product.price = this.state.priceValue
            ? this.state.priceValue 
            : alert('Enter product price!');
        product.image = this.state.imageUrlValue
            ? this.state.imageUrlValue 
            : alert('Enter product image URL !');
        product.description = this.state.descriptionValue
            ? this.state.descriptionValue 
            : alert('Enter product description!');        
        
        if (
            product.id &&
            product.title &&
            product.price &&
            product.image &&
            product.description
        ) {
            const newProducts = [...this.state.products];
            newProducts.push(product);
            
            this.setState({
                products: newProducts,
                titleValue: '',
                priceValue: '',
                imageUrlValue: '',
                descriptionValue: ''
            });
            alert('New product - "'+product.title+'" added successfuly.')
        }
    }

    previousLocation = null;

    render() {
        const { location, history } = this.props;
        if (
            !this.previousLocation ||
            (history.action !== 'POP' &&
                (!location.state || !location.state.modal))
            ) {
            this.previousLocation = location;
            }

        const isModal = !!(
            location.state &&
            location.state.modal &&
            this.previousLocation !== location
        );         

    return (
        <div>
            <Link 
                to={{
                pathname: `/admin/product/add`,
                state: { modal: true }
             }}>
                <button className='add-edit-delete add'>
                    Add product
                </button> 
            </Link>
            <Switch location={isModal ? this.previousLocation : location}>
                <Route
                    exact
                    path={routes.admin}
                    render={()=> 
                        <ProductListScene 
                            {...this.state}
                            onProductTitleClick = {this.handleProductTitleClick}
                            onProductDeleteClick = {this.handleProductDeleteClick}
                            
                        />}
                />
                <Route path='*' component={NotFoundScene} />
            </Switch>
            {isModal ? 
                <Switch>
                <Route
                    path={routes.productEditID}
                    render={props => (
                        <Modal {...props} >
                            <ProductEdit
                                {...props}
                                {...this.state}
                                productId={location.state.id}
                                onProductEditSave = {this.handleProductEditSave}
                                onTitleValueChange = {this.handleTitleValueChange}
                                onPriceValueChange = {this.handlePriceValueChange} 
                                onImageUrlValueChange = {this.handleImageUrlValueChange} 
                                onDescriptionValueChange = {this.handleDescriptionValueChange}
                            />
                        </Modal>
                    )}
                />
                <Route
                    path={routes.productAdd}
                    render={props => (
                        <Modal {...props} >
                            <ProductAdd
                                {...props}
                                {...this.state}
                                productId={location.state.id}
                                onProductAddSave = {this.handleProductAddSave}
                                onTitleValueChange = {this.handleTitleValueChange}
                                onPriceValueChange = {this.handlePriceValueChange} 
                                onImageUrlValueChange = {this.handleImageUrlValueChange} 
                                onDescriptionValueChange = {this.handleDescriptionValueChange}
                            />
                        </Modal>
                    )}
                />
                </Switch>
                : null
            }
        </div>
    );
  }
}

export default withRouter(AdminScene);