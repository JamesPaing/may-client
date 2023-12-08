import React from 'react';
import Wrapper from '../components/layouts/Wrapper';
import {
    Box,
    HStack,
    Heading,
    Icon,
    Input,
    Pressable,
    Text,
} from 'native-base';
import { GET_ITEM_BY_CATEGORY } from '../@apollo/queries/item-query';
import { useQuery } from '@apollo/client';
import Loading from '../components/layouts/Loading';
import ItemItem from '../components/category/ItemItem';
import { AntDesign } from '@expo/vector-icons';

const CategoryScreen = (props) => {
    const { categoryName, categoryId } = props.route.params;

    const { data, loading, error } = useQuery(GET_ITEM_BY_CATEGORY, {
        variables: {
            catId: categoryId || null,
            queryString: {
                limit: '1',
            },
        },
    });

    if (loading) {
        return <Loading />;
    }

    return (
        <Wrapper>
            {/* Search and filter  */}
            <HStack>
                <Box background={'white'} w="80%">
                    <Input
                        autoCapitalize={'none'}
                        type="text"
                        placeholder="Search..."
                        pl={2}
                        size={'md'}
                        rounded={'none'}
                        padding={'1.5'}
                        InputRightElement={
                            <Pressable onPress={() => console.log()}>
                                <Icon
                                    as={<AntDesign name={'search1'} />}
                                    size={5}
                                    mr="2"
                                    color="muted.400"
                                />
                            </Pressable>
                        }
                    />
                </Box>
                <Box
                    flex={'1'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    w={'20%'}
                    background={'may-primary'}
                >
                    <AntDesign name="filter" size={24} color="#ffffff" />
                </Box>
            </HStack>
            <Box mt="6">
                <HStack
                    mb={'4'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                >
                    <Heading size={'md'}>All Products</Heading>
                    <Pressable flexDir={'row'} alignItems={'center'}>
                        <Heading fontWeight={'normal'} size={'xs'}>
                            Sort By
                        </Heading>
                        <Icon
                            size={'3'}
                            ml="2"
                            as={<AntDesign name="caretdown" />}
                        />
                    </Pressable>
                </HStack>
                {data &&
                    data.getItemByCategory.items.map((item) => (
                        <ItemItem item={item} key={item._id} />
                    ))}
            </Box>
        </Wrapper>
    );
};

export default CategoryScreen;
