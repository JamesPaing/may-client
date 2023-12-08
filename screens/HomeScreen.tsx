import {
    Box,
    FlatList,
    Flex,
    FormControl,
    HStack,
    Heading,
    Icon,
    Image,
    Input,
    Pressable,
    Text,
    ScrollView,
    VStack,
    Button,
    PresenceTransition,
    Divider,
} from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native';
import ItemItem from '../components/home/ItemItem';
import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_ALL_CATEGORIES } from '../@apollo/queries/category-query';
import { TCategory } from '../@types/category-types';
import CategoryItem from '../components/home/CategoryItem';
import { GET_ALL_VENDORS } from '../@apollo/queries/vendor-query';
import VendorItem from '../components/home/VendorItem';
import { GET_ALL_ITEMS } from '../@apollo/queries/item-query';
import { useDidMountEffect } from '../hooks/useDidMountEffect';
import { useState } from 'react';

const HomeScreen = (props) => {
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

    const {
        data: vendorData,
        loading: vendorLoading,
        error: vendorError,
    } = useQuery<any>(GET_ALL_VENDORS, {
        variables: {
            queryString: {
                limit: null,
                forMarket: false,
            },
        },
    });

    const {
        data: itemData,
        loading: itemLoading,
        error: itemError,
        refetch: refetchItemData,
    } = useQuery<any>(GET_ALL_ITEMS, {
        variables: {
            queryString: {
                limit: null,
            },
        },
    });

    const [searchItems] = useLazyQuery<any>(GET_ALL_ITEMS);
    const [searchVendors] = useLazyQuery<any>(GET_ALL_VENDORS);

    const [keyword, setKeyword] = useState('');
    const [searchedItems, setSearchItems] = useState([]);
    const [searchedVendors, setSearchedVendors] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    useDidMountEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            const asyncSearch = async () => {
                if (keyword.length > 0) {
                    setSearchItems([]);

                    const { data } = await searchItems({
                        variables: {
                            queryString: {
                                search: keyword.trim(),
                            },
                        },
                    });

                    const { data: dataVendor } = await searchVendors({
                        variables: {
                            queryString: {
                                search: keyword.trim(),
                            },
                        },
                    });

                    if (data?.getAllItems?.results > 0) {
                        setSearchItems(data.getAllItems.items);
                        setIsOpen(true);
                    }

                    if (dataVendor?.getAllVendors?.results > 0) {
                        setSearchedVendors(dataVendor.getAllVendors.vendors);
                        setIsOpen(true);
                    }
                } else {
                    setSearchItems([]);
                    setSearchedVendors([]);
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

    const onClearSearchHandler = () => {
        setKeyword('');
        setSearchItems([]);
        setSearchedVendors([]);
        setIsOpen(false);
    };

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
                    <VStack>
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
                        {searchItems.length > 0 && (
                            <PresenceTransition
                                visible={isOpen}
                                initial={{
                                    opacity: 0,
                                    scale: 0,
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    transition: {
                                        duration: 300,
                                    },
                                }}
                            >
                                <Box
                                    mt={'0'}
                                    flex={'1'}
                                    justifyContent={'center'}
                                    alignItems={'flex-start'}
                                    // w={'20%'}
                                    background={'white'}
                                    shadow={'1'}
                                    roundedBottomLeft={'sm'}
                                    roundedBottomRight={'sm'}
                                >
                                    {isOpen && searchedItems.length > 0 ? (
                                        <Text
                                            ml={'2'}
                                            textTransform={'uppercase'}
                                            my={'2'}
                                            fontWeight={'bold'}
                                            fontSize={'xs'}
                                        >
                                            Items
                                        </Text>
                                    ) : null}
                                    <Divider />
                                    {searchedItems.map((i) => (
                                        <Button
                                            onPress={() => {
                                                props.navigation.navigate(
                                                    'ItemScreen',
                                                    {
                                                        itemId: i._id,
                                                        itemName: i.name,
                                                    }
                                                );
                                            }}
                                            key={i._id}
                                            _hover={{
                                                backgroundColor: 'may-primary',
                                            }}
                                            background={'white'}
                                            my={'1'}
                                            padding={'1'}
                                            rounded={'none'}
                                            w={'full'}
                                            size={'xs'}
                                            justifyContent={'flex-start'}
                                        >
                                            <Text ml={'2'}>{i.name}</Text>
                                        </Button>
                                    ))}
                                    {isOpen && searchedVendors.length > 0 ? (
                                        <Text
                                            ml={'2'}
                                            textTransform={'uppercase'}
                                            my={'2'}
                                            fontWeight={'bold'}
                                            fontSize={'xs'}
                                        >
                                            Shops
                                        </Text>
                                    ) : null}
                                    <Divider />
                                    {searchedVendors.map((v) => (
                                        <Button
                                            onPress={() => {
                                                props.navigation.navigate(
                                                    'VendorDetailScreen',
                                                    {
                                                        vendorId: v._id,
                                                        vendorName: v.name,
                                                    }
                                                );
                                            }}
                                            key={v._id}
                                            _hover={{
                                                backgroundColor: 'may-primary',
                                            }}
                                            background={'white'}
                                            my={'1'}
                                            padding={'1'}
                                            rounded={'none'}
                                            w={'full'}
                                            size={'xs'}
                                            justifyContent={'flex-start'}
                                        >
                                            <Text ml={'2'}>{v.name}</Text>
                                        </Button>
                                    ))}
                                </Box>
                            </PresenceTransition>
                        )}
                    </VStack>
                    {/* Promotions */}
                    {/* <Box
                        mt={'4'}
                        background={'white'}
                        height={'40'}
                        justifyContent={'center'}
                        alignItems={'center'}
                    >
                        <Text fontFamily={'heading'} fontSize={'md'}>
                            Promotion Area
                        </Text>
                    </Box> */}
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
                    {/* Popular Menus */}
                    <Box mt={'4'}>
                        <HStack
                            justifyContent={'space-between'}
                            alignItems={'center'}
                        >
                            <Heading size={'md'}>Popular Menus</Heading>
                            <Heading size={'xs'}>View All</Heading>
                        </HStack>
                        <Flex mt={'2'} flexDir={'row'} flexWrap={'wrap'}>
                            {itemData &&
                                itemData.getAllItems.items.map((item) => (
                                    <ItemItem
                                        key={item._id}
                                        props={props}
                                        item={item}
                                    />
                                ))}
                        </Flex>
                    </Box>
                    {/* Trending Shops */}
                    <Box mt={'4'}>
                        <HStack
                            justifyContent={'space-between'}
                            alignItems={'center'}
                        >
                            <Heading size={'md'}>Trending Shops</Heading>
                            <Heading size={'xs'}>View All</Heading>
                        </HStack>
                        <Flex mt={'2'} flexDir={'row'} flexWrap={'wrap'}>
                            {vendorData &&
                                vendorData.getAllVendors.vendors.map(
                                    (vendor) => (
                                        <VendorItem
                                            props={props}
                                            key={vendor._id}
                                            vendor={vendor}
                                        />
                                    )
                                )}
                        </Flex>
                    </Box>
                </Box>
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;
