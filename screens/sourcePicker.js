import React, { useState, useEffect } from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    TouchableOpacity,
    ScrollView,
    Image
} from 'react-native'

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width,
        backgroundColor: "#444f5a",
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
        color: "white",
        marginVertical: 10,
        marginTop: 15,
        width: "90%",
        letterSpacing: 1.5,
    },
    itemContainer: {
        width: "90%",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
        marginTop: 15
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
        color: "white"
    },
    buttonContainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: "center",
        width,
        backgroundColor: "#444f5a",
        bottom: 0
    },
    button: {
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 5,
        padding: 10,
        width: "90%",
        alignItems: "center",
        marginBottom: 15
    },
    buttonText: {
        color: "white",
        fontSize: 14,
        fontWeight: "bold",
    }
})

const feeds = [
    {
        label: 'YSIA Актуальное',
        value: 'ysia-actual',
        icon: require('../ysia.jpg')
    },
    {
        label: 'YSIA Экономика',
        value: 'ysia-economika',
        icon: require('../ysia.jpg')
    },
    {
        label: 'YSIA Спорт',
        value: 'ysia-sport',
        icon: require('../ysia.jpg')
    },
    {
        label: 'YSIA Политика',
        value: 'ysia-politika',
        icon: require('../ysia.jpg')
    },
    {
        label: 'VCRU Актуальное',
        value: 'vcru-actual',
        icon: require('../vc.jpg')
    },
    {
        label: 'VCRU Финансы',
        value: 'vcru-finance',
        icon: require('../vc.jpg')
    },
    {
        label: 'VCRU Техника',
        value: 'vcru-tech',
        icon: require('../vc.jpg')
    },
    {
        label: 'VCRU Личный опыт',
        value: 'vcru-life',
        icon: require('../vc.jpg')
    },
    {
        label: 'Лента.РУ Актуальное',
        value: 'lenta-actual',
        icon: require('../lenta.jpg')
    },
    {
        label: 'Лента.РУ Россия',
        value: 'lenta-russia',
        icon: require('../lenta.jpg')
    },
    {
        label: 'Лента.РУ Путешествие',
        value: 'lenta-travel',
        icon: require('../lenta.jpg')
    }
]

const SourcePicker = props => {

    // if (!props.visible) return null

    const {
        setFilter,
        filter
    } = props.navigation.state.params

    const [state, setState] = useState(filter)

    const setData = () => {
        setFilter(state)
        props.navigation.goBack()
    }

    return (
        <>
            <ScrollView style={styles.container} contentContainerStyle={{ alignItems: "center", paddingBottom: 90 }}>
                <Text style={styles.title}>Выберите источник</Text>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => { setState([]) }}
                    style={styles.itemContainer}
                >
                    <Text style={styles.itemTitle}>Все</Text>
                    <View style={styles.circleOut}>
                        {state.length == 0 ? (<View style={styles.circleIn} />) : null}
                    </View>
                </TouchableOpacity>
                {
                    feeds.map((item, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                activeOpacity={0.6}
                                onPress={() => {
                                    if (state.includes(item.value)) {
                                        let newState = state.filter((l) => {
                                            if (l != item.value) {
                                                return l
                                            }
                                        })
                                        setState(newState)
                                    } else {
                                        setState(prev => ([
                                            ...prev,
                                            item.value
                                        ]))
                                    }

                                }}
                                style={styles.itemContainer}
                            >
                                <View style={{ alignItems: 'center', flexDirection: "row" }}>
                                    <Image
                                        source={item.icon}
                                        resizeMode="contain"
                                        style={{ height: 25, maxWidth: 50, marginRight: 10 }}
                                    />
                                    <Text style={styles.itemTitle}>{item.label}</Text>
                                </View>
                                <View style={styles.circleOut}>
                                    {state.indexOf(item.value) != -1 ? (<View style={styles.circleIn} />) : null}
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={setData}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Применить</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default SourcePicker