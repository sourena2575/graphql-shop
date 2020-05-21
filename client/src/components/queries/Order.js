import gql from "graphql-tag";

export const addOrderMutation = gql`
  mutation addOrder($products: [ID], $price: Int!) {
    addOrder(products: $products, price: $price) {
      id
      userName
      products
      createdAt
      payed
      status
      price
    }
  }
`;

export const removeCartMutation = gql`
  mutation removeCart($productId: ID!, $orderId: ID!) {
    removeCart(productId: $productId, orderId: $orderId) {
      id
      products
    }
  }
`;

export const getOrders = gql`
  query getOrders {
    getOrders {
      products
      id
      payed
      status
      userName
      createdAt
      price
    }
  }
`;

export const getOrder = gql`
  query getOrder($orderId: ID) {
    getOrder(orderId: $orderId) {
      id
      title
      image
      price
      color
      company
      size
      number
      desc
      createdAt
      comments {
        id
        userName
        body
        createdAt
      }
      commentCount
      likeCount
    }
  }
`;

export const payCart = gql`
  mutation payCart($orderId: ID) {
    payCart(orderId: $orderId) {
      id
      status
      payed
    }
  }
`;

export const deleteOrderMutation = gql`
  mutation deleteOrder($orderId: ID!) {
    deleteOrder(orderId: $orderId) {
      id
    }
  }
`;
