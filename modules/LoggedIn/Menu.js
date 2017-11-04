'use strict'
// @flow
import { gql, graphql } from 'react-apollo'
import React from 'react'
import moment from 'moment'
import { styles } from '../shared/styles'
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    RefreshControl,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from 'react-native'

const localStyles = StyleSheet.create({
    list: {
        marginBottom: 20,
    },
    listItem: {
        backgroundColor: '#fff',
        padding: 32,
        marginTop: 1,
    },
    listItemDate: {
        fontSize: 16,
        paddingBottom: 16,
        textAlign: 'center',
    },
    listItemDinner: {
        fontSize: 24,
        textAlign: 'center',
    },
})

const MenuView = ({ data, navigation }) => {
    if (data.error) {
        return (
            <View style={styles.container}>
                <Text>Error! {data.error.message}</Text>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <FlatList
                data={data.dayMenu}
                keyExtractor={item => item.date}
                onRefresh={data.refetch}
                refreshing={data.networkStatus === 4}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate('SelectDinner', {
                                date: item.date,
                            })}
                    >
                        <View style={localStyles.listItem}>
                            <Text style={localStyles.listItemDate}>
                                {moment(item.date).format('dddd, MMM Do')}
                            </Text>
                            <Text style={localStyles.listItemDinner}>
                                {item.dinner ? item.dinner.name : '-'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

export const Menu = graphql(
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
