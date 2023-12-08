import { AntDesign, Entypo } from '@expo/vector-icons';
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
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import ItemItem from '../components/home/ItemItem';
import { useQuery } from '@apollo/client';
import { GET_ALL_VENDORS } from '../@apollo/queries/vendor-query';
import Loading from '../components/layouts/Loading';
import VendorItem from '../components/home/VendorItem';
import { GET_ALL_CATEGORIES } from '../@apollo/queries/category-query';
import CategoryItem from '../components/home/CategoryItem';
import { useDidMountEffect } from '../hooks/useDidMountEffect';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { renderers } from 'react-native-popup-menu';
const { SlideInMenu } = renderers;

const ShopScreen = (props) => {
    const {
        data: categoryData,
        loading: categoryLoading,
        error: categoryError,
    } = useQuery<any>(GET_ALL_CATEGORIES, {
        variables: {
            queryString: {
                limit: null,
                forMarket: false,
            },
        },
    });

    const { data, error, loading, refetch } = useQuery(GET_ALL_VENDORS, {
        variables: {
            queryString: {
                limit: '4',
                type: 'shop',
            },
        },
    });

    const [keyword, setKeyword] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    useDidMountEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            const asyncSearch = async () => {
                if (keyword.length > 0) {
                    await refetch({
                        queryString: {
                            search: keyword.trim(),
                            type: 'shop',
                        },
                    });

                    setIsOpen(true);
                } else {
                    await refetch({
                        queryString: {
                            limit: '4',
                            type: 'shop',
                        },
                    });
                    setIsOpen(false);
                }
            };

            asyncSearch();
        }, 1000);

        return () => clearTimeout(delayDebounceFn);
    }, [keyword]);

    const onSearchHandler = (val) => {
        setKeyword(val);
    };

    const onClearSearchHandler = async () => {
        await refetch({
            queryString: {
                limit: '4',
                type: 'shop',
            },
        });
        setKeyword('');
        setIsOpen(false);
    };

    const onLoadMoreHandler = () => {
        refetch({
            queryString: {
                limit: String(data.getAllVendors.vendors.length + 2),
                type: 'shop',
            },
        });
    };

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
                        <Box background={'white'} w="100%">
                            <Input
                                autoCapitalize={'none'}
                                type="text"
                                placeholder="Search Items & Shops..."
                                pl={2}
                                value={keyword}
                                size={'md'}
                                rounded={'none'}
                                padding={'1.5'}
                                InputRightElement={
                                    keyword.length > 0 ? (
                                        <Pressable
                                            onPress={onClearSearchHandler}
                                        >
                                            <Icon
                                                as={<Entypo name={'cross'} />}
                                                size={5}
                                                mr="2"
                                                color="muted.400"
                                            />
                                        </Pressable>
                                    ) : (
                                        <Pressable
                                            onPress={() => console.log()}
                                        >
                                            <Icon
                                                as={
                                                    <AntDesign
                                                        name={'search1'}
                                                    />
                                                }
                                                size={5}
                                                mr="2"
                                                color="muted.400"
                                            />
                                        </Pressable>
                                    )
                                }
                                onChangeText={onSearchHandler}
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
                        <HStack
                            mb={'2'}
                            justifyContent={'space-between'}
                            alignItems={'center'}
                        >
                            <Heading size={'md'}>All Shops</Heading>
                            <Menu renderer={SlideInMenu}>
                                <MenuTrigger
                                    children={
                                        <Box
                                            flexDir={'row'}
                                            alignItems={'center'}
                                        >
                                            <Heading
                                                fontWeight={'normal'}
                                                size={'xs'}
                                            >
                                                Sort By
                                            </Heading>
                                            <Icon
                                                size={'3'}
                                                ml="2"
                                                as={
                                                    <AntDesign name="caretdown" />
                                                }
                                            />
                                        </Box>
                                    }
                                />
                                <MenuOptions>
                                    <MenuOption
                                        onSelect={() => alert(`Save`)}
                                        children={
                                            <Box py={'1'} pl={'4'}>
                                                <Text>A - Z</Text>
                                            </Box>
                                        }
                                    />
                                    <MenuOption
                                        onSelect={() => alert(`Delete`)}
                                        children={
                                            <Box py={'1'} pl={'4'}>
                                                <Text>Z - A</Text>
                                            </Box>
                                        }
                                    />
                                    <MenuOption
                                        onSelect={() => alert(`Delete`)}
                                        children={
                                            <Box py={'1'} pl={'4'}>
                                                <Text>Date Added</Text>
                                            </Box>
                                        }
                                    />
                                </MenuOptions>
                            </Menu>
                        </HStack>
                        <Flex mt={'2'} flexDir={'row'} flexWrap={'wrap'}>
                            {data &&
                                data.getAllVendors.vendors.map((vendor) => (
                                    <VendorItem
                                        props={props}
                                        vendor={vendor}
                                        key={vendor._id}
                                    />
                                ))}
                        </Flex>
                        <Box
                            mt="2"
                            justifyContent={'center'}
                            alignItems={'center'}
                        >
                            <Pressable
                                w={'32'}
                                background={'blue.600'}
                                alignItems={'center'}
                                justifyContent={'center'}
                                px={'3'}
                                py={'2'}
                                rounded={'sm'}
                                onPress={onLoadMoreHandler}
                            >
                                <Text fontWeight={'bold'} color={'white'}>
                                    Load More
                                </Text>
                            </Pressable>
                        </Box>
                    </Box>
                </Box>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ShopScreen;
