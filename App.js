/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Dimensions
} from 'react-native';
import ApolloProvider from './ApolloProvider'
import Main from './router'

const { width, height } = Dimensions.get("window")

export default App = () => {
    return (
        <ApolloProvider>
            <Main />
        </ApolloProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width,
        alignItems: "center",
        justifyContent: "center"
    }
});

