import { CREATE_WITHDRAWAL } from './../../../vendor/@apollo/queries/withdrawal-query';
import { gql } from '@apollo/client';

export const CREATE_ORDER = gql`
    mutation CreateOrder($order: OrderInput) {
        createOrder(order: $order) {
            _id
        }
    }
`;

export const GET_ORDER_HISTORY = gql`
    query GetOrderHistory($userId: ID, $queryString: QueryString) {
        getOrderHistory(userId: $userId, queryString: $queryString) {
            _id
            ref
            status
            grandTotal
            date
            itemCount
        }
    }
`;

export const GET_ORDER = gql`
    query GetOrder($_id: ID) {
        getOrder(_id: $_id) {
            id
            _id
            ref
            user {
                _id
                name
            }
            orderItems {
                _id
            }
            address
            location {
                type
                coordinates
            }
            payments {
                _id
            }
            total
            subTotal
            screenShot
            note
            status
            createdAt
            updatedAt
        }
    }
`;
