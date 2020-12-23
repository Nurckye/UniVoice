import React, {useEffect, useState} from 'react';
import {AsyncStorage, FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Title from "../components/Title";
import VoicePlayer from "../components/VoicePlayer";
import {LATERAL_PADDING} from "../styles/Constants";
import Separator from "../components/Separator";
import {fetchAllItems} from "../utils/functions";
import moment from "moment";
import {ORANGE, RED, WHITE} from "../styles/Colors";
import {SCREENS} from "../../App";
import {museo} from "../styles/Fonts";

const styles = StyleSheet.create({
    separator: {
        marginBottom: 24,
    },
    deleteButton: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: RED,
        justifyContent: 'center',
        alignItems: 'center',
        position: "absolute",
        top: -10,
        right: 0
    },
    editButton: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: ORANGE,
        justifyContent: 'center',
        alignItems: 'center',
        position: "absolute",
        top: -10,
        right: 34
    },
    deleteSign: {
        color: WHITE,
        fontWeight: 'bold',
    },
    editSign: {
        color: WHITE,
        fontWeight: 'bold',
    },
    backButton: {
        marginBottom: 20,
        width: 20,
        height: 20
    }
});

function VoicesListScreen({navigation}: any) {
    const [courses, setCourses] = useState([]);

    const fetchCourses = async () => {
        const fetched = await fetchAllItems();
        console.log(fetched);
        const newCourses: any = fetched.map(item => {
            return {
                ...JSON.parse(item[1]),
                time: item[0]
            };
        })
        console.log(newCourses);
        setCourses(newCourses);
    };


    useEffect(() => {
        fetchCourses()
    }, [])

    return (
        <View>
            <FlatList
                style={{
                    padding: LATERAL_PADDING,
                    height: '100%'
                }}
                ListEmptyComponent={() => {
                    return (
                        <View style={{
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                color: WHITE,
                                fontFamily: museo,
                                fontSize: 20,
                                marginTop: 100
                            }}>
                                No lessons yet!
                            </Text>
                        </View>
                    );
                }}
                ListHeaderComponent={() => {
                    return (
                        <View>
                            <TouchableOpacity onPress={() => {
                                navigation.navigate(SCREENS.VoiceEditorScreen);
                            }}>
                              <Image style={styles.backButton} source={require('../assets/arrow-left.png')} />
                            </TouchableOpacity>
                            <Title
                                title={"All voices"}
                                onChange={() => {}}
                            />
                            <Separator style={styles.separator} />
                        </View>
                    );
                }}
                data={courses}
                showsVerticalScrollIndicator={false}
                renderItem={(item) => {
                    const entry = item.item as any;
                    return (
                        <View
                            key={item.index}
                            style={{
                                marginBottom: 20
                            }}
                        >
                            <VoicePlayer
                                text={entry?.text}
                                hasDetails={true}
                                title={entry?.title}
                                subtitle={moment.unix(parseInt(entry.time) / 1000).format("DD MMM YYYY")}
                            />

                            <TouchableOpacity
                                onPress={() => {
                                    AsyncStorage.removeItem(entry.time);
                                    fetchCourses();
                                }}
                                style={styles.deleteButton}
                            >
                                <Text style={styles.deleteSign}>
                                    X
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate(SCREENS.VoiceEditorScreen, {
                                        entry: entry
                                    });
                                }}
                                style={styles.editButton}
                            >
                                <Text style={styles.editSign}>
                                    ✎
                                </Text>
                            </TouchableOpacity>

                        </View>
                    );
                }} />
        </View>
    );
}

export default VoicesListScreen;
