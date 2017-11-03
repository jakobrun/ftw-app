'use strict'
import React from 'react'
import { styles } from '../shared/styles'
import { View, Text, Button, WebView, Image } from 'react-native'
export const Menu = ({ user }) => (
    <View style={[styles.container]}>
        <Text>Welcome {user.displayName}!!!</Text>
        <Image
            style={{ width: 50, height: 50, borderRadius: 5 }}
            source={{ uri: user.photos[0].value }}
        />
    </View>
)
