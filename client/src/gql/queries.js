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
