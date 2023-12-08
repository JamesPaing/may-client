import { Box, HStack, Icon, Image, Input, Pressable, Text } from 'native-base';
import React from 'react';
import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';
import numberWithCommas from '../../utils/thousandSeparater';
import { useAppDispatch } from '../../@redux/hooks';
import { TDeposit } from '../../@types/deposit-types';
import { TWithdrawal } from '../../@types/withdrawal-types';

type WithdrawalHistoryProps = {
    withdrawal: TWithdrawal;
};

const WithdrawalHistoryItem: React.FC<WithdrawalHistoryProps> = ({
    withdrawal,
}) => {
    const dispatch = useAppDispatch();

    return (
        <HStack
            rounded={'sm'}
            flexDir={'row'}
            px="2"
            py={'3'}
            mb={'4'}
            background={'white'}
        >
            <Box
                justifyContent={'center'}
                alignItems={'center'}
                flex={'1'}
                rounded={'sm'}
            >
                <Icon
                    size={'2xl'}
                    color={
                        withdrawal.status === 'approved'
                            ? 'green.500'
                            : 'gray.500'
                    }
                    as={
                        withdrawal.status === 'approved' ? (
                            <Feather name="check-circle" />
                        ) : (
                            <MaterialIcons name="pending" />
                        )
                    }
                />
            </Box>
            <Box p={'2'} flex={'2'}>
                <HStack justifyContent={'space-between'} alignItems={'center'}>
                    <Text fontSize={'md'}># {withdrawal.id}</Text>
                </HStack>
                <HStack
                    mt={'1'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                >
                    {/* <Text mt={'1'} color={'gray.400'}>
                        {deposit.status}
                    </Text> */}
                    <Text color={'gray.500'}>
                        {' '}
                        {new Date(withdrawal.createdAt).toLocaleDateString()}
                    </Text>
                </HStack>
                <HStack
                    mt={' 1'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                >
                    <Text mt={'1'} fontWeight={'bold'} color={'may-black'}>
                        MMK {numberWithCommas(withdrawal.amount)}
                    </Text>
                    <HStack justifyContent={'center'} alignItems={'center'}>
                        <Icon
                            as={
                                withdrawal.status === 'approved' ? (
                                    <Feather name="check-circle" />
                                ) : (
                                    <MaterialIcons name="pending" />
                                )
                            }
                            size={4}
                            mr={'1'}
                            color={'gray.500'}
                        />
                        <Text textTransform={'capitalize'}>
                            {withdrawal.status}
                        </Text>
                    </HStack>
                </HStack>
            </Box>
        </HStack>
    );
};

export default WithdrawalHistoryItem;
