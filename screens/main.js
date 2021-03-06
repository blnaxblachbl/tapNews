import React, { useState, useEffect, useRef } from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    Image,
    ActivityIndicator,
    TouchableOpacity,
    ScrollView,
    RefreshControl
} from 'react-native'
import Carousel from 'react-native-snap-carousel'
import Modal from './modal'
import Item from '../components/newsItem'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
// import Voice from 'react-native-voice'
import { getNews } from '../gqls/queries'
import { useQuery } from '@apollo/react-hooks'
import SoundPlayer from 'react-native-sound-player'
import SplashScreen from 'react-native-splash-screen'
import SourcePicker from './sourcePicker'
import AsyncStorage from '@react-native-community/async-storage';

import {
    audioUrl
} from '../appConfig.json'

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width,
        backgroundColor: "#444f5a"
    },
    control: {
        width,
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: 'space-evenly',
    },
    logo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5
    },
    logoImage: {
        width: 40,
        height: 40,
        resizeMode: 'contain'
    },
    title: {
        color: '#ffffff',
        fontSize: 24,
        marginLeft: 10,
        marginTop: 3
    }
})

const Main = (props) => {

    const { loading, data, error, refetch, fetchMore } = useQuery(getNews, {
        notifyOnNetworkStatusChange: true,
        fetchPolicy: 'network-only',
        onCompleted: () => {
            setPageReady(true)
            SplashScreen.hide()
        },
        onError: () => {
            setPageReady(true)
            SplashScreen.hide()
        }
    })

    const [selectedIndex, setIndex] = useState(0)
    const [play, setPlay] = useState(false)
    const [pageReady, setPageReady] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [filter, setFilter] = useState([])

    let timer = null

    useEffect(() => {
        setAudio()
        checkFirst()
    }, [data])

    useEffect(() => {
        if (play) {
            SoundPlayer.play()
        } else {
            SoundPlayer.pause()
        }
    }, [play])

    useEffect(() => {
        onIndexChange()
    }, [selectedIndex])

    const checkFirst = async () => {
        // await AsyncStorage.clear()
        let first = await AsyncStorage.getItem("first")
        if (!first) {
            AsyncStorage.setItem("first", "first")
            props.navigation.navigate('Source', { filter, setFilter: setFilterFunc })
        }
    }

    const onIndexChange = async () => {
        if (data && data.news && data.news.length > 0) {
            SoundPlayer.playUrl(audioUrl + filterFunc()[selectedIndex].audio)
            if (!play) {
                SoundPlayer.pause()
            }
        }
        console.log(selectedIndex)
    }

    SoundPlayer.onFinishedPlaying(() => {
        carousel.snapToNext(true)
    })

    carousel = useRef(null)

    const setAudio = () => {
        if (data && data.news && data.news.length > 0) {
            SoundPlayer.playUrl(audioUrl + filterFunc()[selectedIndex].audio)
            SoundPlayer.pause()
        }
    }

    const renderItem = ({ item, index }) => (
        <Item item={item} navigation={props.navigation} />
    )

    if (error) {
        return (
            <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
                <MaterialIcons
                    name="error-outline"
                    color="white"
                    size={90}
                />
                <Text style={{
                    color: "white",
                    width: "90%",
                    textAlign: 'center',
                    marginTop: 10,
                    lineHeight: 22
                }}>Сервис временно не доступен, попробуйте позже. Приносим свои извинения.</Text>
            </View>
        )
    }

    const renderPlayButton = () => {
        if (play) {
            return (
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => {
                        setTimeout(() => { setPlay(false) }, 0)
                    }}
                    style={{ alignItems: "center", justifyContent: "center" }}
                >
                    <Ionicons
                        name="ios-pause"
                        color="#fefffd"
                        size={45}
                    />
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => { setTimeout(() => { setPlay(true) }, 0) }}
                    style={{ alignItems: "center", justifyContent: "center" }}
                >
                    <Ionicons
                        name="ios-play"
                        color="#fefffd"
                        size={45}
                    />
                </TouchableOpacity>
            )
        }
    }

    const filterFunc = () => {
        if (data && data.news) {
            if (filter.length > 0) {
                return data.news.filter((item) => {
                    return filter.includes(item.source)
                })
            } else {
                return data.news
            }
        }
    }

    const setFilterFunc = (filter) => {
        setFilter(filter)
        setTimeout(() => { carousel.snapToNext(true) }, 200)
    }

    if (!pageReady) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator color="white" />
            </View>
        )
    }

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{
                flex: 1,
                alignItems: "center",
                justifyContent: 'center'
            }}
            refreshControl={
                <RefreshControl
                    tintColor="#fff"
                    titleColor="#fff"
                    refreshing={loading}
                    onRefresh={refetch}
                />
            }
        >
            <View style={styles.logo}>
                <Image style={styles.logoImage} source={require('../logo.png')} />
                <Text style={styles.title}>Tap News</Text>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => { props.navigation.navigate('Source', { filter, setFilter: setFilterFunc }) }}
                    style={{ alignItems: "center", justifyContent: "center" }}
                >
                    <Ionicons
                        name="md-settings"
                        size={30}
                        color={filter.length > 0 ? "#ff9999" : "white"}
                        style={{ marginLeft: 10, marginTop: 6 }}
                    />
                </TouchableOpacity>

            </View>
            <View style={{ paddingBottom: 20, paddingTop: 25, width }}>
                <Carousel
                    currentIndex={0}
                    currentScrollPosition={0}
                    loop={true}
                    ref={r => { carousel = r }}
                    layout={'stack'}
                    layoutCardOffset={9}
                    data={data && data.news ? filterFunc() : []}
                    renderItem={renderItem}
                    sliderWidth={width}
                    itemWidth={width * 0.91}
                    contentContainerCustomStyle={{
                        alignItems: "center",
                        backgroundColor: "transparent"
                    }}
                    swipeThreshold={20}
                    onBeforeSnapToItem={(index) => { setIndex(index) }}
                />
            </View>
            <View
                style={styles.control}
            >
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => {
                        if (filterFunc().length > 0) {
                            setTimeout(() => { carousel.snapToPrev(true) }, 0)
                        }
                    }}
                    style={{ alignItems: "center", justifyContent: "center" }}
                >
                    <Entypo
                        name="controller-fast-backward"
                        color="#fefffd"
                        size={35}
                    />
                </TouchableOpacity>
                {renderPlayButton()}
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => {
                        if (filterFunc().length > 0) {
                            setTimeout(() => { carousel.snapToNext(true) }, 0)
                        }
                    }}
                    style={{ alignItems: "center", justifyContent: "center" }}
                >
                    <Entypo
                        name="controller-fast-forward"
                        color="#fefffd"
                        size={35}
                    />
                </TouchableOpacity>
            </View>
            {/* <SourcePicker visible={modalVisible} setModalVisible={setModalVisible} filter={filter} setFilter={setFilterFunc} /> */}
        </ScrollView>
    )
}

export default Main