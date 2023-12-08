import {
    Box,
    Divider,
    HStack,
    Icon,
    Pressable,
    ScrollView,
    Text,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../@redux/hooks';
import { SafeAreaView } from 'react-native';
import CartItem from '../components/home/CartItem';
import { AntDesign } from '@expo/vector-icons';
import numberWithCommas from '../utils/thousandSeparater';
import { addGrandTotal } from '../@redux/cartSlice';

const CartScreen = (props) => {
    const dispatch = useAppDispatch();
    const { items, subtotal } = useAppSelector((state) => state.cart);
    const [service, setService] = useState(200);
    const [taxAmount, setTaxAmount] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);
    const taxPercent = 3;

    useEffect(() => {
        if (items.length > 0) {
            const amount = (subtotal * taxPercent) / 100;

            setTaxAmount(amount);

            setGrandTotal(subtotal + amount + service);
        } else {
            setGrandTotal(0);
            setTaxAmount(0);
        }
    }, [items.length, subtotal]);

    const proceedToCheckOutHandler = () => {
        if (items.length <= 0) return null;

        dispatch(addGrandTotal(grandTotal));

        props.navigation.navigate('OrderScreen');
    };

    if (items.length <= 0) {
        return (
            <Box
                w={'100%'}
                h={'100%'}
                justifyContent={'center'}
                alignItems={'center'}
                flexDir={'row'}
            >
                <Icon
                    mr={'2'}
                    size={'md'}
                    as={<AntDesign name="exclamationcircleo" />}
                />
                <Text fontSize={'md'}>
                    Empty, there is no item in the cart yet.
                </Text>
            </Box>
        );
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
                    {items.length > 0
                        ? items.map((item) => (
                              <CartItem item={item} key={item._id} />
                          ))
                        : null}
                    {/* Subtotal */}
                    <HStack pt={'2'} pb={'4'} mt={'1'}>
                        <Box w={'25%'}>
                            <Text>Subtotal</Text>
                        </Box>
                        <Box w="5%">
                            <Text>:</Text>
                        </Box>
                        <Box>
                            <Text>MMK {numberWithCommas(subtotal)}</Text>
                        </Box>
                    </HStack>
                    <Divider bg={'blue.200'} />
                    {/* Service */}
                    <HStack pt={'2'} pb={'4'} mt={'1'}>
                        <Box w={'25%'}>
                            <Text>Service</Text>
                        </Box>
                        <Box w="5%">
                            <Text>:</Text>
                        </Box>
                        <Box>
                            <Text>MMK {numberWithCommas(service)}</Text>
                        </Box>
                    </HStack>
                    {/* Tax */}
                    <HStack pb={'4'}>
                        <Box w={'25%'}>
                            <Text>Tax</Text>
                        </Box>
                        <Box w="5%">
                            <Text>:</Text>
                        </Box>
                        <Box>
                            <Text>
                                MMK {numberWithCommas(taxAmount)} ({taxPercent}
                                %)
                            </Text>
                        </Box>
                    </HStack>
                    <Divider bg={'blue.200'} />
                    {/* Grand total */}
                    <HStack pt={'2'} pb={'4'} mt={'1'}>
                        <Box justifyContent={'center'} w={'25%'}>
                            <Text>Grand Total</Text>
                        </Box>
                        <Box justifyContent={'center'} w="5%">
                            <Text>:</Text>
                        </Box>
                        <Box justifyContent={'center'}>
                            <Text fontWeight={'bold'} fontSize={'lg'}>
                                MMK {numberWithCommas(grandTotal)}
                            </Text>
                        </Box>
                        <Pressable
                            ml={'4'}
                            flexDir={'row'}
                            background={'blue.600'}
                            alignItems={'center'}
                            justifyContent={'center'}
                            px={'3'}
                            py={'3'}
                            rounded={'sm'}
                            onPress={proceedToCheckOutHandler}
                        >
                            <Icon
                                as={<AntDesign name={'check'} />}
                                size={5}
                                color="white"
                            />
                            <Text fontWeight={'bold'} ml={'2'} color={'white'}>
                                Check Out
                            </Text>
                        </Pressable>
                    </HStack>
                </Box>
            </ScrollView>
        </SafeAreaView>
    );
};

export default CartScreen;
