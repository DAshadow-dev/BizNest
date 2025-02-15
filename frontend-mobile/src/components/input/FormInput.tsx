import Eye from '@assets/svg/IconEye';
import EyeSlash from '@assets/svg/IconEyeSlash';
import {moderateScale, scale, verticalScale} from '@libs/reactResizeMatter/scalingUtils';
import {CommonColors, Fonts} from '@utils/CommonStyles';
import {genValidate} from '@utils/Validator';
import {isEmpty} from 'lodash';
import React, {useEffect, useState} from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import {KeyboardTypeOptions, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';

const HEIGHT = verticalScale(38);

export default function FormInput(props: {
  require?: boolean;
  placeHolder?: string;
  fieldName: string;
  icon?: any;
  format?: string;
  secureTextEntry?: boolean;
  validate?: Array<any>;
  height?: number;
  positionError?: string;
  multiline?: boolean;
  edittable?: boolean;
  keyboardType?: KeyboardTypeOptions;
  onChangeText?: (str: any) => void;
  minHeight?: number;
  inputStyle?: any;
  wrapIconStyle?: any;
  wrapInputStyle?: any;
  max?: number;
  min?: number;
  defaultValue?: string | number;
}) {
  const {
    placeHolder,
    fieldName,
    icon,
    format = 'text',
    secureTextEntry,
    validate = [],
    positionError = 'left',
    multiline = false,
    edittable,
    keyboardType = 'default',
    onChangeText = () => {},
    minHeight = HEIGHT,
    inputStyle,
    wrapIconStyle,
    wrapInputStyle,
    defaultValue = '',
  } = props;
  const [secureText, setSecureText] = useState(true);

  const onShowSecure = () => {
    setSecureText(!secureText);
  };
  const {
    control,
    setValue,
    formState: {errors},
  } = useFormContext();
  useEffect(() => {
    if (!isEmpty(defaultValue)) {
      setValue(fieldName, defaultValue?.toString());
    }
  }, []);

  return (
    <Controller
      control={control}
      rules={{
        validate: genValidate(validate, fieldName),
      }}
      render={({field: {onChange, onBlur, value}}) => {
        return (
          <View>
            <View
              style={[
                styles.wrapInput,
                {
                  borderColor: errors?.[fieldName]
                    ? CommonColors.labelButtonCancelColor
                    : CommonColors.mainGray,
                  backgroundColor:
                    edittable === false ? CommonColors.backgroundGrayColor : CommonColors.white,
                  minHeight,
                },
                wrapInputStyle,
              ]}>
              {icon ? (
                <View style={[styles.wrapIcon, wrapIconStyle]}>
                  <View
                    style={{
                      width: scale(18),
                      justifyContent: 'center',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    {icon}
                  </View>
                </View>
              ) : (
                <View style={{paddingLeft: scale(10)}} />
              )}
              <TextInput
                autoCapitalize="none"
                style={[
                  styles.input,
                  {
                    paddingVertical: multiline ? verticalScale(8) : 0,
                    textAlign: format === 'number' ? 'right' : 'left',
                    height: multiline ? verticalScale(76) : 'auto',
                    textAlignVertical: multiline ? 'top' : 'center',
                  },
                  inputStyle,
                ]}
                editable={edittable}
                onBlur={onBlur}
                placeholder={placeHolder}
                placeholderTextColor="#ccc"
                onChangeText={text => {
                  if (format === 'number') {
                    const val = text.replace(/[^0-9,.-]/g, '');
                    const convertedVal = parseFloat(val.replace(/,/g, ''));
                    if (val === '') {
                      onChange('');
                      onChangeText && onChangeText('');
                      setValue(fieldName, '');
                    } else {
                      onChangeText && onChangeText(convertedVal);
                      onChange(convertedVal);
                      setValue(fieldName, convertedVal.toString());
                    }
                  } else {
                    onChange(text);
                    onChangeText(text);
                    setValue(fieldName, text);
                  }
                }}
                value={value}
                secureTextEntry={secureTextEntry && secureText}
                multiline={multiline}
                keyboardType={keyboardType}
              />

              <View>
                <View>
                  {secureTextEntry && (
                    <View
                      style={{
                        width: scale(30),
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginRight: scale(5),
                      }}>
                      {secureText ? (
                        <TouchableOpacity
                          hitSlop={{
                            top: 20,
                            left: 20,
                            right: 20,
                            bottom: 20,
                          }}
                          activeOpacity={1}
                          onPress={onShowSecure}>
                          <EyeSlash size={scale(14)} color={CommonColors.placeholderColor} />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          hitSlop={{
                            top: 20,
                            left: 20,
                            right: 20,
                            bottom: 20,
                          }}
                          activeOpacity={1}
                          onPress={onShowSecure}>
                          <Eye
                            width={scale(14)}
                            height={scale(10)}
                            color={CommonColors.placeholderColor}
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                  )}
                </View>
              </View>
            </View>
            {errors?.[fieldName] && (
              <Text
                style={[
                  styles.errors,
                  {
                    textAlign: positionError || 'right',
                  },
                ]}>
                {errors?.[fieldName]?.message || '* Không được để trống'}
              </Text>
            )}
          </View>
        );
      }}
      name={fieldName}
    />
  );
}

const styles = StyleSheet.create({
  wrapInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: scale(8),
    borderWidth: 1,
    backgroundColor: CommonColors.white,
    overflow: 'hidden',
  },
  input: {
    paddingRight: scale(12),
    flex: 1,
    color: '#424242',
    fontSize: moderateScale(14),
    padding: 0,
    margin: 0,
  },
  wrapIcon: {
    borderColor: CommonColors.separator,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: scale(48),
  },
  errors: {
    marginTop: verticalScale(5),
    color: CommonColors.redColor,
    ...Fonts.defaultLight,
    fontSize: moderateScale(12),
  },
});
