import gql from 'graphql-tag';

export const getNews = gql`
    {
        news{
            _id
            title
            url
            image
            created
            content
            audio
            source
        }
    }
` 