//@ts-ignore
import { gql } from '@apollo/client';

export const GET_DEPOSIT_HISTORY = gql`
    query GetDepositHistory($userId: ID, $queryString: QueryString) {
        getDepositHistory(userId: $userId, queryString: $queryString) {
            id
            _id
            user {
                _id
                name
            }
            status
            screenShot
            approvedBy {
                _id
            }
            amount
            createdAt
            updatedAt
        }
    }
`;

export const CREATE_DEPOSIT = gql`
    mutation CreateDeposit($deposit: DepositInput) {
        createDeposit(deposit: $deposit) {
            id
            _id
            user {
                _id
                name
            }
            status
            screenShot
            approvedBy {
                _id
            }
            amount
            createdAt
            updatedAt
        }
    }
`;

export const DEPOSIT_APPROVED = gql`
    subscription DepositApproved {
        depositApproved {
            message
            user
            deposit
        }
    }
`;
