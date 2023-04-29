import { gql } from '@apollo/client';

export const ACCOUNT = gql`
    query account($accountId: String!) {
        account(accountId: $accountId) {
            id
            name
            email
        }
    }
`;

export const ENTRIES_BY_ACCOUNT = gql`
    query entriesByAccount($accountId: String!) {
        entriesByAccount(accountId: $accountId) {
            id
            content
            sentiment
            date
        }
    }
`;
