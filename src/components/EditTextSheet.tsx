import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import {GRAY, WHITE} from '../styles/Colors';
import {LATERAL_PADDING} from '../styles/Constants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: WHITE,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    padding: LATERAL_PADDING,
    paddingTop: LATERAL_PADDING + 20,
  },
  sheetButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: GRAY,
    position: "absolute",
    backgroundColor: WHITE,
    top: -16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  rightButton: {
    right: 24,
  },
  leftButton: {
    left: 24,
  },
  image: {
    padding: 10,
    height: 10,
  }
});

interface Props {
  style?: ViewStyle;
  children?: React.ReactNode;
  onRightPress: () => void;
}

function EditTextSheet(props: Props) {
  return <View style={[styles.container, props.style]}>
    <React.Fragment>
      {props.children}
      <TouchableOpacity activeOpacity={0.7} style={[styles.sheetButton, styles.rightButton]} onPress={props.onRightPress}>
        <Image source={require('../assets/expand.png')} style={styles.image} />
      </TouchableOpacity>
    </React.Fragment>
  </View>;
}

export default EditTextSheet;
