'use strict'
// @flow
import React, { Component } from 'react'
import { View, Text, Button, WebView, Image } from 'react-native'
import { styles } from './modules/shared/styles'
import { LoggedIn } from './modules/LoggedIn'
// Change these to reflect
const LOGIN_URL = 'https://ftw-app.herokuapp.com/login/facebook'
const LOGIN_SUCCESS_URL = 'https://ftw-app.herokuapp.com/login/facebook/return'
const HOME_URL = 'https://ftw-app.herokuapp.com/api/v1/user'
const LOGOUT_URL = 'https://ftw-app.herokuapp.com/logout'

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: undefined,
            loadedCookie: false,
        }
    }
    componentWillMount() {
        this.fetchUser()
    }
    fetchUser = () => {
        fetch(HOME_URL, {
            credentials: 'include',
        })
            .then(res => {
                console.log('status', res.status)
                if (res.status === 200) {
                    return res.json()
                }
                this.setState({
                    user: undefined,
                    loadedCookie: true,
                })
            })
            .then(user => {
                this.setState({
                    loadedCookie: true,
                    user,
                })
            })
            .catch(err => {
                console.log('error', err)
            })
    }
    logout = () => {
        fetch(LOGOUT_URL, {
            method: 'POST',
            credentials: 'include',
        })
            .then(res => {
                if (res.status !== 200) {
                    throw new Error(`logout failed, status ${res.status}`)
                }
                this.setState({
                    loadedCookie: false,
                    user: undefined,
                })
            })
            .catch(err => {
                console.log('error', err)
            })
    }

    onNavigationStateChange(navState) {
        // If we get redirected back to the HOME_URL we know that we are logged in. If your backend does something different than this
        // change this line.
        console.log('url', navState.url)
        if (navState.url.startsWith(LOGIN_SUCCESS_URL) && !this.state.user) {
            console.log('fetch user after login success')
            this.fetchUser()
        }
    }

    render() {
        // If we have completed loading the cookie choose to show Login WebView or the LoggedIn component, else just show an empty View.
        if (this.state.loadedCookie) {
            if (this.state.user) {
                return <LoggedIn />
            } else {
                return (
                    <View style={[styles.container]}>
                        <WebView
                            ref={'webview'}
                            automaticallyAdjustContentInsets={false}
                            style={styles.webView}
                            source={{ uri: LOGIN_URL }}
                            javaScriptEnabled={true}
                            onNavigationStateChange={this.onNavigationStateChange.bind(
                                this
                            )}
                            startInLoadingState={true}
                            scalesPageToFit={true}
                        />
                    </View>
                )
            }
        } else {
            return (
                <View style={[styles.container]}>
                    <Button onPress={this.fetchUser} title="Login" />
                </View>
            )
        }
    }
}
