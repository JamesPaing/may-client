import { createDrawerNavigator } from '@react-navigation/drawer';
import { Box, Button, Flex, HStack, Modal, Text, useToast } from 'native-base';
import HomeScreen from '../screens/HomeScreen';
import { Entypo } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '../@redux/hooks';
import React, { useState } from 'react';
import {
    ScrollView,
    TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native';
import { clear } from '../@redux/cartSlice';
import ToastAlert from '../components/layouts/ToastAlert';
import { useAuth } from '../contexts/useAuth';
import { useMutation, useSubscription } from '@apollo/client';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import CustomDrawerContent from './CustomDrawerContent';
import {
    HeaderButtons,
    HeaderButton,
    Item,
    HiddenItem,
    OverflowMenu,
    HeaderButtonProps,
} from 'react-navigation-header-buttons';
import { MaterialHeaderButtons } from './MyHeaderButtons';
import MyTabs from './MyTabs';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import FavouriteScreen from '../screens/FavouriteScreen';
import { UserStack } from './UserStack';
import { DEPOSIT_APPROVED } from '../@apollo/queries/deposit-query';
import { useFocusEffect } from '@react-navigation/native';
import { WITHDRAWAL_APPROVED } from '../@apollo/queries/withdrawal-query';
import { TRANSACTION_COMPLETED } from '../@apollo/queries/transfer-query';
import AddressScreen from '../screens/AddressScreen';
import { OrderHistoryStack } from './OrderHistoryStack';

const Drawer = createDrawerNavigator();

const AppDrawer = () => {
    const dispatch = useAppDispatch();
    const toast = useToast();
    const {
        authData: { user },
    } = useAuth();
    const { items } = useAppSelector((state) => state.cart);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { data: depositApprovedData } = useSubscription(DEPOSIT_APPROVED);
    const { data: withdrawalApprovedData, error } =
        useSubscription(WITHDRAWAL_APPROVED);
    const { data: transactionCompletedData } = useSubscription(
        TRANSACTION_COMPLETED
    );

    useFocusEffect(
        React.useCallback(() => {
            if (
                depositApprovedData?.depositApproved?.user &&
                depositApprovedData.depositApproved.user == user._id
            ) {
                toast.show({
                    title: 'Success!',
                    description: 'Your deposit has been approved.',
                    placement: 'bottom',
                    render: () => (
                        <ToastAlert
                            status="success"
                            title="Your deposit has been approved."
                        />
                    ),
                });

                return;
            } else if (
                withdrawalApprovedData?.withdrawalApproved?.user &&
                withdrawalApprovedData.withdrawalApproved.user == user._id
            ) {
                toast.show({
                    title: 'Success!',
                    description: 'Your deposit has been approved.',
                    placement: 'bottom',
                    render: () => (
                        <ToastAlert
                            status="success"
                            title="Your Withdrawal has been approved."
                        />
                    ),
                });

                return;
            }
        }, [depositApprovedData, withdrawalApprovedData])
    );

    useFocusEffect(
        React.useCallback(() => {
            if (
                transactionCompletedData?.transactionCompleted?.transferrer &&
                transactionCompletedData.transactionCompleted.transferrer ==
                    user._id
            ) {
                toast.show({
                    title: 'Success!',
                    description: 'Your deposit has been approved.',
                    placement: 'bottom',
                    render: () => (
                        <ToastAlert
                            status="success"
                            title="Transaction successfully transferred."
                        />
                    ),
                });

                return;
            } else if (
                transactionCompletedData?.transactionCompleted?.receiver &&
                transactionCompletedData.transactionCompleted.receiver ==
                    user._id
            ) {
                toast.show({
                    title: 'Success!',
                    description: 'Your deposit has been approved.',
                    placement: 'bottom',
                    render: () => (
                        <ToastAlert
                            status="success"
                            title="Transaction successfully received."
                        />
                    ),
                });

                return;
            }
        }, [transactionCompletedData])
    );

    return (
        <Drawer.Navigator
            screenOptions={{
                unmountOnBlur: true,
                headerTitle: '',
                headerRight: () => (
                    <MaterialHeaderButtons>
                        <Item
                            title="add"
                            iconName="shoppingcart"
                            onPress={() => console.warn('add')}
                        />
                        <Item
                            title="edit"
                            iconName="user"
                            onPress={() => console.warn('edit')}
                        />
                    </MaterialHeaderButtons>
                ),
            }}
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen
                name="MAY"
                component={MyTabs}
                options={{
                    title: 'Home',
                }}
            />
            <Drawer.Screen
                name="OrderHistoryStack"
                component={OrderHistoryStack}
                options={{
                    title: 'Order History',
                }}
            />
            <Drawer.Screen
                name="User"
                component={UserStack}
                options={{
                    title: 'User Profile',
                }}
            />
            <Drawer.Screen
                name="AddressScreen"
                component={AddressScreen}
                options={{
                    title: 'Address',
                }}
            />
            <Drawer.Screen
                name="FavouriteScreen"
                component={FavouriteScreen}
                options={{
                    title: 'Favourite',
                }}
            />
        </Drawer.Navigator>
    );
};

export default AppDrawer;
