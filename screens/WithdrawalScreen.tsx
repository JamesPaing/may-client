import React, { useState } from 'react';
import Wrapper from '../components/layouts/Wrapper';
import {
    Box,
    Button,
    FormControl,
    HStack,
    Icon,
    Image,
    Input,
    Pressable,
    Text,
    useToast,
} from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { mobileWallets } from '../utils/getMobileWallets';
import { generateRNFile } from './OrderScreen';
import { useAuth } from '../contexts/useAuth';
import ToastAlert from '../components/layouts/ToastAlert';
import { useMutation } from '@apollo/client';
import { CREATE_DEPOSIT } from '../@apollo/queries/deposit-query';
import { CREATE_WITHDRAWAL } from '../@apollo/queries/withdrawal-query';

const WithdrawalScreen = (props) => {
    const {
        authData: { user },
    } = useAuth();
    const toast = useToast();
    const [amount, setAmount] = useState(0);
    const [userName, setUserName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [activeWallet, setActiveWallet] = useState(mobileWallets[0].name);
    const [createWithdrawal] = useMutation(CREATE_WITHDRAWAL);

    // handlers
    const onWalletItemPickHandler = (wallet: any) => {
        setActiveWallet(wallet.name);
    };

    const onSubmitHandler = async () => {
        if (!user || amount <= 0) {
            toast.show({
                title: 'Success!',
                description: 'Successfully submitted the order',
                placement: 'bottom',
                render: () => (
                    <ToastAlert
                        status="warning"
                        title="Incompleted information, please try again."
                    />
                ),
            });

            return;
        }

        const withdrawal = {
            user: user._id,
            amount,
            bankAccount: `${activeWallet},${userName},${accountNumber}`,
        };

        const { data, errors } = await createWithdrawal({
            variables: {
                withdrawal,
            },
        });

        if (data?.createWithdrawal._id) {
            toast.show({
                title: 'Success!',
                description: 'Successfully submitted the order',
                placement: 'bottom',
                render: () => (
                    <ToastAlert
                        status="success"
                        title="Your withdrawal is successfully submitted."
                    />
                ),
            });

            // reset the states
            setAmount(0);
            setUserName('');
            setAccountNumber('');
            setActiveWallet(mobileWallets[0].name);

            // props.navigation.navigate('OrderHistoryScreen');
        }
    };

    return (
        <Wrapper>
            {/* User Form */}
            <FormControl
                mt={'1'}
                justifyContent={'center'}
                alignItems="center"
                mb="5"
            >
                <Text w="full" mt={'4'} fontSize={'md'} fontWeight={'bold'}>
                    Withdrawal Amount
                </Text>
                <Input
                    style={{
                        backgroundColor: 'white',
                    }}
                    autoCapitalize={'none'}
                    value={`${amount}`}
                    type="text"
                    placeholder={'Amount'}
                    mb={'5'}
                    mt={'4'}
                    size={'md'}
                    onChangeText={(val) => {
                        setAmount(Number(val.replace(/[^0-9]/g, '')));
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
                                as={<MaterialIcons name="money" />}
                            />
                        </HStack>
                    }
                />
                <Text w="full" fontSize={'md'} fontWeight={'bold'}>
                    Your Account Information
                </Text>
                <HStack w={'full'} alignItems={'center'} mt={'4'}>
                    {mobileWallets.map((wallet, i) => (
                        <Pressable
                            onPress={() => onWalletItemPickHandler(wallet)}
                            key={`${wallet.name}-${i}`}
                        >
                            <Image
                                source={{
                                    uri: wallet.uri,
                                }}
                                alt={wallet.name}
                                size="xl"
                                width={'12'}
                                height={'12'}
                                roundedTop={'sm'}
                                mr={'4'}
                                borderWidth={
                                    activeWallet === wallet.name ? '3' : '0'
                                }
                                borderColor={'blue.300'}
                            />
                        </Pressable>
                    ))}
                </HStack>
                <Input
                    style={{
                        backgroundColor: 'white',
                    }}
                    // autoCapitalize={'words'}
                    value={`${userName}`}
                    type="text"
                    placeholder={'Account Name'}
                    mb={'5'}
                    mt={'4'}
                    size={'md'}
                    onChangeText={(val) => {
                        setUserName(val);
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
                    autoCapitalize={'none'}
                    value={`${accountNumber}`}
                    type="text"
                    placeholder={'Bank Account / Phone Number'}
                    mb={'5'}
                    size={'md'}
                    onChangeText={(val) => {
                        setAccountNumber(val);
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
                <Button
                    background={'blue.600'}
                    w="100%"
                    mt={'4'}
                    onPress={onSubmitHandler}
                >
                    <Text py={1} color="white">
                        Submit
                    </Text>
                </Button>
                <Button
                    background={'gray.500'}
                    w="100%"
                    mt={'4'}
                    onPress={() => {
                        props.navigation.navigate('WithdrawalHistoryScreen');
                    }}
                >
                    <Text py={1} color="white">
                        View History
                    </Text>
                </Button>
                <Button
                    background={'gray.300'}
                    w="100%"
                    mt={'4'}
                    onPress={() => {
                        props.navigation.goBack();
                    }}
                >
                    <Text py={1} color="black">
                        Go Back
                    </Text>
                </Button>
            </FormControl>
        </Wrapper>
    );
};

export default WithdrawalScreen;
