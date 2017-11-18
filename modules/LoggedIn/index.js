import React from 'react'
import { StackNavigator } from 'react-navigation'
import { Menu } from './Menu'
import { SelectDinner, AddFoodButton } from './SelectDinner'
import { AddFood } from './AddFood'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { Text } from 'react-native'

const client = new ApolloClient({
    link: new HttpLink({
        uri: 'https://ftw-app.herokuapp.com/graphql',
    }),
    cache: new InMemoryCache({
        dataIdFromObject: o => o.id || o.date,
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
            navigationOptions: ({ navigation }) => ({
                headerTitle: 'Select Dinner',
                headerRight: AddFoodButton({ navigation }),
            }),
        },
        AddFood: {
            screen: AddFood,
            navigationOptions: {
                headerTitle: 'Add Food',
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
