//installation
import { gql } from '@apollo/client';

export const GET_USER = gql`
{
    getUSER {
        _id
        username
        email
    }
}`;