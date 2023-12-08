import React, { useEffect, useState } from 'react';
import Wrapper from '../components/layouts/Wrapper';
import {
    Text,
    Box,
    Image,
    VStack,
    HStack,
    FormControl,
    Input,
    Button,
    Spinner,
    Icon,
    TextArea,
    useToast,
    Pressable,
} from 'native-base';
import { useAuth } from '../contexts/useAuth';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_USER, UPDATE_USER } from '../@apollo/queries/user-query';
import ToastAlert from '../components/layouts/ToastAlert';
import numberWithCommas from '../utils/thousandSeparater';
import { useFocusEffect } from '@react-navigation/native';

const UserProfileScreen = (props) => {
    const { authData, setAuthData } = useAuth();
    const { user } = authData;
    const toast = useToast();
    const [updatedUser, setUpdatedUser] = useState({
        name: user.name,
        email: user.email,
        contact: user.contact,
        address: user.address,
    });
    const [updateUser] = useMutation(UPDATE_USER);
    const [getUser] = useLazyQuery(GET_USER);
    const [point, setPoint] = useState(0);

    useFocusEffect(
        React.useCallback(() => {
            const getUserPoint = async () => {
                const { data } = await getUser({
                    variables: {
                        _id: user._id,
                    },
                    fetchPolicy: 'cache-and-network',
                });

                if (data) {
                    setPoint(data.getUser.wallet?.balance || 0);
                }
            };

            getUserPoint();
        }, [])
    );

    const onSaveHandler = async () => {
        const { data } = await updateUser({
            variables: {
                _id: user._id,
                user: updatedUser,
            },
        });

        if (data?.updateUser._id) {
            setAuthData((prev) => {
                return {
                    ...prev,
                    user: data.updateUser,
                };
            });

            toast.show({
                title: 'Success!',
                description: 'Successfully submitted the order',
                placement: 'bottom',
                render: () => (
                    <ToastAlert
                        status="success"
                        title="Sucessfully updated your information."
                    />
                ),
            });
        }
    };

    return (
        <Wrapper>
            {/* User card */}
            <HStack
                justifyContent={'center'}
                alignItems={'center'}
                bg={'white'}
                shadow={'1'}
                rounded={'xl'}
                h={'40'}
                position={'relative'}
            >
                <Box
                    position={'absolute'}
                    w={'10'}
                    h={'10'}
                    bg={'blue.100'}
                    bottom={'0'}
                    right={'0'}
                    roundedTopLeft={'full'}
                    roundedBottomRight={'xl'}
                ></Box>
                <Box
                    position={'absolute'}
                    w={'10'}
                    h={'10'}
                    bg={'blue.100'}
                    top={'0'}
                    left={'0'}
                    roundedBottomRight={'full'}
                    roundedTopLeft={'xl'}
                ></Box>
                <Box py={'4'} mr={'2'}>
                    <Box
                        justifyContent={'center'}
                        alignItems={'center'}
                        w={'24'}
                        h={'24'}
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
            {/* Deposit & Withdrawal */}
            <VStack mt={'5'}>
                <Box mb={'2'}>
                    <Text fontSize={'xs'}>Point</Text>
                    <Text fontSize={'lg'} fontWeight={'bold'}>
                        {numberWithCommas(point)}
                    </Text>
                </Box>
                <HStack alignItems={'center'}>
                    {/* Deposit */}
                    <Pressable
                        flexDir={'row'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        rounded={'sm'}
                        py={'2'}
                        px={'2'}
                        bg={'blue.600'}
                        mr={'2'}
                        onPress={() =>
                            props.navigation.navigate('DepositScreen')
                        }
                    >
                        <Icon
                            mr={'1'}
                            color={'white'}
                            as={<AntDesign name="plus" />}
                        />
                        <Text color={'white'}>Deposit</Text>
                    </Pressable>
                    {/* Withdrawal */}
                    <Pressable
                        flexDir={'row'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        rounded={'sm'}
                        py={'2'}
                        mr={'2'}
                        px={'2'}
                        bg={'blue.600'}
                        onPress={() =>
                            props.navigation.navigate('WithdrawalScreen')
                        }
                    >
                        <Icon
                            mr={'1'}
                            color={'white'}
                            as={<AntDesign name="arrowdown" />}
                        />
                        <Text color={'white'}>Withdrawal</Text>
                    </Pressable>
                    <Pressable
                        flexDir={'row'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        rounded={'sm'}
                        py={'2'}
                        px={'2'}
                        bg={'blue.600'}
                        onPress={() =>
                            props.navigation.navigate('TransferScreen')
                        }
                    >
                        <Icon
                            mr={'1'}
                            color={'white'}
                            as={<Ionicons name="arrow-redo" />}
                        />
                        <Text color={'white'}>Transfer</Text>
                    </Pressable>
                </HStack>
            </VStack>
            {/* User Form */}
            <FormControl
                mt={'1'}
                justifyContent={'center'}
                alignItems="center"
                mb="5"
            >
                <Input
                    style={{
                        backgroundColor: 'white',
                    }}
                    autoCapitalize={'none'}
                    value={updatedUser.name}
                    type="text"
                    placeholder={user.name}
                    mb={'5'}
                    mt={'4'}
                    size={'md'}
                    onChangeText={(val) => {
                        setUpdatedUser((prev) => ({ ...prev, name: val }));
                    }}
                    leftElement={
                        <HStack
                            px={'2'}
                            alignItems={'center'}
                            h="full"
                            bg={'white'}
                        >
                            <Icon
                                size={'5'}
                                as={<MaterialIcons name="person" />}
                            />
                        </HStack>
                    }
                />
                <Input
                    style={{
                        backgroundColor: 'white',
                    }}
                    type="text"
                    value={updatedUser.email}
                    placeholder={user.email}
                    size={'md'}
                    mb={'5'}
                    onChangeText={(val) => {
                        setUpdatedUser((prev) => ({ ...prev, email: val }));
                    }}
                    leftElement={
                        <HStack
                            px={'2'}
                            alignItems={'center'}
                            h="full"
                            bg={'white'}
                        >
                            <Icon
                                size={'5'}
                                as={<MaterialIcons name="email" />}
                            />
                        </HStack>
                    }
                />
                <Input
                    style={{
                        backgroundColor: 'white',
                    }}
                    type="text"
                    placeholder={user.contact}
                    value={updatedUser.contact}
                    size={'md'}
                    mb={'5'}
                    onChangeText={(val) => {
                        setUpdatedUser((prev) => ({ ...prev, contact: val }));
                    }}
                    leftElement={
                        <HStack
                            px={'2'}
                            alignItems={'center'}
                            h="full"
                            bg={'white'}
                        >
                            <Icon
                                size={'5'}
                                as={<MaterialIcons name="phone" />}
                            />
                        </HStack>
                    }
                />
                <TextArea
                    style={{
                        backgroundColor: 'white',
                    }}
                    pl="3"
                    mb={'1'}
                    h={'24'}
                    placeholder={user.address}
                    size={'md'}
                    value={updatedUser.address}
                    autoCompleteType={undefined}
                    onChangeText={(text) =>
                        setUpdatedUser((prev) => ({ ...prev, address: text }))
                    }
                />
                <Button
                    background={'blue.600'}
                    w="100%"
                    mt={'4'}
                    onPress={onSaveHandler}
                >
                    <Text py={1} color="white">
                        Save
                    </Text>
                </Button>
            </FormControl>
        </Wrapper>
    );
};

export default UserProfileScreen;
