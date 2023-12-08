//@ts-ignore
import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
    query GetAllUsers($queryString: QueryString) {
        getAllUsers(queryString: $queryString) {
            results
            users {
                id
                _id
                name
                contact
                email
                address
                role
                isActive
                createdAt
                updatedAt
            }
        }
    }
`;

export const GET_USER = gql`
    query GetUser($_id: ID) {
        getUser(_id: $_id) {
            id
            _id
            name
            contact
            wallet {
                _id
                balance
            }
            location {
                type
                coordinates
            }
            address
            email
            role
            isActive
            createdAt
            updatedAt
        }
    }
`;

export const CREATE_USER = gql`
    mutation CreateUser($user: UserInput) {
        createUser(user: $user) {
            id
            _id
            name
            contact
            address
            email
            location {
                type
                coordinates
            }
            role
            isActive
            createdAt
            updatedAt
        }
    }
`;

export const UPDATE_USER = gql`
    mutation UpdateUser($_id: ID, $user: UserInput) {
        updateUser(_id: $_id, user: $user) {
            id
            _id
            name
            location {
                type
                coordinates
            }
            contact
            address
            email
            role
            isActive
            createdAt
            updatedAt
        }
    }
`;

export const DELETE_USER = gql`
    mutation DeleteUser($_id: ID) {
        deleteUser(_id: $_id)
    }
`;

export const ADD_FAVOURITE_ITEM = gql`
    mutation AddFavouriteItem($_id: ID, $itemId: ID) {
        addFavouriteItem(_id: $_id, itemId: $itemId) {
            id
            _id
            name
            price
            favouritedBy
            mainImage
            vendor {
                _id
                name
            }
            categories {
                _id
                name
            }
            isActive
            createdAt
            updatedAt
        }
    }
`;

export const REMOVE_FACOURITE_ITEM = gql`
    mutation RemoveFavouriteItem($_id: ID, $itemId: ID) {
        removeFavouriteItem(_id: $_id, itemId: $itemId) {
            id
            _id
            name
            price
            favouritedBy
            mainImage
            vendor {
                _id
                name
            }
            categories {
                _id
                name
            }
            isActive
            createdAt
            updatedAt
        }
    }
`;

export const GET_ALL_FAVOURITE_ITEMS = gql`
    query GetAllFavouriteItems($_id: ID) {
        getAllFavouriteItems(_id: $_id) {
            _id
            name
            price
            mainImage
            vendor {
                _id
                name
            }
        }
    }
`;
