//@ts-ignore
import { gql } from '@apollo/client';

export const GET_ALL_CATEGORIES = gql`
    query GetAllCategories($queryString: QueryString) {
        getAllCategories(queryString: $queryString) {
            results
            categories {
                id
                _id
                name
                image
                isActive
                createdAt
                updatedAt
            }
        }
    }
`;
