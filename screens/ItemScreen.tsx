import { useLazyQuery, useMutation } from '@apollo/client';
import { AntDesign } from '@expo/vector-icons';
import {
    Box,
    Text,
    ScrollView,
    Flex,
    Heading,
    Image,
    HStack,
    Button,
    Input,
    Pressable,
    Icon,
    useToast,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { GET_ITEM } from '../@apollo/queries/item-query';
import numberWithCommas from '../utils/thousandSeparater';
import Loading from '../components/layouts/Loading';
import { useAppDispatch } from '../@redux/hooks';
import { addItem } from '../@redux/cartSlice';
import {
    ADD_FAVOURITE_ITEM,
    REMOVE_FACOURITE_ITEM,
} from '../@apollo/queries/user-query';
import { useAuth } from '../contexts/useAuth';
import ToastAlert from '../components/layouts/ToastAlert';

const ItemScreen = (props) => {
    const {
        authData: { user },
    } = useAuth();
    const dispatch = useAppDispatch();
    const toast = useToast();

    const { itemName, itemId } = props.route.params;
    const [item, setItem] = useState<any>();
    const [quantity, setQuantity] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const [getItem] = useLazyQuery(GET_ITEM);
    const [addFavouriteItem] = useMutation(ADD_FAVOURITE_ITEM);
    const [removeFavouriteItem] = useMutation(REMOVE_FACOURITE_ITEM);

    useEffect(() => {
        const asyncGetItem = async () => {
            const { data: itemData } = await getItem({
                variables: {
                    _id: itemId,
                },
            });

            itemData && setItem(itemData.getItem);
        };

        asyncGetItem();
    }, [itemId]);

    const increaseQuantityHandler = () => {
        setQuantity((prev) => prev + 1);
    };

    const decreaseQuantityHandler = () => {
        setQuantity((prev) => {
            if (prev > 1) {
                return prev - 1;
            }

            return prev;
        });
    };

    const addToFavouriteHandler = async () => {
        console.log('add');
        const { data, errors } = await addFavouriteItem({
            variables: {
                _id: user?._id || null,
                itemId: item?._id || null,
            },
        });

        if (data?.addFavouriteItem) {
            setItem(data.addFavouriteItem);

            toast.show({
                title: 'Success!',
                description: 'Successfully submitted the order',
                placement: 'bottom',
                render: () => (
                    <ToastAlert
                        status="success"
                        title="Added to your favourite list."
                    />
                ),
            });
        }
    };

    const removeFromFavuriteHandler = async () => {
        console.log('remove');
        const { data, errors } = await removeFavouriteItem({
            variables: {
                _id: user?._id || null,
                itemId: item?._id || null,
            },
        });

        if (data?.removeFavouriteItem) {
            setItem(data.removeFavouriteItem);

            toast.show({
                title: 'Success!',
                description: 'Successfully submitted the order',
                placement: 'bottom',
                render: () => (
                    <ToastAlert
                        status="success"
                        title="Removed from your favourite list."
                    />
                ),
            });
        }
    };

    const addToCartHandler = () => {
        if (!item) return null;

        dispatch(addItem({ ...item, quantity }));

        props.navigation.navigate('CartScreen');
    };

    if (!item || isLoading) {
        return <Loading />;
    }

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
                    <Flex
                        flexDir={'row'}
                        alignItems={'center'}
                        justifyContent={'space-between'}
                    >
                        <Box rounded={'sm'} background={'may-primary'} p={'1'}>
                            <Text color={'white'}>40% OFF</Text>
                        </Box>
                        <Box>
                            <Heading size={'md'} color={'may-black'}>
                                {itemName}
                            </Heading>
                        </Box>
                        <Pressable
                            background={'white'}
                            p={'2'}
                            rounded={'full'}
                            shadow={'1'}
                            onPress={
                                item?.favouritedBy?.find((fb) => fb == user._id)
                                    ? removeFromFavuriteHandler
                                    : addToFavouriteHandler
                            }
                        >
                            <AntDesign
                                name={
                                    item?.favouritedBy?.find(
                                        (fb) => fb == user._id
                                    )
                                        ? 'heart'
                                        : 'hearto'
                                }
                                size={20}
                                color="#DA291C"
                            />
                        </Pressable>
                    </Flex>
                    <Box mt={'4'}>
                        {item ? (
                            <Image
                                source={{
                                    uri: item.mainImage.replace(
                                        'localhost',
                                        '192.168.100.113'
                                    ),
                                }}
                                alt="Alternate Text"
                                size="xl"
                                w={'100%'}
                                height={'64'}
                                roundedTop={'sm'}
                                resizeMode="contain"
                            />
                        ) : null}
                    </Box>
                    <Box
                        pt={'8'}
                        roundedTop={'3xl'}
                        roundedBottom={'sm'}
                        mt={'4'}
                        p={'4'}
                        background={'white'}
                        shadow={'1'}
                    >
                        <Text>Rating 4.0 of 5</Text>
                        <Heading mt={'2'} color={'blue.600'}>
                            {item.name}
                        </Heading>
                        <Text mt={'2'}>
                            There are many variations of KFC's fried chicken.
                        </Text>
                        <HStack mt={'4'}>
                            <Box flex={1} justifyContent={'center'}>
                                <Text fontSize={'md'}>Size</Text>
                            </Box>
                            <HStack alignItems={'center'} flex={1}>
                                <Button
                                    background={'blue.100'}
                                    mr={'3'}
                                    size={'sm'}
                                    variant={'outline'}
                                >
                                    S
                                </Button>
                                <Button
                                    mr={'3'}
                                    size={'sm'}
                                    variant={'outline'}
                                >
                                    M
                                </Button>
                                <Button mr="3" size={'sm'} variant={'outline'}>
                                    L
                                </Button>
                            </HStack>
                        </HStack>
                        {/* Quantity */}
                        <HStack mt={'4'}>
                            <Box flex={1} justifyContent={'center'}>
                                <Text fontSize={'md'}>Quantity</Text>
                            </Box>
                            <HStack alignItems={'center'} flex={1}>
                                <Input
                                    autoCapitalize={'none'}
                                    editable={false}
                                    selectTextOnFocus={false}
                                    type="text"
                                    color={'blue.600'}
                                    value={`${quantity}`}
                                    textAlign={'center'}
                                    size={'sm'}
                                    rounded={'sm'}
                                    padding={'0'}
                                    InputLeftElement={
                                        <Pressable
                                            onPress={decreaseQuantityHandler}
                                        >
                                            <Icon
                                                as={
                                                    <AntDesign name={'minus'} />
                                                }
                                                size={4}
                                                ml="2"
                                                color="blue.600"
                                            />
                                        </Pressable>
                                    }
                                    InputRightElement={
                                        <Pressable
                                            onPress={increaseQuantityHandler}
                                        >
                                            <Icon
                                                as={<AntDesign name={'plus'} />}
                                                size={4}
                                                mr="2"
                                                color="blue.600"
                                            />
                                        </Pressable>
                                    }
                                />
                            </HStack>
                        </HStack>
                        {/* Description */}
                        <Box mt={'4'}>
                            <Text>
                                Ipsum available, but the majority have suffered
                                alteration in some form, by injected humour,
                                randomised words which. don't look even slightly
                                believable. If you are going to use a passage of
                                Lorem Ipsum, you need
                            </Text>
                        </Box>
                        {/* Price and Add to Cart */}
                        <HStack
                            justifyContent={'space-between'}
                            alignItems={'center'}
                            my={'4'}
                        >
                            <Box>
                                <Heading size={'md'} color={'blue.600'}>
                                    MMK {numberWithCommas(item.price)}
                                </Heading>
                            </Box>

                            <Pressable
                                roundedBottomLeft={'3xl'}
                                roundedTopLeft={'3xl'}
                                roundedBottomRight={'none'}
                                roundedTopRight={'none'}
                                flexDir={'row'}
                                background={'may-secondary'}
                                alignItems={'center'}
                                justifyContent={'center'}
                                px={'6'}
                                py={'3'}
                                mr={'-4'}
                                onPress={addToCartHandler}
                            >
                                <Icon
                                    as={<AntDesign name={'shoppingcart'} />}
                                    size={5}
                                    mr={'2'}
                                    color="may-black"
                                />
                                <Text
                                    fontWeight={'bold'}
                                    ml={'2'}
                                    color={'may-black'}
                                >
                                    Add to Cart
                                </Text>
                            </Pressable>
                        </HStack>
                    </Box>
                </Box>
            </ScrollView>
        </SafeAreaView>
    );
};

export const screenOptions = (navData) => {
    return {
        headerTitle: navData.route.params.itemName
            ? navData.route.params.itemName
            : 'Item Detail',
    };
};

export default ItemScreen;
