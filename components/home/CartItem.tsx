import { Box, HStack, Icon, Image, Input, Pressable, Text } from 'native-base';
import React from 'react';
import { TItem } from '../../@types/item-types';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import numberWithCommas from '../../utils/thousandSeparater';
import { useAppDispatch } from '../../@redux/hooks';
import { amendItem, removeItem } from '../../@redux/cartSlice';

interface ModifiedItem extends TItem {
    quantity: number;
}

type CartItemProps = {
    item: ModifiedItem;
};

const CartItem: React.FC<CartItemProps> = ({ item }) => {
    const dispatch = useAppDispatch();

    const removeCartItemHandler = () => {
        if (!item) return;

        dispatch(removeItem(item._id));
    };

    const increaseQuantityHandler = () => {
        dispatch(amendItem({ itemId: item._id, type: 'increase' }));
    };

    const decreaseQuantityHandler = () => {
        dispatch(amendItem({ itemId: item._id, type: 'decrease' }));
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
                    <Pressable onPress={removeCartItemHandler}>
                        <Icon
                            as={<MaterialIcons name="highlight-remove" />}
                            size={5}
                            color={'gray.500'}
                        />
                    </Pressable>
                </HStack>
                <HStack alignItems={'flex-end'}>
                    <Box flex={'1'}>
                        <Text mt={'1'} color={'gray.400'}>
                            {item.vendor.name}
                        </Text>
                        <Text mt={'1'} fontWeight={'bold'} color={'may-black'}>
                            MMK {numberWithCommas(item.price)}
                        </Text>
                    </Box>
                    <Box flex={'1'}>
                        <Input
                            autoCapitalize={'none'}
                            editable={false}
                            selectTextOnFocus={false}
                            type="text"
                            color={'blue.600'}
                            value={`${item.quantity}`}
                            textAlign={'center'}
                            size={'sm'}
                            rounded={'sm'}
                            padding={'0'}
                            InputLeftElement={
                                <Pressable onPress={decreaseQuantityHandler}>
                                    <Icon
                                        as={<AntDesign name={'minus'} />}
                                        size={4}
                                        ml="2"
                                        color="blue.600"
                                    />
                                </Pressable>
                            }
                            InputRightElement={
                                <Pressable onPress={increaseQuantityHandler}>
                                    <Icon
                                        as={<AntDesign name={'plus'} />}
                                        size={4}
                                        mr="2"
                                        color="blue.600"
                                    />
                                </Pressable>
                            }
                        />
                    </Box>
                </HStack>
            </Box>
        </HStack>
    );
};

export default CartItem;
