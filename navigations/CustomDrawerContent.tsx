import { Box, Divider, HStack, Text } from 'native-base';
import React from 'react';
import {
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList,
} from '@react-navigation/drawer';
import { useAuth } from '../contexts/useAuth';

const CustomDrawerContent = (props) => {
    const { signOut, authData } = useAuth();

    const { user } = authData;

    const { state, ...rest } = props;
    const newState = { ...state };

    newState.routes = newState.routes.filter(
        (item) => item.name !== 'UserProfile'
    );

    return (
        <DrawerContentScrollView {...props}>
            <HStack
                justifyContent={'center'}
                alignItems={'center'}
                bg={'white'}
                // shadow={'1'}
                // rounded={'xl'}
                h={'40'}
                position={'relative'}
                m={'3'}
            >
                {/* <Box
                    position={'absolute'}
                    w={'10'}
                    h={'10'}
                    bg={'may-secondary'}
                    bottom={'0'}
                    right={'0'}
                    roundedTopLeft={'xl'}
                    roundedBottomRight={'xl'}
                ></Box>
                <Box
                    position={'absolute'}
                    w={'10'}
                    h={'10'}
                    bg={'may-primary'}
                    top={'0'}
                    left={'0'}
                    roundedBottomRight={'xl'}
                    roundedTopLeft={'xl'}
                ></Box> */}
                <Box py={'4'} mr={'2'}>
                    <Box
                        justifyContent={'center'}
                        alignItems={'center'}
                        w={'20'}
                        h={'20'}
                        rounded={'full'}
                        borderWidth={'1'}
                        borderColor={'gray.300'}
                    >
                        <Text
                            fontSize={'5xl'}
                            textTransform={'uppercase'}
                            color="may-black"
                        >
                            {user.name.substring(0, 1)}
                        </Text>
                    </Box>
                </Box>
                <Box ml={'2'}>
                    <Text
                        fontWeight={'bold'}
                        textTransform={'capitalize'}
                        fontSize={'xl'}
                    >
                        {user.name}
                    </Text>
                    <Text mt={'1'}>{user.email}</Text>
                    <Text mt={'1'}>{user.contact}</Text>
                </Box>
            </HStack>
            <Divider variant={''} mb={'4'} bg="gray.100" />
            <DrawerItemList state={newState} {...rest} />
            <DrawerItem label="Logout" onPress={() => signOut()} />
        </DrawerContentScrollView>
    );
};

export default CustomDrawerContent;
