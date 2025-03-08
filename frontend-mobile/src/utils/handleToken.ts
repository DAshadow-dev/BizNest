import * as SecureStore from 'expo-secure-store';

const storeToken = async (token : string) => {
    await SecureStore.setItemAsync('user_token',token);
}

const getToken = async () =>{
    const token = await SecureStore.getItemAsync('user_token');
    return token;
}

const removeToken = async () =>{
    await SecureStore.deleteItemAsync('user_token');
}

export { storeToken, getToken, removeToken };