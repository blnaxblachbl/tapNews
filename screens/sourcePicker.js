import React, { useState, useEffect } from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    TouchableOpacity
} from 'react-native'

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.4)",
        zIndex: 999
    },
    whiteContainer: {
        width: '80%',
        minHeight: 200,
        backgroundColor: "white",
        borderRadius: 15,
        alignItems: "center",
    },
    title: {
        fontSize: 21,
        fontWeight: "bold",
        color: "black",
        marginVertical: 10,
        width: "90%",
        letterSpacing: 1.5,
    },
    itemContainer: {
        width: "90%",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
        marginTop: 10
    },
    circleOut: {
        width: 18,
        height: 18,
        borderRadius: 9,
        borderColor: "#ff9999",
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    circleIn: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#ff9999",
    },
    itemTitle: {
        fontSize: 17,
        color: "black"
    }
})

const SourcePicker = props => {

    if (!props.visible) return null

    const setData = (data) => {
        setTimeout(() => { props.setFilter(data) }, 0)
        props.setModalVisible(false)
    }

    return (
        <View style={styles.container}>
            <View style={styles.whiteContainer}>
                <Text style={styles.title}>Выберите источник</Text>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => { setData("all") }}
                    style={styles.itemContainer}
                >
                    <Text style={styles.itemTitle}>Все</Text>
                    <View style={styles.circleOut}>
                        {props.filter == "all" ? (<View style={styles.circleIn} />) : null}
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => { setData("ysia.ru") }}
                    style={styles.itemContainer}
                >
                    <Text style={styles.itemTitle}>ysia.ru</Text>
                    <View style={styles.circleOut}>
                        {props.filter == "ysia.ru" ? (<View style={styles.circleIn} />) : null}
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => { setData("vc.ru") }}
                    style={styles.itemContainer}
                >
                    <Text style={styles.itemTitle}>vc.ru</Text>
                    <View style={styles.circleOut}>
                        {props.filter == "vc.ru" ? (<View style={styles.circleIn} />) : null}
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => { setData("lenta.ru") }}
                    style={styles.itemContainer}
                >
                    <Text style={styles.itemTitle}>lenta.ru</Text>
                    <View style={styles.circleOut}>
                        {props.filter == "lenta.ru" ? (<View style={styles.circleIn} />) : null}
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SourcePicker