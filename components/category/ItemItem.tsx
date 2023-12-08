import { Box, HStack, Icon, Image, Input, Pressable, Text } from 'native-base';
import React from 'react';
import { TItem } from '../../@types/item-types';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import numberWithCommas from '../../utils/thousandSeparater';
import { useAppDispatch } from '../../@redux/hooks';
import { amendItem, removeItem } from '../../@redux/cartSlice';
import { TCategory } from '../../@types/category-types';
import { useAuth } from '../../contexts/useAuth';

type ItemItemProps = {
    item: TItem;
};

const ItemItem: React.FC<ItemItemProps> = ({ item }) => {
    const {
        authData: { user },
    } = useAuth();
    const dispatch = useAppDispatch();

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
                <HStack alignItems={'flex-end'}>
                    <Box flex={'1'}>
                        <Text mt={'1'} color={'gray.400'}>
                            {item.vendor.name}
                        </Text>
                        <Text mt={'1'} fontWeight={'bold'} color={'may-black'}>
                            MMK {numberWithCommas(item.price)}
                        </Text>
                    </Box>

                    <Pressable
                        background={'white'}
                        p={'2'}
                        rounded={'full'}
                        shadow={'1'}
                    >
                        <AntDesign
                            name={
                                item?.favouritedBy?.find((fb) => fb == user._id)
                                    ? 'heart'
                                    : 'hearto'
                            }
                            size={20}
                            color="#DA291C"
                        />
                    </Pressable>
                </HStack>
            </Box>
        </HStack>
    );
};

export default ItemItem;
