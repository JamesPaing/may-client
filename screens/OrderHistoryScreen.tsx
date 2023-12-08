import React, { useEffect } from 'react';
import Wrapper from '../components/layouts/Wrapper';
import { Box, Icon, Pressable, Text } from 'native-base';
import { useAuth } from '../contexts/useAuth';
import { AntDesign } from '@expo/vector-icons';
import { useQuery } from '@apollo/client';
import { GET_ORDER_HISTORY } from '../@apollo/queries/order-query';
import OrderHistoryItem from '../components/home/OrderHistoryItem';
import Loading from '../components/layouts/Loading';

const OrderHistoryScreen = (props) => {
    const { authData } = useAuth();

    const { data, error, loading, refetch } = useQuery(GET_ORDER_HISTORY, {
        variables: {
            userId: authData?.user?._id || null,
            queryString: {
                limit: '2',
            },
        },
    });

    const onLoadMoreHandler = () => {
        refetch({
            userId: authData?.user?._id || null,
            queryString: {
                limit: String(data.getOrderHistory.length + 2),
            },
        });
    };

    if (loading) {
        return <Loading />;
    }

    if (data?.getOrderHistory?.length <= 0) {
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

    console.log(data);
    return (
        <Wrapper>
            {data.getOrderHistory.length > 0
                ? data.getOrderHistory.map((item) => (
                      <OrderHistoryItem
                          props={props}
                          item={item}
                          key={item.ref}
                      />
                  ))
                : null}
            <Box mt="1" justifyContent={'center'} alignItems={'center'}>
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
        </Wrapper>
    );
};

export default OrderHistoryScreen;
