import React from 'react';
import {Platform, StyleSheet, TextInput, ViewStyle} from 'react-native';
import {GRAY, STRONG_GRAY, TRANSPARENT_GRAY, WHITE} from '../styles/Colors';
import {museo, TITLE_FONT_SIZE} from '../styles/Fonts';

interface Props {
  title: string;
  style?: ViewStyle;
  editable: boolean;
  placeholder?: string;
  onChange?: (arg: string) => void;
}

const styles = StyleSheet.create({
  textInput: {
    fontSize: TITLE_FONT_SIZE,
    lineHeight: 40,
    marginBottom: 12,
    fontFamily: museo,
    fontWeight: Platform.OS === 'ios' ? 'bold' : 'normal',
  },
});

Title.defaultProps = {
  editable: false,
};

function Title(props: Props) {
  return (
    <TextInput
      style={[props.style, styles.textInput, {color: props.title === "" ? STRONG_GRAY : WHITE,}]}
      value={props.title}
      editable={props.editable}
      placeholder={props.placeholder}
      placeholderTextColor={TRANSPARENT_GRAY}
      onChangeText={(value) => {
        props.onChange && props.onChange(value);
      }}
    />
  );
}

export default Title;
