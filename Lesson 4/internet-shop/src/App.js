import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { withRouter } from "react-router-dom";
import './App.css';
import { routes } from './common/routes';
import Header from './common/header';
import Footer from './common/footer';
import UserScene from './components/User/UserScene';
import AdminScene from './components/Admin/AdminScene';

const App = () => (
    <div>
      <Header />
      <div className='App'>
        <Link to={routes.home}>
          Home - 
        </Link>
        <Link to={routes.admin}>
          - Admin
        </Link>
        <Switch>
          <Route path={routes.admin} render={props => <AdminScene {...props} /> } />
          <Route path={routes.home} render={props => <UserScene {...props} /> } />
        </Switch>
      </div>
      <Footer />
    </div>
)

export default withRouter(App);
/* */