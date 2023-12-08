import { Box, Image, Text, Pressable } from 'native-base';
import React from 'react';
import { TCategory } from '../../@types/category-types';

interface CategoryItemProps {
    category: TCategory;
    navigation: any;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
    category,
    navigation,
}) => {
    return (
        <Pressable
            flexDir={'row'}
            rounded={'xs'}
            justifyContent={'center'}
            alignItems={'center'}
            mr={'3'}
            my={'2'}
            // p={'2'}
            w={'32'}
            // h={'10'}
            shadow={'1'}
            backgroundColor={'white'}
            key={category._id}
            onPress={() => {
                navigation.navigate('CategoryScreen', {
                    categoryId: category._id,
                    categoryName: category.name,
                });
            }}
        >
            <Image
                source={{
                    uri: category.image?.replace(
                        'localhost',
                        '192.168.100.113'
                    ),
                }}
                alt="Alternate Text"
                size="xl"
                w={'50%'}
                height={'16'}
                roundedTopLeft={'sm'}
                roundedBottomLeft={'sm'}
                resizeMode="cover"
            />
            <Box
                justifyContent={'center'}
                alignItems={'center'}
                w={'50%'}
                p={'2'}
            >
                <Text
                    textAlign={'center'}
                    fontWeight={'bold'}
                    color="may-black"
                >
                    {category.name}
                </Text>
            </Box>
        </Pressable>
    );
};

export default CategoryItem;
