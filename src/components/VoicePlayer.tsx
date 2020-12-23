import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View, Text} from "react-native";
import PlayButton from "./PlayButton";
import Slider from "@react-native-community/slider";
import Tts from 'react-native-tts';
import {LIGHT_BLUE, LIGHT_ORANGE, ORANGE, WHITE} from "../styles/Colors";
import {LATERAL_PADDING} from "../styles/Constants";
import {museo} from "../styles/Fonts";
import {readDuration, secondsToDuration} from "../utils/functions";

const styles = StyleSheet.create({
    container : {
        backgroundColor: LIGHT_BLUE,
        padding: LATERAL_PADDING,
        borderRadius: 16,
    },
    top: {
        flexDirection: 'row',
    },
    playButtonSingle: {
        alignItems: 'center',
        flex: 1
    },
    numbersContainer: {
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    number: {
        color: WHITE,
        fontFamily: museo
    },
    title: {
        color: WHITE,
        fontFamily: museo,
        fontSize: 24,
        marginBottom: 6
    },
    date: {
        color: LIGHT_ORANGE,
        fontFamily: museo,
        fontSize: 16
    }

})

interface Props {
    text: string;
    hasDetails?: boolean;
    title?: string;
    subtitle?: string;
}

function VoicePlayer(props: Props) {
    const [playing, setPlaying] = useState(false);
    const playingRef = useRef(false);
    const [secondsIn, setSecondsIn] = useState(0);
    const secondsRef = useRef(0);

    useEffect(() => {
        Tts.addEventListener('tts-finish', (event: any) => {
            setPlaying(false);
            playingRef.current = false;
            setSecondsIn(0);
            secondsRef.current = 0;
        });
    }, [])

    useEffect(() => {
        Tts.stop();
        setPlaying(false);
        playingRef.current = false;
        setSecondsIn(0);
        secondsRef.current = 0;
    }, [props.text]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (playingRef.current) {
                console.log("RUNNING");
                secondsRef.current = secondsRef.current + 1;
                setSecondsIn(secondsRef.current);
            }}, 1000);

        return () => {
            clearInterval(interval);
        }
    }, [])

    return <View style={styles.container}>
        <View style={styles.top}>
            <View style={styles.playButtonSingle}>
                <PlayButton
                    playing={playing}
                    onPress={() => {
                        playing ? Tts.stop() : Tts.speak(props.text);
                        setPlaying(!playing);
                        playingRef.current = !playing;
                    }}
                />
            </View>
            {
                props.hasDetails && (
                    <View style={{flex: 1}}>
                        <Text style={styles.title}>{props.title}</Text>
                        <Text style={styles.date}>{props.subtitle}</Text>
                    </View>
                )
            }

        </View>
        <View style={styles.numbersContainer}>
            <Text style={styles.number}>{secondsToDuration(secondsIn)}</Text>
            <Text style={styles.number}>{secondsToDuration(readDuration(props.text))}</Text>
        </View>
        <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={readDuration(props.text)}
            step={0.1}
            minimumTrackTintColor={ORANGE}
            value={secondsIn}
            maximumTrackTintColor={LIGHT_ORANGE}
            onSlidingStart={() => {
                setPlaying(false);
                playingRef.current = false;
                Tts.stop();
            }}
            onSlidingComplete={(value) => {
                setSecondsIn(value);
            }}
        />
    </View>
}

export default VoicePlayer;
