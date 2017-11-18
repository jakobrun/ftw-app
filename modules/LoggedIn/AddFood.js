import React from 'react'
import { styles } from '../shared/styles'
import { getFood } from './SelectDinner'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import { v4 } from 'uuid'
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'

const localStyles = StyleSheet.create({
    textInput: {
        padding: 12,
        margin: 12,
        backgroundColor: '#fff',
        borderRadius: 4,
    },
})

export class AddFoodView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
        }
    }
    insertFood = () => {
        this.props
            .mutate({
                variables: {
                    id: v4(),
                    name: this.state.name,
                },
                refetchQueries: [
                    {
                        query: getFood,
                    },
                ],
            })
            .then(() => {
                console.log('success!!!')
                this.props.navigation.goBack()
            })
            .catch(() => {
                console.log('error')
            })
    }
    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={localStyles.textInput}
                    placeholder="name"
                    autoFocus={true}
                    onChangeText={name => this.setState({ name })}
                    value={this.state.name}
                />
                <Button
                    title="Save"
                    onPress={this.insertFood}
                    disabled={!this.state.name}
                />
            </View>
        )
    }
}

export const AddFood = compose(
    graphql(gql`
        mutation AddFood($id: String!, $name: String!) {
            addFood(aggregateId: $id, name: $name) {
                success
            }
        }
    `)
)(AddFoodView)
