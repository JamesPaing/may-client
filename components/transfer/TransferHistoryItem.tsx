import { Box, HStack, Icon, Image, Input, Pressable, Text } from 'native-base';
import React from 'react';
import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';
import numberWithCommas from '../../utils/thousandSeparater';
import { useAppDispatch } from '../../@redux/hooks';
import { TDeposit } from '../../@types/deposit-types';
import { TWithdrawal } from '../../@types/withdrawal-types';
import { TTransfer } from '../../@types/transfer-types';
import { useAuth } from '../../contexts/useAuth';

type TransferHistoryItemProps = {
    transfer: TTransfer;
};

const TransferHistoryItem: React.FC<TransferHistoryItemProps> = ({
    transfer,
}) => {
    const {
        authData: { user },
    } = useAuth();

    console.log(transfer.transferrer._id, user._id);
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
                        transfer.transferrer._id === user._id
                            ? 'green.500'
                            : 'gray.500'
                    }
                    as={
                        transfer.transferrer._id === user._id ? (
                            <Feather name="arrow-up" />
                        ) : (
                            <Feather name="arrow-down" />
                        )
                    }
                />
            </Box>
            <Box p={'2'} flex={'2'}>
                <HStack justifyContent={'space-between'} alignItems={'center'}>
                    <Text fontSize={'md'}># {transfer.id}</Text>
                </HStack>
                <HStack
                    mt={'1'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                >
                    <Text color={'gray.500'}>
                        {' '}
                        {new Date(transfer.createdAt).toLocaleDateString()}
                    </Text>
                    <HStack justifyContent={'center'} alignItems={'center'}>
                        <Icon
                            as={
                                transfer.transferrer._id === user._id ? (
                                    <Feather name="arrow-up" />
                                ) : (
                                    <Feather name="arrow-down" />
                                )
                            }
                            size={4}
                            mr={'1'}
                            color={
                                transfer.transferrer._id === user._id
                                    ? 'green.500'
                                    : 'red.500'
                            }
                        />
                        <Text textTransform={'capitalize'}>
                            {transfer.transferrer._id === user._id
                                ? 'transferred'
                                : 'received'}
                        </Text>
                    </HStack>
                </HStack>
                <HStack
                    mt={' 1'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                >
                    <Text mt={'1'} fontWeight={'bold'} color={'may-black'}>
                        MMK {numberWithCommas(transfer.amount)}
                    </Text>
                    <HStack justifyContent={'center'} alignItems={'center'}>
                        <Icon
                            as={
                                transfer.status === 'completed' ? (
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
                            {transfer.status}
                        </Text>
                    </HStack>
                </HStack>
            </Box>
        </HStack>
    );
};

export default TransferHistoryItem;
