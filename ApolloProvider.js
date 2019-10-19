import React from 'react'
import AsyncStorage from '@react-native-community/async-storage';
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { ApolloLink, split } from 'apollo-link'
import { ApolloProvider } from 'react-apollo'
import { setContext } from 'apollo-link-context'
import { createUploadLink } from 'apollo-upload-client'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { SubscriptionClient } from 'subscriptions-transport-ws'

// import { showToast } from './components/toast'
// import { spinnerStop } from './components/spinner'

import {
    url,
    imageUrl
} from './appConfig.json'

const authLink = setContext(async (_, { headers }) => {
    const token = await AsyncStorage.getItem('token')
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    }
})

// const wsClient = new SubscriptionClient(url, {
//     reconnect: true,
//     // connectionParams: async () => {
//     //     const token = await AsyncStorage.getItem('token')
//     //     return { authorization: token ? token : '' }
//     // },
//     // keepAlive: true,
//     // lazy: true,
// })

// wsClient.onConnected(() => {
//     console.log("wsClient connected")
// })

// wsClient.onDisconnected(() => {
//     console.log("wsClient disconnected")
// })

// wsClient.onReconnected(() => {
//     console.log("wsClient reconnected")
// })

// wsClient.onError((e) => {
//     console.log("wsClient error", e)
// })

// const wsLink = new WebSocketLink(wsClient)

const clearData = async () => {
    await client.cache.reset()
    await AsyncStorage.clear()
}

const httpLink = new HttpLink({ uri: url, credentials: 'same-origin' })

const errorLink = onError(
    ({ response, graphQLErrors, networkError, operation, forward }) => {
        // spinnerStop()
        console.log(networkError)
        console.log(graphQLErrors)
        if (graphQLErrors) {
            for (let err of graphQLErrors) {
                if (err.message == "User Not Found") {
                    clearData()
                }
            }
        }
        if (networkError) {
            // showToast('Нет подключения к интернету')
            console.log(networkError)
        }
    }
)

const uploadLink = createUploadLink({
    uri: url,
    credentials: 'same-origin'
})

const withUpload = authLink.concat(uploadLink)

// const splitedLink = split(
//     ({ query }) => {
//         const { kind, operation } = getMainDefinition(query)
//         return kind === 'OperationDefinition' && operation === 'subscription'
//     },
//     wsLink,
//     withUpload,
//     httpLink,
// )

const link = ApolloLink.from([errorLink, withUpload, httpLink])

export const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache({
        dataIdFromObject: object => object.id || null,
        addTypename: false
    }),
    defaultFetchPolicy: 'network-only',
})

export default Apollo = props => {
    return (
        <ApolloProvider client={client}>
            {props.children}
        </ApolloProvider>
    )
}