import React from 'react';
import { View, Text, Button } from 'react-native';
import * as Routes from '@utils/Routes';
import { useNavigationRoot } from '@components/navigate/RootNavigation';

const HomeScreen = () => {
    const navigation = useNavigationRoot();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
      <Button title="Go to Details" onPress={() => navigation.navigate(Routes.DetailsScreen, {message: 'hello'})} />
    </View>
  );
}
export default HomeScreen;
