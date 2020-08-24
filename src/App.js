import React from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { Route, Switch } from 'react-router-dom';
import Orders from './containers/Orders/Orders';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/Checkout" component={Checkout}/>
        <Route path="/Orders" component={Orders}/>
        <Route path="/" exact component={BurgerBuilder}/>
      </Switch>
    </Layout>
  );
}

export default App;
