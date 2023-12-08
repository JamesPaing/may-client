//@ts-ignore
import { gql } from '@apollo/client';

export const GET_TRANSFER_HISTORY = gql`
    query GetTransferHistory($userId: ID, $queryString: QueryString) {
        getTransferHistory(userId: $userId, queryString: $queryString) {
            id
            _id
            transferrer {
                _id
                name
            }
            status
            receiver {
                _id
                name
            }
            amount
            createdAt
            updatedAt
        }
    }
`;

export const CREATE_TRANSFER = gql`
    mutation CreateTransfer($transfer: TransferInput) {
        createTransfer(transfer: $transfer) {
            id
            _id
            transferrer {
                _id
                name
            }
            status
            receiver {
                _id
                name
            }
            amount
            createdAt
            updatedAt
        }
    }
`;

export const TRANSACTION_COMPLETED = gql`
    subscription TransactionCompleted {
        transactionCompleted {
            transferrer
            receiver
            amount
        }
    }
`;
