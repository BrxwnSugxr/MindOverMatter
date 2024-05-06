//installation
import { gql } from '@apollo/client';

export const GET_USER = gql`
{
    getUSER {
        _id
        username
        email
    }
}
`
;

export const GET_EVENTS = gql`
{
    getEvents {
        _id
        title
        description
        number_of_people
        is_virtual
    }
}
`;