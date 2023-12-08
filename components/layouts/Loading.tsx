import { Flex, Heading, HStack, Spinner } from 'native-base';
import React from 'react';

const Loading = () => {
    return (
        <Flex flex={1} justifyContent="center" alignItems={'center'}>
            <HStack space={2} justifyContent="center">
                <Spinner
                    color={'may-primary'}
                    accessibilityLabel="Loading posts"
                />
                <Heading color="gray.600" fontSize="md">
                    Loading
                </Heading>
            </HStack>
        </Flex>
    );
};

export default Loading;
