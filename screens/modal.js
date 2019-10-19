import React, { useState, useEffect } from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    Linking
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import moment from 'moment'
import 'moment/locale/ru'

moment.locale('ru');

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#444f5a",
    },
    title: {
        fontSize: 17,
        fontWeight: "bold",
        color: "white",
        marginVertical: 10,
        width: "90%",
        letterSpacing: 1.5,
    },
    content: {
        fontSize: 14,
        width: "90%",
        color: "white",
        lineHeight: 22,
        marginBottom: 25
    },
    noImageAddContainer: {
        width: width * 0.91,
        height: 260,
        backgroundColor: "#ffffff",
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: "white" 
    },
    created: {
        fontSize: 12,
        color: "grey"
    },
    source: {
        fontSize: 14,
        color: "red"
    },
    info: {
        width: "90%",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
        marginTop: 15,
    },
    button: {
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 5,
        padding: 10,
        width: "90%",
        alignItems: "center",
        marginBottom: 25
    },
    buttonText: {
        color: "white",
        fontSize: 14,
        fontWeight: "bold",
    }
})

const Modal = props => {

    const { item } = props.navigation.state.params

    return (
        <ScrollView style={[styles.container]} contentContainerStyle={{ alignItems: "center" }}>
            {
                item.image ? (
                    <Image
                        source={{ uri: item.image }}
                        style={{
                            width,
                            height: 210,
                        }}
                        resizeMode="cover"
                    />
                ) : (
                        <View style={[styles.noImageAddContainer]}>
                            <FontAwesome
                                name="image"
                                size={120}
                                color="#00C059"
                            />
                        </View>
                    )
            }
            <View style={styles.info}>
                <Text style={styles.source}>{item.source}</Text>
                <Text style={styles.created}>{moment(item.created).format("lll")}</Text>
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.content}>{item.content.replace('\n', '\n\n')}</Text>
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => { Linking.openURL(item.url) }}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Открыть источник</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default Modal