import {
    Box,
    HStack,
    Icon,
    Image,
    PresenceTransition,
    Pressable,
    Radio,
    ScrollView,
    Text,
    TextArea,
    useToast,
} from 'native-base';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { useAppSelector } from '../@redux/hooks';
import numberWithCommas from '../utils/thousandSeparater';
import { AntDesign } from '@expo/vector-icons';
import { useAuth } from '../contexts/useAuth';
import { useMutation, useQuery } from '@apollo/client';
import * as ImagePicker from 'expo-image-picker';
import { mobileWallets } from '../utils/getMobileWallets';
import { GET_ALL_PAYMENT_METHODS } from '../@apollo/queries/payment-method-query';
import { CREATE_ORDER } from '../@apollo/queries/order-query';
import { ReactNativeFile } from 'apollo-upload-client';
import ToastAlert from '../components/layouts/ToastAlert';
import LocationChoose from '../components/order/LocationChoose';

export function generateRNFile(uri, type, name) {
    return uri
        ? new ReactNativeFile({
              uri,
              type,
              name,
          })
        : null;
}

const OrderScreen = (props) => {
    // hooks
    const toast = useToast();
    const { grandTotal, subtotal, items } = useAppSelector(
        (state) => state.cart
    );
    const { authData } = useAuth();
    const { user } = authData;
    const { data: paymentMethodData, error: paymentMethodError } = useQuery(
        GET_ALL_PAYMENT_METHODS,
        {
            variables: {
                queryString: {
                    limit: null,
                },
            },
        }
    );
    const [createOrder] = useMutation(CREATE_ORDER);
    const [value, setValue] = useState('cod');
    const [locationValue, setLocationValue] = useState('1');
    const [coordinates, setCoordinates] = useState(user?.location?.coordinates);
    const [image, setImage] = useState(null);
    const [screenShot, setScreenshot] = useState(null);
    const [activeWallet, setActiveWallet] = useState(mobileWallets[0].name);
    const [activePerson, setActivePerson] = useState(mobileWallets[0].person);
    const [activePhone, setActivePhone] = useState(mobileWallets[0].phone);
    const [isOpen, setIsOpen] = React.useState(false);
    const [note, setNote] = useState('');

    // handlers
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

    const onWalletItemPickHandler = (name: string) => {
        setActiveWallet(name);
    };

    const onConfirmOrderHandler = async () => {
        const location =
            locationValue === '2'
                ? {
                      type: 'Point',
                      coordinates,
                  }
                : undefined;
        const address = locationValue === '1' ? user.address : undefined;
        const order = {
            user: user._id,
            total: grandTotal,
            subTotal: subtotal,
            location,
            address,
            payments: [
                {
                    paymentMethod:
                        paymentMethodData.getAllPaymentMethods.paymentMethods.find(
                            (pm) => pm.type === value
                        )._id,
                    amount: grandTotal,
                },
            ],
            orderItems: items.map((i) => ({
                item: i._id,
                quantity: i.quantity,
            })),
            note,
            screenShot,
        };

        const { data } = await createOrder({
            variables: {
                order,
            },
        });

        if (data?.createOrder._id) {
            toast.show({
                title: 'Success!',
                description: 'Successfully submitted the order',
                placement: 'bottom',
                render: () => (
                    <ToastAlert
                        status="success"
                        title="Your order is successfully submitted."
                    />
                ),
            });

            props.navigation.navigate('OrderHistoryScreen');
        }
    };

    return (
        <SafeAreaView
            style={{
                flex: 1,
                height: '100%',
                width: '100%',
            }}
        >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
                w={'full'}
                h={'full'}
            >
                <Box
                    flex={'1'}
                    padding={'4'}
                    height={'100%'}
                    width={'100%'}
                    background={'gray.100'}
                >
                    <Box
                        borderBottomWidth={'1'}
                        borderBottomColor={'gray.200'}
                        roundedTop={'3xl'}
                        mt={'4'}
                        paddingTop={'5'}
                        p={'4'}
                        background={'white'}
                    >
                        {/* Billing information */}
                        <Text fontSize={'md'} fontWeight={'bold'}>
                            Billing Information
                        </Text>
                        <HStack
                            justifyContent={'space-between'}
                            alignItems={'center'}
                            mt={'3'}
                        >
                            <Text>Name</Text>
                            <Text textTransform={'uppercase'}>{user.name}</Text>
                        </HStack>
                        <HStack
                            justifyContent={'space-between'}
                            alignItems={'center'}
                            mt={'3'}
                        >
                            <Text>Email Address</Text>
                            <Text>{user.email}</Text>
                        </HStack>
                        <HStack
                            justifyContent={'space-between'}
                            alignItems={'center'}
                            mt={'3'}
                        >
                            <Text>Phone</Text>
                            <Text>{user.contact}</Text>
                        </HStack>
                        <HStack
                            justifyContent={'space-between'}
                            alignItems={'flex-start'}
                            mt={'3'}
                        >
                            <Text flex={1}>Address</Text>
                            <Text textAlign={'right'} flex={1}>
                                {user.address}
                            </Text>
                        </HStack>
                        {/* Location Choose */}
                        <LocationChoose
                            locationValue={locationValue}
                            setLocationValue={setLocationValue}
                            coordinates={coordinates}
                            setCoordinates={setCoordinates}
                        />
                        {/* Billing method */}
                        <Text mt={'8'} fontSize={'md'} fontWeight={'bold'}>
                            Billing Method Choose
                        </Text>
                        <Box mt={'2'}>
                            <Radio.Group
                                name="myRadioGroup"
                                accessibilityLabel="favorite number"
                                value={value}
                                onChange={(nextValue) => {
                                    setValue(nextValue);
                                }}
                            >
                                {paymentMethodData &&
                                    paymentMethodData.getAllPaymentMethods.paymentMethods.map(
                                        (pm) => (
                                            <Radio
                                                key={pm._id}
                                                colorScheme={'red'}
                                                size={'sm'}
                                                value={pm.type}
                                                my={2}
                                            >
                                                {pm.name}
                                            </Radio>
                                        )
                                    )}
                            </Radio.Group>
                        </Box>
                        {value === 'wallet' && (
                            <>
                                <HStack alignItems={'center'} mt={'3'}>
                                    {mobileWallets.map((wallet, i) => (
                                        <Pressable
                                            onPress={() =>
                                                onWalletItemPickHandler(
                                                    wallet.name
                                                )
                                            }
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
                                                    activeWallet === wallet.name
                                                        ? '3'
                                                        : '0'
                                                }
                                                borderColor={'blue.300'}
                                            />
                                        </Pressable>
                                    ))}
                                </HStack>
                                <Text
                                    mt={'4'}
                                    fontSize={'md'}
                                    fontWeight={'bold'}
                                >
                                    Transfer To
                                </Text>
                                <HStack
                                    justifyContent={'space-between'}
                                    alignItems={'center'}
                                    mt={'3'}
                                >
                                    <Text>Name</Text>
                                    <Text textTransform={'uppercase'}>
                                        {activePerson}
                                    </Text>
                                </HStack>
                                <HStack
                                    justifyContent={'space-between'}
                                    alignItems={'center'}
                                    mt={'3'}
                                >
                                    <Text>Phone</Text>
                                    <Text textTransform={'uppercase'}>
                                        {activePhone}
                                    </Text>
                                </HStack>
                                <Box mt={'5'}>
                                    <Pressable
                                        flexDir={'row'}
                                        alignItems={'center'}
                                        justifyContent={'flex-start'}
                                        rounded={'sm'}
                                        onPress={pickImage}
                                    >
                                        <Icon
                                            as={<AntDesign name={'camera'} />}
                                            size={5}
                                            color="blue.600"
                                        />
                                        <Text fontWeight={'bold'} ml={'2'}>
                                            Attach the screenshot of the
                                            transaction
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
                            </>
                        )}
                        {/* Note */}
                        <Pressable
                            mt={'4'}
                            flexDir={'row'}
                            alignItems={'center'}
                            justifyContent={'flex-start'}
                            rounded={'sm'}
                            onPress={() => setIsOpen(!isOpen)}
                        >
                            <Icon
                                as={
                                    <AntDesign
                                        name={isOpen ? 'check' : 'plus'}
                                    />
                                }
                                size={5}
                                color="blue.600"
                            />
                            <Text fontWeight={'bold'} ml={'2'}>
                                {isOpen ? 'Close' : 'Add'}{' '}
                                {isOpen ? 'the' : 'a'} note
                            </Text>
                        </Pressable>
                        <PresenceTransition
                            visible={isOpen}
                            initial={{
                                opacity: 0,
                                scale: 0,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                transition: {
                                    duration: 250,
                                },
                            }}
                        >
                            {isOpen && (
                                <TextArea
                                    mt={'4'}
                                    mb={'1'}
                                    h={20}
                                    placeholder="Enter..."
                                    maxW="300"
                                    value={note}
                                    autoCompleteType={undefined}
                                    onChangeText={(text) => setNote(text)}
                                />
                            )}
                        </PresenceTransition>
                    </Box>
                    {/* Confirm */}
                    <HStack
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        paddingTop={'5'}
                        p={'4'}
                        background={'white'}
                    >
                        <Text fontWeight={'bold'}>
                            MMK {numberWithCommas(grandTotal)}
                        </Text>
                        <Pressable
                            background={'blue.600'}
                            alignItems={'center'}
                            justifyContent={'center'}
                            px={'3'}
                            py={'2'}
                            rounded={'sm'}
                            onPress={onConfirmOrderHandler}
                        >
                            <Text fontWeight={'bold'} color={'white'}>
                                Confirm & Pay
                            </Text>
                        </Pressable>
                    </HStack>
                </Box>
            </ScrollView>
        </SafeAreaView>
    );
};

export default OrderScreen;
