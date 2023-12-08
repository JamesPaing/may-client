import { Box, HStack, Icon, Image, Input, Pressable, Text } from 'native-base';
import React from 'react';
import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';
import numberWithCommas from '../../utils/thousandSeparater';
import { useAppDispatch } from '../../@redux/hooks';

type CartItemProps = {
    item: any;
    props: any;
};

const OrderHistoryItem: React.FC<CartItemProps> = ({ item, props }) => {
    const dispatch = useAppDispatch();

    return (
        <Pressable
            onPress={() =>
                props.navigation.navigate('OrderDetailScreen', {
                    orderId: item._id,
                })
            }
            rounded={'sm'}
            flexDir={'row'}
            px="2"
            py={'3'}
            mb={'4'}
            background={'white'}
        >
            <Box justifyContent={'center'} flex={'1'} rounded={'sm'}>
                {/* <Image
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
                /> */}
            </Box>
            <Box p={'2'} flex={'2'}>
                <HStack justifyContent={'space-between'} alignItems={'center'}>
                    <Text fontSize={'md'}>{item.ref}</Text>
                </HStack>
                <HStack
                    mt={'1'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                >
                    <Text mt={'1'} color={'gray.400'}>
                        {item.itemCount} item(s)
                    </Text>
                    <Text color={'gray.500'}>
                        {' '}
                        {new Date(item.date).toLocaleDateString()}
                    </Text>
                </HStack>
                <HStack
                    mt={' 1'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                >
                    <Text mt={'1'} fontWeight={'bold'} color={'may-black'}>
                        MMK {numberWithCommas(item.grandTotal)}
                    </Text>
                    <HStack justifyContent={'center'} alignItems={'center'}>
                        <Icon
                            as={
                                item.status === 'completed' ? (
                                    <Feather name="check-circle" />
                                ) : (
                                    <MaterialIcons name="pending" />
                                )
                            }
                            size={4}
                            mr={'1'}
                            color={'gray.500'}
                        />
                        <Text textTransform={'capitalize'}>{item.status}</Text>
                    </HStack>
                </HStack>
            </Box>
        </Pressable>
    );
};

export default OrderHistoryItem;
