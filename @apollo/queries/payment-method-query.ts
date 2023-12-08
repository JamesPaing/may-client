//@ts-ignore
import { gql } from '@apollo/client';

export const GET_ALL_PAYMENT_METHODS = gql`
    query GetAllPaymentMethods($queryString: QueryString) {
        getAllPaymentMethods(queryString: $queryString) {
            results
            paymentMethods {
                id
                _id
                name
                type
                extra
                createdAt
                updatedAt
            }
        }
    }
`;
