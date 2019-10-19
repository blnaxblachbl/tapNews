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
import TrackPlayer from 'react-native-track-player'
import { getNews } from '../gqls/queries'
import { useQuery } from '@apollo/react-hooks'

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
        onCompleted: () => setPageReady(true),
        onError: () => setPageReady(true)
    })

    const [selectedIndex, setIndex] = useState(0)
    const [play, setPlay] = useState(false)
    const [pageReady, setPageReady] = useState(false)

    useEffect(() => {
        setAudio()
    }, [data])

    useEffect(() => {
        console.log(play)
        if (play) {
            TrackPlayer.play()
        } else {
            TrackPlayer.pause()
        }
    }, [play])

    useEffect(() => {
        if (data && data.news) {
            console.log("8==>", data.news[selectedIndex]._id)
            TrackPlayer.skip(data.news[selectedIndex]._id)
            // setPlay(true)
            // TrackPlayer.play()
        }
        console.log(selectedIndex)
    }, [selectedIndex])

    TrackPlayer.addEventListener('remote-jump-forward', () => {
        carousel.snapToNext(true)
        console.log('remote-jump-forward')
    })

    carousel = useRef(null)

    const setAudio = () => {
        if (data && data.news) {
            data.news.map((item, index) => {
                TrackPlayer.add({
                    id: item._id,
                    url: audioUrl + item.audio,
                    title: item.title,
                    artist: item.source
                });
            })

            console.log(selectedIndex)
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
                        setPlay(false)
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
                    onPress={() => { setPlay(true) }}
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

    if (!pageReady) {
        return (
            <View style={[styles.container, {justifyContent: 'center', alignItems: 'center' }]}>
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
            </View>
            <View style={{ paddingBottom: 20, paddingTop: 25, width }}>
                <Carousel
                    currentIndex={0}
                    currentScrollPosition={0}
                    loop={true}
                    ref={r => { carousel = r }}
                    layout={'stack'}
                    layoutCardOffset={9}
                    data={data && data.news ? data.news : []}
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
                        if (data.news.length > 0) {
                            carousel.snapToPrev(true)
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
                        if (data.news.length > 0) {
                            carousel.snapToNext(true)
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

        </ScrollView>
    )
}

export default Main