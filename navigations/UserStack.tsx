import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ItemScreen, { screenOptions } from '../screens/ItemScreen';
import CartScreen from '../screens/CartScreen';
import OrderScreen from '../screens/OrderScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
import CategoryScreen from '../screens/CategoryScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import DepositScreen from '../screens/DepositScreen';
import DepositHistoryScreen from '../screens/DepositHistoryScreen';
import WithdrawalScreen from '../screens/WithdrawalScreen';
import WithdrawalHistoryScreen from '../screens/WithdrawalHistoryScreen';
import TransferScreen from '../screens/TransferScreen';
import TransferHistoryScreen from '../screens/TransferHistoryScreen';

const Stack = createNativeStackNavigator();

export function UserStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="UserProfileScreen"
                component={UserProfileScreen}
            />
            <Stack.Screen name="DepositScreen" component={DepositScreen} />
            <Stack.Screen
                name="DepositHistoryScreen"
                component={DepositHistoryScreen}
            />
            <Stack.Screen
                name="WithdrawalScreen"
                component={WithdrawalScreen}
            />
            <Stack.Screen
                name="WithdrawalHistoryScreen"
                component={WithdrawalHistoryScreen}
            />
            <Stack.Screen name="TransferScreen" component={TransferScreen} />
            <Stack.Screen
                name="TransferHistoryScreen"
                component={TransferHistoryScreen}
            />
        </Stack.Navigator>
    );
}
