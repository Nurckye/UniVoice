import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {WHITE} from '../styles/Colors';

const styles = StyleSheet.create({
  button: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 18,
    height: 18,
  }
});

interface Props {
  onPress: () => void;
  playing: boolean;
}

function PlayButton(props: Props) {
  return (
    <TouchableOpacity
      onPress={() => {
        props.onPress();
      }}
      style={styles.button}
      activeOpacity={0.7}
    >
      {
        props.playing
            ? <Image source={require('../assets/pause-state.png')} />
            : <Image source={require('../assets/play-state.png')} />
      }

    </TouchableOpacity>
  );
}

export default PlayButton;
