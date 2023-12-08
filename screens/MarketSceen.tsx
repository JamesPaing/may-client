import { AntDesign } from '@expo/vector-icons';
import {
    Box,
    Text,
    ScrollView,
    HStack,
    Input,
    Pressable,
    Icon,
    FlatList,
    Flex,
    Heading,
} from 'native-base';
import React from 'react';
import { SafeAreaView } from 'react-native';
import ItemItem from '../components/home/ItemItem';
import { useQuery } from '@apollo/client';
import { GET_ALL_VENDORS } from '../@apollo/queries/vendor-query';
import Loading from '../components/layouts/Loading';
import VendorItem from '../components/home/VendorItem';
import { GET_ALL_CATEGORIES } from '../@apollo/queries/category-query';
import CategoryItem from '../components/home/CategoryItem';

const MarketScreen = (props) => {
    const {
        data: categoryData,
        loading: categoryLoading,
        error: categoryError,
    } = useQuery<any>(GET_ALL_CATEGORIES, {
        variables: {
            queryString: {
                limit: null,
                forMarket: true,
            },
        },
    });

    const { data, error, loading } = useQuery(GET_ALL_VENDORS, {
        variables: {
            queryString: {
                limit: null,
                type: 'market',
            },
        },
    });

    if (loading) {
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
                            <AntDesign
                                name="filter"
                                size={24}
                                color="#ffffff"
                            />
                        </Box>
                    </HStack>
                    {/* Categories */}
                    <Box mt={'4'}>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                            data={
                                !categoryData
                                    ? [
                                          {
                                              _id: 1,
                                              name: 'Dessert',
                                          },
                                          {
                                              _id: 2,
                                              name: 'Pizza',
                                          },
                                          {
                                              _id: 3,
                                              name: 'Sushi',
                                          },
                                          {
                                              _id: 4,
                                              name: 'Cake',
                                          },
                                      ]
                                    : categoryData.getAllCategories.categories
                            }
                            renderItem={({ item }: any) => (
                                <CategoryItem
                                    navigation={props.navigation}
                                    key={item._id}
                                    category={item}
                                />
                            )}
                        />
                    </Box>
                    {/* Shops */}
                    <Box mt={'2'}>
                        <Flex mt={'2'} flexDir={'row'} flexWrap={'wrap'}>
                            {data &&
                                data.getAllVendors.vendors.map((vendor) => (
                                    <VendorItem
                                        vendor={vendor}
                                        key={vendor._id}
                                    />
                                ))}
                        </Flex>
                    </Box>
                </Box>
            </ScrollView>
        </SafeAreaView>
    );
};

export default MarketScreen;
