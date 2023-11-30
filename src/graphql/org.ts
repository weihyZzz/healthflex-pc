import { gql } from '@apollo/client';

export const GET_ORGS = gql`
query getOrganizations($page: PageInput!) {
    getOrganizations(page: $page){
      code
      message
      page {
        total
        pageNum
        pageSize
      }
      data {
        id
        logo
        name
        address
        tags
      }
    }
  }
`;
