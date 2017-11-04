import React from 'react'
import { StackNavigator } from 'react-navigation'
import { Menu } from './Menu'
import { SelectDinner } from './SelectDinner'
import {
    ApolloClient,
    createNetworkInterface,
    ApolloProvider,
} from 'react-apollo'
const client = new ApolloClient({
    networkInterface: createNetworkInterface({
        uri: 'https://ftw-app.herokuapp.com/graphql',
    }),
})

const Nav = StackNavigator(
    {
        Menu: {
            screen: Menu,
            navigationOptions: {
                headerTitle: 'Menu',
            },
        },
        SelectDinner: {
            screen: SelectDinner,
            navigationOptions: {
                headerTitle: 'Select dinner',
            },
        },
    },
    { initialRouteName: 'Menu', mode: 'modal' }
)
export const LoggedIn = () => (
    <ApolloProvider client={client}>
        <Nav />
    </ApolloProvider>
)
