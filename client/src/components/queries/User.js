import gql from "graphql-tag";

export const signupMutation = gql`
  mutation signup(
    $name: String!
    $lastName: String!
    $userName: String!
    $email: String!
    $password: String!
  ) {
    signup(
      name: $name
      lastName: $lastName
      userName: $userName
      email: $email
      password: $password
    ) {
      id
      name
      lastName
      email
      userName
      token
    }
  }
`;

export const loginMutation = gql`
  mutation login($userName: String!, $password: String!) {
    login(userName: $userName, password: $password) {
      id
      name
      lastName
      email
      userName
      token
    }
  }
`;

export const addToCartMutation = gql`
  mutation addToCart($productId: ID!, $userId: ID!) {
    addToCart(productId: $productId, userId: $userId) {
      id
      userName
      cart
    }
  }
`;

export const getCart = gql`
  query getCart($userId: ID!) {
    getCart(userId: $userId) {
      id
      title
      image
      price
      company
      desc
      size
      number
      color
    }
  }
`;

export const deleteFromCartMutation = gql`
  mutation deleteFromCart($productId: ID!, $userId: ID!) {
    deleteFromCart(productId: $productId, userId: $userId) {
      id
      cart
    }
  }
`;
