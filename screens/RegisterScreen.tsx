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

const RegisterScreen = (props) => {
    const [name, setName] = React.useState('');
    const [contact, setContact] = React.useState('');
    const [passwordConfirmation, setPasswordConfirmation] = React.useState('');
    const [password, setPassword] = React.useState('');

    const { signUp, loading } = useAuth();

    const onChangeHandler = (val: string, name: string) => {
        switch (name) {
            case 'name':
                setName(val);
                break;
            case 'contact':
                setContact(val);
                break;
            case 'password':
                setPassword(val);
                break;
            case 'passwordConfirmation':
                setPasswordConfirmation(val);
                break;
            default:
                break;
        }
    };

    const onSignUpHandler = async () => {
        // @ts-ignore
        await signUp(name, contact, password, passwordConfirmation);
    };

    return (
        <Flex flex={1} justifyContent={'center'} alignItems="center">
            <FormControl justifyContent={'center'} alignItems="center" mb="5">
                <Text fontWeight={'bold'} fontSize={'2xl'} pt={3}>
                    Sign Up
                </Text>
                <Input
                    style={{
                        backgroundColor: 'white',
                    }}
                    w={'80%'}
                    autoCapitalize={'none'}
                    value={`${name}`}
                    type="text"
                    placeholder={'Name'}
                    mb={'4'}
                    mt={'4'}
                    size={'md'}
                    onChangeText={(val) => {
                        onChangeHandler(val, 'name');
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
                                as={<MaterialIcons name="person" />}
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
                    value={`${contact}`}
                    type="text"
                    placeholder={'Phone Number'}
                    mb={'4'}
                    mt={'4'}
                    size={'md'}
                    onChangeText={(val) => {
                        onChangeHandler(val.replace(/[^0-9]/g, ''), 'contact');
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
                <Input
                    style={{
                        backgroundColor: 'white',
                    }}
                    w={'80%'}
                    autoCapitalize={'none'}
                    value={`${passwordConfirmation}`}
                    type="password"
                    placeholder={'Repeat Password'}
                    mb={'4'}
                    mt={'4'}
                    size={'md'}
                    onChangeText={(val) => {
                        onChangeHandler(val, 'passwordConfirmation');
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
                    onPress={onSignUpHandler}
                >
                    <Text py={1} color="white">
                        Register
                    </Text>
                </Button>
                <Button
                    background={'may-secondary'}
                    w="80%"
                    mt={'4'}
                    onPress={() => props.navigation.navigate('LoginScreen')}
                >
                    <Text py={1} color="black">
                        Log In
                    </Text>
                </Button>
                <Spinner visible={loading} />
            </FormControl>
        </Flex>
    );
};

export default RegisterScreen;
