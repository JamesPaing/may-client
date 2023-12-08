import { Box, HStack, Icon, Image, Input, Pressable, Text } from 'native-base';
import React from 'react';
import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';
import numberWithCommas from '../../utils/thousandSeparater';
import { useAppDispatch } from '../../@redux/hooks';
import { TDeposit } from '../../@types/deposit-types';

type DepositHistoryItemProps = {
    deposit: TDeposit;
};

const DepositHistoryItem: React.FC<DepositHistoryItemProps> = ({ deposit }) => {
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
                        deposit.status === 'approved' ? 'green.500' : 'gray.500'
                    }
                    as={
                        deposit.status === 'approved' ? (
                            <Feather name="check-circle" />
                        ) : (
                            <MaterialIcons name="pending" />
                        )
                    }
                />
            </Box>
            <Box p={'2'} flex={'2'}>
                <HStack justifyContent={'space-between'} alignItems={'center'}>
                    <Text fontSize={'md'}># {deposit.id}</Text>
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
                        {new Date(deposit.createdAt).toLocaleDateString()}
                    </Text>
                </HStack>
                <HStack
                    mt={' 1'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                >
                    <Text mt={'1'} fontWeight={'bold'} color={'may-black'}>
                        MMK {numberWithCommas(deposit.amount)}
                    </Text>
                    <HStack justifyContent={'center'} alignItems={'center'}>
                        <Icon
                            as={
                                deposit.status === 'approved' ? (
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
                            {deposit.status}
                        </Text>
                    </HStack>
                </HStack>
            </Box>
        </HStack>
    );
};

export default DepositHistoryItem;
