'use strict'
// @flow
import { Constants } from 'expo'
import {
    gql,
    ApolloClient,
    createNetworkInterface,
    ApolloProvider,
    graphql,
} from 'react-apollo'
import React from 'react'
import { styles } from '../shared/styles'
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    RefreshControl,
    StyleSheet,
    ScrollView,
} from 'react-native'

const localStyles = StyleSheet.create({
    title: {
        fontSize: 24,
        margin: 20,
        marginBottom: 0,
    },
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
    },
    learnMore: {
        margin: 20,
        marginTop: 0,
    },
    loading: {
        margin: 50,
    },
    list: {
        marginBottom: 20,
    },
    fullApp: {
        marginBottom: 20,
        textAlign: 'center',
    },
})

const FeedList = ({ data }) => {
    console.log('data', data)
    if (data.networkStatus === 1) {
        return <ActivityIndicator style={localStyles.loading} />
    }

    if (data.error) {
        return <Text>Error! {data.error.message}</Text>
    }

    return (
        <FlatList
            renderItem={() => {
                return (
                    <ListItem
                        hideChevron
                        title={`${item.date} ${item.dinner
                            ? item.dinner.name
                            : '-'}`}
                        subtitle={''}
                    />
                )
            }}
        />
    )
}
const MenuView = ({ data }) => (
    <View style={styles.container}>
        <FlatList
            data={data.dayMenu}
            keyExtractor={item => item.date}
            onRefresh={data.refetch}
            refreshing={data.networkStatus === 4}
            renderItem={({ item }) => (
                <View>
                    <Text>
                        {item.date}: {item.dinner ? item.dinner.name : '-'}
                    </Text>
                </View>
            )}
        />
    </View>
)

export const MenuWithData = graphql(
    gql`
        {
            dayMenu(from: "2017-10-31", to: "2017-11-10") {
                date
                dinner {
                    id
                    name
                }
            }
        }
    `,
    { options: { notifyOnNetworkStatusChange: true } }
)(MenuView)

const client = new ApolloClient({
    networkInterface: createNetworkInterface({
        uri: 'https://ftw-app.herokuapp.com/graphql',
    }),
})

export const Menu = () => (
    <ApolloProvider client={client}>
        <MenuWithData />
    </ApolloProvider>
)
