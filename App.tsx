import 'react-native-gesture-handler';
import React, { useEffect, useCallback } from 'react';
import { Box, Text } from 'native-base';
import { NativeBaseProvider, extendTheme } from 'native-base';
import { ApolloProvider } from '@apollo/client';
import client from './@apollo/client';
import { Provider } from 'react-redux';
import { store } from './@redux/store';
import * as SplashScreen from 'expo-splash-screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AuthProvider } from './contexts/authContext';
import { Router } from './Router';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { MenuProvider } from 'react-native-popup-menu';
// SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const theme = extendTheme({
    colors: {
        'may-primary': '#DA291C',
        'may-secondary': '#FFC72C',
        'may-black': '#27251F',
    },
});

export default function App() {
    let [fontsLoaded, fontError] = useFonts({
        Inter_900Black,
    });

    useEffect(() => {
        const bootstrapAsync = async () => {
            // const a = await getAuth();
            // if (a) {
            //     await setAuth(a);
            // }
        };
        bootstrapAsync();
    }, []);

    if (!fontsLoaded && !fontError) {
        return null;
    }

    return (
        <Provider store={store}>
            <ApolloProvider client={client}>
                <NativeBaseProvider theme={theme}>
                    <AuthProvider>
                        <MenuProvider>
                            <Router />
                        </MenuProvider>
                    </AuthProvider>
                </NativeBaseProvider>
            </ApolloProvider>
        </Provider>
    );
}
