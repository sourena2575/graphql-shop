import React from "react";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";
import { setContext } from "apollo-link-context";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavbarFile from "./components/basic/NavbarFile";
import Signup from "./components/authentication/Signup";
import Login from "./components/authentication/Login";
import ProductList from "./components/product/ProductList";
import AddProduct from "./components/product/AddProduct";
import CartFile from "./components/product/CartFile";
import OrderFile from "./components/orders/OrderFile";
import OrderDetails from "./components/orders/OrderDetails";

const user = JSON.parse(localStorage.getItem("user"));
const httpLink = createHttpLink({
  uri: "https://amir19.herokuapp.com/",
});
const authLink = setContext(() => {
  if (user) {
    return {
      headers: {
        Authorization: `${user.token}`,
      },
    };
  } else {
    return "";
  }
});
const client = new ApolloClient({
  link: user ? authLink.concat(httpLink) : httpLink,
  cache: new InMemoryCache(),
});
function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <NavbarFile />
        <Switch>
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/products" component={ProductList} />
          <Route exact path="/products/add" component={AddProduct} />
          <Route exact path="/cart" component={CartFile} />
          <Route exact path="/orders" component={OrderFile} />
          <Route exact path="/orders/:id" component={OrderDetails} />
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
