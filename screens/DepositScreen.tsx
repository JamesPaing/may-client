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

const DepositScreen = (props) => {
    const {
        authData: { user },
    } = useAuth();
    const toast = useToast();
    const [amount, setAmount] = useState(0);
    const [image, setImage] = useState(null);
    const [screenShot, setScreenshot] = useState(null);
    const [activeWallet, setActiveWallet] = useState(mobileWallets[0].name);
    const [activePerson, setActivePerson] = useState(mobileWallets[0].person);
    const [activePhone, setActivePhone] = useState(mobileWallets[0].phone);
    const [createDeposit] = useMutation(CREATE_DEPOSIT);

    // handlers
    const onWalletItemPickHandler = (wallet: any) => {
        setActiveWallet(wallet.name);
        setActivePerson(wallet.person);
        setActivePhone(wallet.phone);
    };

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [3, 4],
            quality: 1,
        });

        if (!result.canceled) {
            //
            let localUri = result.assets[0].uri;
            let filename = localUri.split('/').pop();

            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;

            const file = generateRNFile(localUri, type, filename);

            console.log(file);

            setScreenshot(file);
            setImage(result.assets[0].uri);
        }
    };

    const onSubmitHandler = async () => {
        if (!user || amount <= 0 || !screenShot) {
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

        const deposit = {
            user: user._id,
            amount,
            screenShot,
        };

        const { data, errors } = await createDeposit({
            variables: {
                deposit,
            },
        });

        if (data?.createDeposit._id) {
            toast.show({
                title: 'Success!',
                description: 'Successfully submitted the order',
                placement: 'bottom',
                render: () => (
                    <ToastAlert
                        status="success"
                        title="Your deposit is successfully submitted."
                    />
                ),
            });

            // reset the states
            setAmount(0);
            setActiveWallet(mobileWallets[0].name);
            setActivePerson(mobileWallets[0].person);
            setActivePhone(mobileWallets[0].phone);
            setImage(null);
            setScreenshot(null);

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
                <HStack w={'full'} alignItems={'center'} mt={'3'}>
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
                <Text w="full" mt={'4'} fontSize={'md'} fontWeight={'bold'}>
                    Transfer To
                </Text>
                <HStack
                    w="full"
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    mt={'3'}
                >
                    <Text>Name</Text>
                    <Text textTransform={'uppercase'}>{activePerson}</Text>
                </HStack>
                <HStack
                    w="full"
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    mt={'3'}
                >
                    <Text>Phone</Text>
                    <Text textTransform={'uppercase'}>{activePhone}</Text>
                </HStack>
                <Box w="full" mt={'5'}>
                    <Pressable
                        flexDir={'row'}
                        alignItems={'center'}
                        justifyContent={'flex-start'}
                        rounded={'sm'}
                        onPress={pickImage}
                        my={'2'}
                    >
                        <Icon
                            as={<AntDesign name={'camera'} />}
                            size={5}
                            color="blue.600"
                        />
                        <Text fontWeight={'bold'} ml={'2'}>
                            Attach the screenshot of your transaction
                        </Text>
                    </Pressable>
                    {image && (
                        <Image
                            mt={'4'}
                            source={{ uri: image }}
                            w={'40'}
                            h={'56'}
                            alt="screenshot"
                        />
                    )}
                </Box>
                <Button
                    background={'blue.600'}
                    w="100%"
                    mt={'6'}
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
                        props.navigation.navigate('DepositHistoryScreen');
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

export default DepositScreen;
