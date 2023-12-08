import { AntDesign, Entypo } from '@expo/vector-icons';
import { Box, HStack, Image, Text } from 'native-base';
import React from 'react';
import { TVendor } from '../../@types/vendor-types';

type ShopItemProps = {
    shop: TVendor;
};

const ShopItem: React.FC<ShopItemProps> = ({ shop }) => {
    return (
        <Box
            justifyContent={'flex-start'}
            alignItems={'center'}
            width={'46%'}
            pb="2"
            background={'white'}
            mx={'2%'}
            my={'2%'}
            rounded={'sm'}
        >
            <Image
                source={{
                    uri: shop.logo.replace('localhost', '192.168.100.113'),
                }}
                alt="Alternate Text"
                size="xl"
                w={'100%'}
                height={'24'}
                roundedTop={'sm'}
                resizeMode="cover"
            />
            <HStack w={'100%'} mt={2}>
                <Box flex={'4'} p={'2'}>
                    <HStack mb={'2'}>
                        <Entypo name="star" size={18} color="#FFC72C" />
                        <Entypo name="star" size={18} color="#FFC72C" />
                        <Entypo name="star" size={18} color="#FFC72C" />
                        <Entypo name="star" size={18} color="#FFC72C" />
                        <Entypo name="star" size={18} color="#FFC72C" />
                    </HStack>
                    <Text>{shop.name}</Text>
                    <Text fontWeight={'bold'}>
                        {shop.township}, {shop.city}
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
        </Box>
    );
};

export default ShopItem;
