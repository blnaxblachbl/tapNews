import React, { useState, useEffect } from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    Image,
    TouchableOpacity
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import moment from 'moment'
import 'moment/locale/ru'

moment.locale('ru');

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
    itemContainer: {
        width: "100%",
        alignItems: 'center',
        backgroundColor: "white",
        borderRadius: 15,
        overflow: "hidden",
        borderWidth: 0.2
    },
    title: {
        fontSize: 17,
        fontWeight: "bold",
        color: "black",
        marginVertical: 10,
        width: "90%",
        letterSpacing: 1.5,
    },
    description: {
        fontSize: 14,
        marginBottom: 10,
        width: "90%",
        lineHeight: 22
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
        marginBottom: 15,
    }
})

const NewsItem = ({ item, navigation }) => {

    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => { navigation.navigate('Modal', { item }) }}
            style={styles.itemContainer}
        >
            {
                item.image ? (
                    <Image
                        source={{ uri: item.image }}
                        style={{
                            width: width * 0.91,
                            height: 260,
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
            <Text style={styles.title}>{item.title}</Text>
            <Text numberOfLines={3} style={styles.description}>{item.content}</Text>
            <View style={styles.info}>
                <Text style={styles.source}>{item.source}</Text>
                <Text style={styles.created}>{moment(item.created).format("lll")}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default NewsItem