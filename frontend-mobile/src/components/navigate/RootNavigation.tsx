import {
  NavigationContainerRef,
  NavigationProp,
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import {RootParamList} from '@utils/RootParamList';
import * as React from 'react';

export const navigationRef = React.createRef<NavigationContainerRef<any>>();

export function navigate(name: string, params?: object) {
  navigationRef.current?.navigate(name as string, params as object);
}

export function push(name: string, params?: object) {
  const pushAction = StackActions.push(name, params);
  navigationRef.current?.dispatch(pushAction);
}

export function goBack() {
  navigationRef.current?.goBack();
}

export function pop(number: number) {
  navigationRef.current?.dispatch(StackActions.pop(number));
}

export function resetStack(name: string, params?: object) {
  navigationRef.current?.reset({
    index: 1,
    routes: [{name, params}],
  });
}

export function replace(name: string, params?: object) {
  const replaceAction = StackActions.replace(name, params);
  navigationRef.current?.dispatch(replaceAction);
}


export const useNavigationRoot = () => {
  return useNavigation<NavigationProp<RootParamList>>();
};

