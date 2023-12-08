import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
import OrderDetailScreen from '../screens/OrderDetailScreen';

const Stack = createNativeStackNavigator();

export function OrderHistoryStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="OrderHistoryScreen"
                component={OrderHistoryScreen}
            />
            <Stack.Screen
                name="OrderDetailScreen"
                component={OrderDetailScreen}
            />
        </Stack.Navigator>
    );
}
