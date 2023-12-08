import { Box, HStack, Icon, Image, Input, Pressable, Text } from 'native-base';
import React from 'react';
import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';
import numberWithCommas from '../../utils/thousandSeparater';
import { useAppDispatch } from '../../@redux/hooks';
import { addItem } from '../../@redux/cartSlice';

type FavouriteItemProps = {
    item: any;
    navigation: any;
};

const FavouriteItem: React.FC<FavouriteItemProps> = ({ item, navigation }) => {
    const dispatch = useAppDispatch();

    const addToCartHandler = () => {
        if (!item) return null;

        dispatch(addItem({ ...item, quantity: 1 }));

        navigation.navigate('MAY', {
            screen: 'Home',
            params: {
                screen: 'CartScreen',
            },
        });
    };
    return (
        <HStack
            rounded={'sm'}
            flexDir={'row'}
            px="2"
            py={'3'}
            mb={'4'}
            background={'white'}
        >
            <Box justifyContent={'center'} flex={'1'} rounded={'sm'}>
                <Image
                    source={{
                        uri: item.mainImage.replace(
                            'localhost',
                            '192.168.100.113'
                        ),
                    }}
                    alt="Alternate Text"
                    size="xl"
                    height={'20'}
                    roundedTop={'sm'}
                />
            </Box>
            <Box p={'2'} flex={'2'}>
                <HStack justifyContent={'space-between'} alignItems={'center'}>
                    <Text fontSize={'md'}>{item.name}</Text>
                </HStack>
                <HStack
                    mt={'1'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                >
                    <Text mt={'1'} color={'gray.400'}>
                        {item.vendor.name}
                    </Text>
                </HStack>
                <HStack
                    mt={' 1'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                >
                    <Text mt={'1'} fontWeight={'bold'} color={'may-black'}>
                        MMK {numberWithCommas(item.price)}
                    </Text>
                    <Pressable
                        flexDir={'row'}
                        background={'blue.600'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        px={'2'}
                        py={'2'}
                        rounded={'sm'}
                        onPress={addToCartHandler}
                    >
                        <Icon
                            as={<Feather name="plus-circle" />}
                            size={4}
                            mr={'1'}
                            color={'white'}
                        />
                        <Text fontWeight={'bold'} color={'white'}>
                            Add to Cart
                        </Text>
                    </Pressable>
                </HStack>
            </Box>
        </HStack>
    );
};

export default FavouriteItem;
