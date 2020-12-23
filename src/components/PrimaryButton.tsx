import React from 'react';
import {Text, TouchableOpacity, StyleSheet, ViewStyle} from 'react-native';
import {ORANGE, WHITE} from '../styles/Colors';
import {museo} from "../styles/Fonts";

const styles = StyleSheet.create({
  button: {
    backgroundColor: ORANGE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    height: 48,
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

function PrimaryButton(props: Props) {
  return (
    <TouchableOpacity style={[styles.button, props.style]} onPress={props.onPress} activeOpacity={0.8}>
      <Text style={styles.title}>{props.title}</Text>
    </TouchableOpacity>
  );
}

export default PrimaryButton;
