import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {GRAY} from '../styles/Colors';

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: GRAY,
  },
});

interface Props {
    style?: ViewStyle
}

function Separator({style}: Props) {
  return <View style={[styles.separator, style]}/>;
}

export default Separator;
