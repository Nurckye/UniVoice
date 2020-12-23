import React from 'react';
import {Image, StyleSheet, TouchableOpacity, ViewStyle} from "react-native";
import {ORANGE} from "../styles/Colors";


const styles = StyleSheet.create({
    button: {
        backgroundColor: ORANGE,
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
        borderRadius: 30
    },
});

interface Props {
    onPress: () => void;
    style?: ViewStyle;
}

function RoundButton(props: Props) {
    return (
        <TouchableOpacity style={[styles.button, props.style]} onPress={props.onPress} activeOpacity={0.8}>
            <Image source={require("../assets/saveicon.png")} />
        </TouchableOpacity>
    );
}

export default RoundButton;
