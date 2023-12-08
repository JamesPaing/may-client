import { AntDesign, Entypo } from '@expo/vector-icons';
import { Box, HStack, Image, Pressable, Text } from 'native-base';
import React from 'react';
import { TItem } from '../../@types/item-types';
import numberWithCommas from '../../utils/thousandSeparater';

type ItemItemProps = {
    item: TItem;
    props: any;
};

const ItemItem: React.FC<ItemItemProps> = ({ item, props }) => {
    return (
        <Pressable
            justifyContent={'flex-start'}
            alignItems={'center'}
            width={'46%'}
            pb="2"
            background={'white'}
            mx={'2%'}
            my={'2%'}
            rounded={'sm'}
            onPress={() => {
                props.navigation.navigate('ItemScreen', {
                    itemId: item._id,
                    itemName: item.name,
                });
            }}
        >
            <Image
                source={{
                    uri: item.mainImage.replace('localhost', '192.168.100.113'),
                }}
                alt="Alternate Text"
                size="xl"
                w={'100%'}
                height={'24'}
                roundedTop={'sm'}
            />
            <HStack w={'100%'} background={'white'} mt={2}>
                <Box flex={'4'} p={'2'}>
                    <HStack mb={'2'}>
                        <Entypo name="star" size={18} color="#FFC72C" />
                        <Entypo name="star" size={18} color="#FFC72C" />
                        <Entypo name="star" size={18} color="#FFC72C" />
                        <Entypo name="star" size={18} color="#FFC72C" />
                        <Entypo name="star" size={18} color="#FFC72C" />
                    </HStack>
                    <Text>{item.name}</Text>
                    <Text fontWeight={'bold'}>
                        MMK {numberWithCommas(item.price)}
                    </Text>
                </Box>
                <Box
                    flex={'1'}
                    justifyContent={'flex-end'}
                    alignItems={'center'}
                    p="2"
                >
                    <AntDesign name="heart" size={18} color="#DA291C" />
                </Box>
            </HStack>
        </Pressable>
    );
};

export default ItemItem;
