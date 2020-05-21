import gql from "graphql-tag";

export const getProducts = gql`
  {
    getProducts {
      id
      image
      price
      color
      company
      size
      number
      createdAt
      commentCount
      likeCount
      desc
      title
      comments {
        id
        body
        userName
        createdAt
      }
      likes {
        id
        userName
        createdAt
      }
    }
  }
`;

export const createCommentMutation = gql`
  mutation createComment($productId: ID!, $body: String!) {
    createComment(productId: $productId, body: $body) {
      id
      comments {
        createdAt
        body
        userName
        id
      }
    }
  }
`;

export const deleteCommentMutattion = gql`
  mutation deleteComment($productId: ID!, $commentId: ID!) {
    deleteComment(productId: $productId, commentId: $commentId) {
      id
      comments {
        id
        userName
        body
      }
    }
  }
`;

export const likeProductMutation = gql`
  mutation likeProduct($productId: ID!) {
    likeProduct(productId: $productId) {
      id
      likes {
        id
        userName
        createdAt
      }
      likeCount
    }
  }
`;

export const deleteProductMutation = gql`
  mutation deleteProduct($productId: ID!) {
    deleteProduct(productId: $productId) {
      id
    }
  }
`;

export const createProductMutation = gql`
  mutation createProduct(
    $image: String
    $price: Int
    $color: String
    $company: String
    $size: String
    $number: Int
    $desc: String
    $title: String
  ) {
    createProduct(
      image: $image
      price: $price
      color: $color
      company: $company
      size: $size
      number: $number
      desc: $desc
      title: $title
    ) {
      id
      image
    }
  }
`;

export const uploadMutation = gql`
  mutation singleUpload($file: Upload!) {
    singleUpload(file: $file) {
      id
    }
  }
`;
