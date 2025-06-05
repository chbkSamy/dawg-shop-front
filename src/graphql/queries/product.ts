import { gql } from "@apollo/client"

export const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      id
      name
      slug
      description
      assets {
        preview
      }
      variants {
        id
        name
        price
        stockLevel
      }
    }
  }
`

