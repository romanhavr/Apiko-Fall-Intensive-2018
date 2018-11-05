import React from 'react';
import { Switch} from 'react-router';
import { withRouter } from 'react-router-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Modal from '../../common/modal';
import ProductChosenScene from '../Product/ProductChosenScene';
import ProductListScene from '../ProductList/ProductListScene';
import CartScene from '../Cart/CartScene';
import {AboutScene} from '../About/AboutScene';
import {ContactScene} from '../Contact/ContactScene';
import {TermsAndConditionsScene} from '../TermsAndConditions/TermsaAndConditionsScene';
import {PrivacyPolicyScene} from '../PrivacyPolicy/PrivacyPolicyScene';
import {NotFoundScene} from '../NotFound/NotFoundScene';
import { routes } from '../../common/routes';
import * as Api from '../../api/api';

class UserScene extends React.Component {
    constructor(props) {
		super(props);

        this.handleCartAdd = this.handleCartAdd.bind(this);

        this.state = {
            products: [],
            loading: true,
            cartProducts: []
        };
     } 

    async componentDidMount() {
        const productsData = await Api.Products.fetchProducts();
        this.setState({
            products: productsData.data,
            loading: false
        });
    } 
    
    handleCartAdd(id) {
        const currentProductIndex = this.state.products.findIndex(i => 
            i.id === id);
    
        if (currentProductIndex === -1) {
            return
        }
        const product = this.state.products[currentProductIndex];
        
        const newProducts = [...this.state.cartProducts];
        newProducts.push(product);

        this.setState({
            cartProducts: newProducts
        });
        
        alert(product.title+' - is added to Cart.')
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
            <Link to={routes.home}>
                - Home - 
            </Link>
            <Link to={routes.about}>
                - About -
            </Link>
            <Link to={routes.contact}>
                - Contact -
            </Link>
            <Link to={routes.termsandconditions}>
                - Terms and conditions -
            </Link>
            <Link to={routes.privacypolicy}>
                - Privacy policy
            </Link>
            <Link 
                to={{
                pathname: `${routes.cart}`,
                state: { modal: true }
             }}>
                - Cart - 
            </Link>
            <Switch location={isModal ? this.previousLocation : location}>
                <Route exact path={routes.about} component={AboutScene} />
                <Route exact path={routes.contact} component={ContactScene} />
                <Route
                    exact
                    path={routes.termsandconditions}
                    component={TermsAndConditionsScene}
                />
                <Route exact path={routes.privacypolicy} component={PrivacyPolicyScene} />
                <Route exact
                    path = {routes.cart}
                    render={props => <CartScene {...props} {...this.state} />}
                />
                <Route 
                    path={routes.productID}
                    render={ () => <ProductChosenScene
                                        {...this.state}
                                        onCartAddClick = {this.handleCartAdd}    
                                    />}
                />
                <Route exact
                    path={routes.home}
                    render={props => <ProductListScene 
                                        {...props}
                                        {...this.state} 
                                        onCartAddClick = {this.handleCartAdd}
                                    />}
                />
                <Route path='*' component={NotFoundScene} />
            </Switch>
            {isModal ? 
                <Route
                    exact
                    path={routes.cart}
                    render={props => (
                        <Modal {...props} >
                            <CartScene {...props} />
                        </Modal>
                    )}
                />
                : null
            }
        </div>
    );
  }
}

export default withRouter(UserScene);