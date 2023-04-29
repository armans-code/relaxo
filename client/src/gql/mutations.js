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

export const CREATE_ENTRY = gql`
    mutation createEntry($input: CreateEntryInput!) {
        createEntry(input: $input) {
            id
            content
            sentiment
            createdAt
        }
    }
`;