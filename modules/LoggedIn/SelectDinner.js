import React from 'react'
import { styles } from '../shared/styles'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import {
    View,
    Text,
    FlatList,
    Button,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import { getDayMenu } from './Menu'

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
const selectDinner = (mutate, navigation, food) => {
    mutate({
        variables: {
            date: navigation.state.params.date,
            foodId: food.id,
        },
        refetchQueries: [
            {
                query: getDayMenu,
                variables: {
                    from: navigation.state.params.date,
                    to: navigation.state.params.date,
                },
            },
        ],
    })
        .then(() => {
            console.log('success!!!')
            navigation.goBack()
        })
        .catch(() => {
            console.log('error')
        })
}

export const AddFoodButton = ({ navigation }) => (
    <Button
        style={localStyles.addFoodBtn}
        title="Add"
        onPress={() => navigation.navigate('AddFood')}
    />
)

export const SelectDinnerView = ({ navigation, data, mutate }) => (
    <View style={styles.container}>
        <Text>Select dinner {navigation.state.params.date}</Text>
        <FlatList
            data={data.food}
            keyExtractor={item => item.id}
            onRefresh={data.refetch}
            refreshing={data.networkStatus === 4}
            renderItem={({ item }) => (
                <TouchableOpacity
                    onPress={() => selectDinner(mutate, navigation, item)}
                >
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
export const getFood = gql`
    {
        food {
            id
            name
        }
    }
`
export const SelectDinner = compose(
    graphql(getFood, { options: { notifyOnNetworkStatusChange: true } }),
    graphql(gql`
        mutation SelectDinner($date: String!, $foodId: String!) {
            selectDinner(date: $date, foodId: $foodId) {
                success
            }
        }
    `)
)(SelectDinnerView)
