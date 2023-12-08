//@ts-ignore
import { gql } from '@apollo/client';

export const GET_ALL_ITEMS = gql`
    query GetAllItems($queryString: QueryString) {
        getAllItems(queryString: $queryString) {
            results
            items {
                id
                _id
                name
                price
                mainImage
                favouritedBy
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
    }
`;

export const GET_ITEM = gql`
    query GetItem($_id: ID) {
        getItem(_id: $_id) {
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

export const GET_ITEM_BY_CATEGORY = gql`
    query GetItemByCategory($catId: ID, $queryString: QueryString) {
        getItemByCategory(catId: $catId, queryString: $queryString) {
            results
            items {
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
    }
`;

export const GET_ITEM_BY_VENDOR = gql`
    query GetItemByVendor($vendorId: ID, $queryString: QueryString) {
        getItemByVendor(vendorId: $vendorId, queryString: $queryString) {
            results
            items {
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
    }
`;
