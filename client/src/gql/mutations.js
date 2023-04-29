import { gql } from '@apollo/client';

export const CREATE_ACCOUNT = gql`
    mutation createAccount($input: CreateAccountInput!) {
        createAccount(input: $input) {
            id
            name
            email
        }
    }
`;
