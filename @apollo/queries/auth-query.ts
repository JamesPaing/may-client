//@ts-ignore
import { gql } from '@apollo/client';

export const LOGIN = gql`
    mutation Login($credentials: LoginCredentials) {
        login(credentials: $credentials) {
            token
            user {
                _id
                name
                email
                contact
                role
                isActive
            }
            isAuth
        }
    }
`;

export const REGISTER = gql`
    mutation Register($credentials: RegisterCredentials) {
        register(credentials: $credentials) {
            token
            user {
                _id
                name
                email
                contact
                role
                isActive
            }
            isAuth
        }
    }
`;
