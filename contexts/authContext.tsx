import { useLazyQuery, useMutation } from '@apollo/client';
import React, { createContext, useState, useContext, useEffect } from 'react';
import { LOGIN, REGISTER } from '../@apollo/queries/auth-query';
import * as SecureStore from 'expo-secure-store';
import { GET_USER } from '../@apollo/queries/user-query';
import { Heading, VStack, useToast, Text } from 'native-base';
import ToastAlert from '../components/layouts/ToastAlert';

export type AuthContextData = {
    authData?: AuthData;
    setAuthData: any;
    loading: boolean;
    signIn(email: string, password: string): Promise<void>;
    signUp(
        name: string,
        contact: string,
        password: string,
        passwordConfirmation: string
    ): Promise<void>;
    signOut(): void;
};

type AuthData = {
    token: string;
    isAuth: boolean;
    user: any;
    email: string;
    name: string;
};

type ContainerProps = {
    children: React.ReactNode; //👈 children prop typr
};

export const AuthContext = createContext<AuthContextData>(
    {} as AuthContextData
);

export const AuthProvider: React.FC<ContainerProps> = ({ children }) => {
    const toast = useToast();
    const [authData, setAuthData] = useState<AuthData>();
    const [login] = useMutation(LOGIN);
    const [register] = useMutation(REGISTER);
    const [getUser] = useLazyQuery(GET_USER);

    //The loading part will be explained in the persist step session
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        //Every time the App is opened, this provider is rendered
        //and call de loadStorageData function.
        loadStorageData();
    }, []);

    async function loadStorageData(): Promise<void> {
        try {
            //Try get the data from Async Storage
            const authDataSerialized = await SecureStore.getItemAsync(
                'may-user'
            );
            if (authDataSerialized) {
                //If there are data, it's converted to an Object and the state is updated.
                const _authData: AuthData = JSON.parse(authDataSerialized);

                const updatedUser = await getUser({
                    variables: {
                        _id: _authData.user._id,
                    },
                });

                if (updatedUser && updatedUser.data) {
                    setAuthData({
                        ..._authData,
                        user: updatedUser.data.getUser,
                    });
                } else {
                    setAuthData(_authData);
                }
            }
        } catch (error) {
        } finally {
            //loading finished
            setLoading(false);
        }
    }

    const signIn = async (contact: string, password: string) => {
        setLoading(true);

        const { data, errors } = await login({
            variables: { credentials: { contact, password } },
            onError: (err: any) => {
                let msg = JSON.stringify(err).includes('password')
                    ? 'Invalid email or password, please try again.'
                    : 'Something went wrong or network connection failure.';
            },
        });

        if (data?.login) {
            setAuthData(data?.login);

            toast.show({
                title: 'Success!',
                description: 'Login success!',
                placement: 'top',
                render: () => (
                    <VStack
                        opacity={'0.8'}
                        background={'gray.500'}
                        m={'4'}
                        p="4"
                        rounded={'sm'}
                        shadow={'1'}
                    >
                        <Text color={'white'}>
                            Welcome, You've successfully logged in.
                        </Text>
                    </VStack>
                ),
            });

            await SecureStore.setItemAsync(
                'may-user',
                JSON.stringify(data?.login)
            );
        }

        setLoading(false);
    };

    const signUp = async (
        name: string,
        contact: string,
        password: string,
        passwordConfirmation: string
    ) => {
        setLoading(true);

        const { data, errors } = await register({
            variables: {
                credentials: { name, password, passwordConfirmation, contact },
            },
            onError: (err: any) => {
                let msg = JSON.stringify(err).includes('password')
                    ? 'Invalid email or password, please try again.'
                    : 'Something went wrong or network connection failure.';
            },
        });

        if (data?.register) {
            setAuthData(data?.register);

            await SecureStore.setItemAsync(
                'may-user',
                JSON.stringify(data?.register)
            );
        }

        setLoading(false);
    };

    const signOut = async () => {
        setLoading(true);
        setAuthData(undefined);
        await SecureStore.deleteItemAsync('may-user');
        setLoading(false);
    };

    return (
        <AuthContext.Provider
            value={{ authData, setAuthData, loading, signIn, signOut, signUp }}
        >
            {children}
        </AuthContext.Provider>
    );
};
