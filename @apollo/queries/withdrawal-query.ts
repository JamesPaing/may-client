//@ts-ignore
import { gql } from '@apollo/client';

export const GET_WITHDRAWAL_HISTORY = gql`
    query GetWithdrawalHistory($userId: ID, $queryString: QueryString) {
        getWithdrawalHistory(userId: $userId, queryString: $queryString) {
            id
            _id
            user {
                _id
                name
            }
            status
            bankAccount
            approvedBy {
                _id
            }
            amount
            createdAt
            updatedAt
        }
    }
`;

export const CREATE_WITHDRAWAL = gql`
    mutation CreateWithdrawal($withdrawal: WithdrawalInput) {
        createWithdrawal(withdrawal: $withdrawal) {
            id
            _id
            user {
                _id
                name
            }
            status
            bankAccount
            approvedBy {
                _id
            }
            amount
            createdAt
            updatedAt
        }
    }
`;

export const WITHDRAWAL_APPROVED = gql`
    subscription WithdrawalApproved {
        withdrawalApproved {
            message
            user
            withdrawal
        }
    }
`;
