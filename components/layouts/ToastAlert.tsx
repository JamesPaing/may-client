import {
    HStack,
    VStack,
    Alert,
    IconButton,
    CloseIcon,
    Text,
} from 'native-base';
import React from 'react';

interface ToastAlertProps {
    status: string;
    title: string;
}

const ToastAlert: React.FC<ToastAlertProps> = ({ status, title }) => {
    return (
        <Alert variant={'top-accent'} w="100%" status={status}>
            <VStack space={2} flexShrink={1} w="100%">
                <HStack
                    w={'100%'}
                    flexShrink={1}
                    space={2}
                    justifyContent="space-between"
                >
                    <HStack
                        w={'72'}
                        space={2}
                        flexShrink={1}
                        justifyContent={'center'}
                        alignItems={'flex-start'}
                    >
                        <Alert.Icon mt="1" />
                        <Text fontSize="md" color="coolGray.800">
                            {title}
                        </Text>
                    </HStack>
                </HStack>
            </VStack>
        </Alert>
    );
};

export default ToastAlert;
