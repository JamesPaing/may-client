import { useMutation, useQuery } from '@apollo/client';
import {
    Button,
    Flex,
    FormControl,
    HStack,
    Icon,
    Input,
    Text,
} from 'native-base';
import React from 'react';
import { LOGIN } from '../@apollo/queries/auth-query';
import { useAuth } from '../contexts/useAuth';
import Spinner from 'react-native-loading-spinner-overlay';
import { GET_ALL_USERS } from '../@apollo/queries/user-query';
import { MaterialIcons } from '@expo/vector-icons';

const LoginScreen = (props) => {
    const [contact, setContact] = React.useState('');
    const [password, setPassword] = React.useState('');

    const { signIn, loading } = useAuth();

    const onChangeHandler = (val: string, name: string) => {
        if (name == 'contact') {
            setContact(val);
        } else if (name == 'password') {
            setPassword(val);
        } else {
            return;
        }
    };

    const onLoginHandler = async () => {
        // @ts-ignore
        await signIn(contact, password);
    };

    return (
        <Flex flex={1} justifyContent={'center'} alignItems="center">
            <FormControl justifyContent={'center'} alignItems="center" mb="5">
                <Text fontWeight={'bold'} fontSize={'2xl'} pt={3}>
                    Sign In
                </Text>
                <Input
                    style={{
                        backgroundColor: 'white',
                    }}
                    w={'80%'}
                    autoCapitalize={'none'}
                    value={`${contact}`}
                    type="text"
                    placeholder={'Contact'}
                    mb={'4'}
                    mt={'4'}
                    size={'md'}
                    onChangeText={(val) => {
                        onChangeHandler(val, 'contact');
                    }}
                    leftElement={
                        <HStack
                            px={'2'}
                            alignItems={'center'}
                            h="full"
                            bg={'white'}
                        >
                            <Icon
                                size={'5'}
                                as={<MaterialIcons name="phone-android" />}
                            />
                        </HStack>
                    }
                />
                <Input
                    style={{
                        backgroundColor: 'white',
                    }}
                    w={'80%'}
                    autoCapitalize={'none'}
                    value={`${password}`}
                    type="password"
                    placeholder={'Password'}
                    mb={'4'}
                    mt={'4'}
                    size={'md'}
                    onChangeText={(val) => {
                        onChangeHandler(val, 'password');
                    }}
                    leftElement={
                        <HStack
                            px={'2'}
                            alignItems={'center'}
                            h="full"
                            bg={'white'}
                        >
                            <Icon
                                size={'5'}
                                as={<MaterialIcons name="vpn-key" />}
                            />
                        </HStack>
                    }
                />
                <Button
                    background={'may-primary'}
                    w="80%"
                    mt={'4'}
                    onPress={onLoginHandler}
                >
                    <Text py={1} color="white">
                        Login
                    </Text>
                </Button>
                <Button
                    background={'may-secondary'}
                    w="80%"
                    mt={'4'}
                    onPress={() => props.navigation.navigate('RegisterScreen')}
                >
                    <Text py={1} color="black">
                        Register
                    </Text>
                </Button>
                <Spinner visible={loading} />
            </FormControl>
        </Flex>
    );
};

export default LoginScreen;
