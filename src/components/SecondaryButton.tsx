import React from 'react';
import {StyleSheet, Text, TouchableOpacity, ViewStyle} from "react-native";
import {WHITE} from "../styles/Colors";
import {georgia, museo} from "../styles/Fonts";


const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: WHITE,
        height: 36,
    },
    title: {
        color: WHITE,
        fontFamily: museo
    },
});

interface Props {
    title: string;
    onPress: () => void;
    style?: ViewStyle;
}

function SecondaryButton(props: Props) {
    return (
        <TouchableOpacity style={[styles.button, props.style]} onPress={props.onPress} activeOpacity={0.8}>
            <Text style={styles.title}>{props.title}</Text>
        </TouchableOpacity>
    );
}

export default SecondaryButton;
