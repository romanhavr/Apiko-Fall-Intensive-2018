import React from 'react';
import { Switch} from 'react-router';
import { withRouter } from 'react-router-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from 'react-redux';
import * as productsOperations from '../../modules/products/productsOperations';
import * as productsSelectors from '../../modules/products/productsSelectors';
import * as cartActions from '../../modules/cart/cartActions';
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
// import * as Api from '../../api/api';

class UserScene extends React.Component {
   /* constructor(props) {
		super(props);

       this.handleCartAdd = this.handleCartAdd.bind(this);

     } */

    componentDidMount() {
        this.props.fetchProducts();
    } 
    
   /* handleCartAdd(id) {
        const currentItemIndex = this.props.products.findIndex(i => 
            i.id === id);
    
        if (currentItemIndex === -1) {
            return
        }
        const item = this.props.products[currentItemIndex];
        
       // this.props.items.push(item); 

     //  this.props.addToCart();
        console.log('dfh - ',this.props.items)
    } */

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
                    render={props => <CartScene {...props} {...this.props} />}
                />
                <Route 
                    path={routes.productID}
                    render={() => <ProductChosenScene
                                        {...this.props}
                                        onCartAddClick = {this.props.addToCart} 
                                                        //{this.handleCartAdd}   
                                    />}
                />
                <Route exact
                    path={routes.home}
                    render={props => <ProductListScene 
                                        {...props}
                                        {...this.props} 
                                        onCartAddClick = {this.props.addToCart}
                                                        //{this.handleCartAdd}
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

const mapStateToProps = state => ({
    products: productsSelectors.getProducts(state),
    items: state.cart.items,
    isLoading: state.products.isLoading,
    isError: !!state.products.error,
    error: state.products.error,
});

const mapStateToDispatch = {
    fetchProducts: productsOperations.fetchProducts,
    addToCart: cartActions.add,
};

export default connect(
    mapStateToProps,
    mapStateToDispatch)   
(withRouter(UserScene));