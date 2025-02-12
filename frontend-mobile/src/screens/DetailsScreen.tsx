import { useNavigationRoot } from '@components/navigate/RootNavigation';
import React from 'react';
import { View, Text, Button } from 'react-native';

const DetailsScreen= (
    props :{ route: {params: {message: string}};}
) => {
    const {message}= props.route.params
    const navigation = useNavigationRoot();
    
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Details Screen</Text>
        <Text>{message}</Text>
        <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
    );
}

export default DetailsScreen;
