import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ItemScreen, { screenOptions } from '../screens/ItemScreen';
import CartScreen from '../screens/CartScreen';
import OrderScreen from '../screens/OrderScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
import CategoryScreen from '../screens/CategoryScreen';
import VendorDetailScreen from '../screens/VendorDetailScreen';
import ShopScreen from '../screens/ShopScreen';

const Stack = createNativeStackNavigator();

export function ShopStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="ShopScreen" component={ShopScreen} />
            <Stack.Screen
                options={screenOptions}
                name="ItemScreen"
                component={ItemScreen}
            />
            <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
            <Stack.Screen
                name="VendorDetailScreen"
                component={VendorDetailScreen}
            />
            <Stack.Screen name="CartScreen" component={CartScreen} />
            <Stack.Screen name="OrderScreen" component={OrderScreen} />
            <Stack.Screen
                name="OrderHistoryScreen"
                component={OrderHistoryScreen}
            />
        </Stack.Navigator>
    );
}
