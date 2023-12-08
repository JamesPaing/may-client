import React, { useEffect } from 'react';
import Wrapper from '../components/layouts/Wrapper';
import { Box, HStack, Heading, Icon, Pressable, Text } from 'native-base';
import { useAuth } from '../contexts/useAuth';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useQuery } from '@apollo/client';
import { GET_ORDER_HISTORY } from '../@apollo/queries/order-query';
import OrderHistoryItem from '../components/home/OrderHistoryItem';
import Loading from '../components/layouts/Loading';
import { GET_DEPOSIT_HISTORY } from '../@apollo/queries/deposit-query';
import DepositHistoryItem from '../components/deposit/DepositHistoryItem';
import { GET_WITHDRAWAL_HISTORY } from '../@apollo/queries/withdrawal-query';
import WithdrawalHistoryItem from '../components/withdrawal/WithdrawalHistoryItem';
import { GET_TRANSFER_HISTORY } from '../@apollo/queries/transfer-query';
import TransferHistoryItem from '../components/transfer/TransferHistoryItem';

const TransferHistoryScreen = (props) => {
    const { authData } = useAuth();

    const { data, error, loading, refetch } = useQuery(GET_TRANSFER_HISTORY, {
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
                limit: String(data.getTransferHistory.length + 2),
            },
        });
    };

    if (loading) {
        return <Loading />;
    }

    if (data?.getTransferHistory?.length <= 0) {
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
        <Wrapper>
            <HStack
                mb={'4'}
                justifyContent={'space-between'}
                alignItems={'center'}
            >
                <Heading size={'md'}>Transfer History</Heading>
                <Pressable
                    flexDirection={'row'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    onPress={() => props.navigation.goBack()}
                >
                    <Icon mr={'1'} as={<MaterialIcons name="arrow-back" />} />
                    <Heading ml={'1'} size={'xs'}>
                        Go Back
                    </Heading>
                </Pressable>
            </HStack>
            {data?.getTransferHistory?.length > 0
                ? data.getTransferHistory.map((item) => (
                      <TransferHistoryItem transfer={item} key={item._id} />
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

export default TransferHistoryScreen;
