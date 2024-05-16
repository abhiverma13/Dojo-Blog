/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getBlogs = /* GraphQL */ `
  query GetBlogs($id: ID!) {
    getBlogs(id: $id) {
      id
      title
      body
      author
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listBlogs = /* GraphQL */ `
  query ListBlogs(
    $filter: ModelBlogsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBlogs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        body
        author
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
