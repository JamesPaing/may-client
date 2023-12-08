import * as React from 'react';
import { Text, View } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import { Entypo, Ionicons } from '@expo/vector-icons';
import ShopScreen from '../screens/ShopScreen';
import { HomeStack } from './HomeStack';
import MarketScreen from '../screens/MarketSceen';
import { ShopStack } from './ShopStack';

const Tab = createBottomTabNavigator();

export default function MyTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home';
                    } else if (route.name === 'ShopStack') {
                        iconName = focused ? 'shop' : 'shop';
                    } else if (route.name === 'Market') {
                        iconName = focused ? 'shopping-bag' : 'shopping-bag';
                    }

                    // You can return any component that you like here!
                    return <Entypo name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#DA291C',
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
                tabBarLabelStyle: {
                    padding: 3,
                    fontSize: 12,
                },

                tabBarStyle: {
                    padding: 4,
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen
                options={{
                    title: 'Shop',
                }}
                name="ShopStack"
                component={ShopStack}
            />
            <Tab.Screen name="Market" component={MarketScreen} />
        </Tab.Navigator>
    );
}
