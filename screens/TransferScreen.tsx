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
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { mobileWallets } from '../utils/getMobileWallets';
import { generateRNFile } from './OrderScreen';
import { useAuth } from '../contexts/useAuth';
import ToastAlert from '../components/layouts/ToastAlert';
import { useMutation } from '@apollo/client';
import { CREATE_DEPOSIT } from '../@apollo/queries/deposit-query';
import { CREATE_WITHDRAWAL } from '../@apollo/queries/withdrawal-query';
import { CREATE_TRANSFER } from '../@apollo/queries/transfer-query';

const TransferScreen = (props) => {
    const {
        authData: { user },
    } = useAuth();
    const toast = useToast();
    const [amount, setAmount] = useState(0);
    const [receiverEmailOrPhone, setReceiverEmailOrPhone] = useState('');
    const [createTransfer] = useMutation(CREATE_TRANSFER);

    // handlers
    const onSubmitHandler = async () => {
        if (!receiverEmailOrPhone || amount <= 0) {
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

        const transfer = {
            transferrer: user._id,
            amount,
            receiver: receiverEmailOrPhone,
        };

        console.log(transfer);

        const { data, errors } = await createTransfer({
            variables: {
                transfer,
            },
        });

        if (data?.createTransfer._id) {
            toast.show({
                title: 'Success!',
                description: 'Successfully submitted the order',
                placement: 'bottom',
                render: () => (
                    <ToastAlert
                        status="success"
                        title="Successfully transferred."
                    />
                ),
            });

            // reset the states
            setAmount(0);
            setReceiverEmailOrPhone('');

            // props.navigation.navigate('OrderHistoryScreen');
        }
    };

    if (
        receiverEmailOrPhone === user.email ||
        receiverEmailOrPhone === user.contact
    ) {
        setReceiverEmailOrPhone('');

        toast.show({
            title: 'Warning!',
            description: 'Successfully submitted the order',
            placement: 'bottom',
            render: () => (
                <ToastAlert
                    status="warning"
                    title="You can't transfer to your own account, please use another email or phone number."
                />
            ),
        });
    }

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
                    Transfer Amount
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
                    Receiver Email/Phone
                </Text>
                <Input
                    style={{
                        backgroundColor: 'white',
                    }}
                    autoCapitalize={'none'}
                    value={`${receiverEmailOrPhone}`}
                    type="text"
                    placeholder={'Amount'}
                    mb={'5'}
                    mt={'4'}
                    size={'md'}
                    onChangeText={(val) => {
                        setReceiverEmailOrPhone(val);
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
                        props.navigation.navigate('TransferHistoryScreen');
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

export default TransferScreen;
