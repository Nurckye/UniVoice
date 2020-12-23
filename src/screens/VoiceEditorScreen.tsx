import React, {useEffect, useRef, useState} from 'react';
import {TextInput, StyleSheet, View, Animated, Platform} from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import {DEVICE_HEIGHT, DEVICE_WIDTH, LATERAL_PADDING, STATUSBAR_HEIGHT} from '../styles/Constants';
import EditTextSheet from '../components/EditTextSheet';
import Separator from '../components/Separator';
import Title from '../components/Title';
import VoicePlayer from "../components/VoicePlayer";
import SecondaryButton from "../components/SecondaryButton";
import {Keyboard} from 'react-native'
import useKeyboard from '@rnhooks/keyboard';
import RoundButton from "../components/RoundButton";
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';
import {SCREENS} from "../../App";
import {AsyncStorage} from 'react-native';

const styles = StyleSheet.create({
    saveButton: {},
    body: {
        padding: LATERAL_PADDING,
    },
    sheet: {
        width: DEVICE_WIDTH,
        position: 'absolute',
        bottom: 0,
    },
    separator: {
        marginBottom: 24,
    },
    textInput: {
        textAlignVertical: 'top',
        flex: 1,
        paddingTop: 0,
        paddingBottom: 0,
    },
    secondaryButton: {
        marginBottom: 18,
        width: 80
    },
    playerHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    roundButton: {
        position: 'absolute',
        right: 24
    }
});

const EXPANDED_HEIGHT = DEVICE_HEIGHT - STATUSBAR_HEIGHT - (Platform.OS == 'ios' ? StaticSafeAreaInsets.safeAreaInsetsBottom : 0) - StaticSafeAreaInsets.safeAreaInsetsTop - 10;
const COLLAPSED_HEIGHT = DEVICE_HEIGHT - STATUSBAR_HEIGHT - (Platform.OS == 'ios' ? StaticSafeAreaInsets.safeAreaInsetsBottom : 0) - StaticSafeAreaInsets.safeAreaInsetsTop - 350;
const HIDE_ROUND_BUTTON = -150;
const EXPAND_DURATION = 400;
const COLLAPSE_BUTTON_DURATION = 300;

function VoiceEditorScreen({navigation, route}: any) {
    const entry = route?.params?.entry ?? null;
    // alert(StaticSafeAreaInsets.safeAreaInsetsBottom);
    const [text, setText] = useState('');
    const [title, setTitle] = useState( '');
    const [expanded, setExpanded] = useState(false);

    const expandAnim = useRef(new Animated.Value(COLLAPSED_HEIGHT)).current;
    const showRoundButtonAnim = useRef(new Animated.Value(HIDE_ROUND_BUTTON)).current;
    const [keyboardHeight, setKeyboardHeight] = useState(HIDE_ROUND_BUTTON);
    const [showRoundButton, setShowRoundButton] = useState(false);

    useEffect(() => {
        if (entry != null) {
            setText(entry.text);
            setTitle(entry.title);
        }
    }, [entry?.time])

    const saveEntry = async () => {
        try {
            const when = entry?.time ?? Date.now();
            await AsyncStorage.setItem(
                `${when}`,
                JSON.stringify({
                    title: title !== '' ? title : (entry?.title ?? ''),
                    text: text
                })
            );
            setText('');
            setTitle('');
            navigation.navigate(SCREENS.VoicesListScreen);
        } catch (error) {
            console.log("Error", error);
        }
    }

    const [visible, dismiss] = useKeyboard({
        useWillShow: true,
        useWillHide: true,
    });

    useEffect(() => {
        if (showRoundButton) {
            Animated.timing(showRoundButtonAnim, {
                useNativeDriver: false,
                toValue: keyboardHeight,
                duration: EXPAND_DURATION
            }).start();
        } else {
            Animated.timing(showRoundButtonAnim, {
                useNativeDriver: false,
                toValue: HIDE_ROUND_BUTTON,
                duration: COLLAPSE_BUTTON_DURATION
            }).start();
        }
    }, [keyboardHeight, showRoundButton]);

    useEffect(() => {
        if (visible) {
            console.log("SHOWN");
        }
    }, [visible]);

    useEffect(() => {
        const listenerShow = Keyboard.addListener('keyboardWillShow', (e) => {
            setKeyboardHeight(e.endCoordinates.height - StaticSafeAreaInsets.safeAreaInsetsBottom + 20)
        });

        const listenerHide = Keyboard.addListener('keyboardWillHide', (e) => {
            setKeyboardHeight(HIDE_ROUND_BUTTON);
        });

        return () => {
            listenerHide.remove();
            listenerShow.remove();
        }
    })

    return (
        <React.Fragment>
            <View style={styles.body}>
                <Title
                    title={title}
                    editable={true}
                    onChange={setTitle}
                    placeholder={entry?.title ?? 'Title #001'}
                />
                <Separator style={styles.separator}/>
                <View style={styles.playerHeaderContainer}>
                    <View style={styles.secondaryButton}>
                        <SecondaryButton
                            title={"See all"}
                            onPress={() => {
                                navigation.navigate(SCREENS.VoicesListScreen);
                            }}
                        />
                    </View>
                </View>
                <VoicePlayer text={text}/>
            </View>
            <Animated.View
                style={{
                    ...styles.sheet,
                    ...{
                        height: expandAnim
                    }
                }}>
                <EditTextSheet
                    style={{flex: 1}}
                    onRightPress={() => {
                        if (expanded) {
                            Keyboard.dismiss()
                            setShowRoundButton(false);
                            Animated.timing(expandAnim, {
                                useNativeDriver: false,
                                toValue: COLLAPSED_HEIGHT,
                                duration: EXPAND_DURATION
                            }).start();
                        } else {
                            setShowRoundButton(true);
                            Animated.timing(expandAnim, {
                                useNativeDriver: false,
                                toValue: EXPANDED_HEIGHT,
                                duration: EXPAND_DURATION
                            }).start();
                        }
                        setExpanded(!expanded);
                    }}
                >
                    <TextInput
                        onFocus={() => {
                            if (!expanded) {
                                setShowRoundButton(true);
                                Animated.timing(expandAnim, {
                                    useNativeDriver: false,
                                    toValue: EXPANDED_HEIGHT,
                                    duration: EXPAND_DURATION
                                }).start();
                            }
                            setExpanded(true);
                        }}
                        multiline={true}
                        style={styles.textInput}
                        onChangeText={setText}
                        value={text}
                        placeholder="Type here to translate!"
                    />
                    {
                        !visible && <PrimaryButton
                            style={styles.saveButton}
                            onPress={() => {
                                saveEntry();
                            }}
                            title={'Save voice'}
                        />
                    }
                    <Animated.View
                        style={{
                            ...styles.roundButton,
                            ...{bottom: showRoundButtonAnim}
                        }}
                    >
                        <RoundButton onPress={() => {
                            saveEntry();
                        }}/>
                    </Animated.View>
                </EditTextSheet>
            </Animated.View>
        </React.Fragment>
    );
}

export default VoiceEditorScreen;
