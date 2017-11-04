import React from 'react'
import { styles } from '../shared/styles'
import { gql, graphql } from 'react-apollo'
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    RefreshControl,
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
    listItemText: {
        fontSize: 24,
        textAlign: 'center',
    },
})
export const SelectDinnerView = ({ navigation, data }) => (
    <View style={styles.container}>
        <Text>Select dinner {navigation.state.params.date}</Text>
        <FlatList
            data={data.food}
            keyExtractor={item => item.id}
            onRefresh={data.refetch}
            refreshing={data.networkStatus === 4}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View style={localStyles.listItem}>
                        <Text style={localStyles.listItemText}>
                            {item.name}
                        </Text>
                    </View>
                </TouchableOpacity>
            )}
        />
    </View>
)

export const SelectDinner = graphql(
    gql`
        {
            food {
                id
                name
            }
        }
    `,
    { options: { notifyOnNetworkStatusChange: true } }
)(SelectDinnerView)
