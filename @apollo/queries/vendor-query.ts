//@ts-ignore
import { gql } from '@apollo/client';

export const GET_ALL_VENDORS = gql`
    query GetAllVendors($queryString: QueryString) {
        getAllVendors(queryString: $queryString) {
            results
            vendors {
                id
                _id
                township
                city
                name
                logo
                isActive
                createdAt
                updatedAt
            }
        }
    }
`;
