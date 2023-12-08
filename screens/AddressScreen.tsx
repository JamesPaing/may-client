import {
    Box,
    Button,
    FormControl,
    Text,
    TextArea,
    useToast,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import Wrapper from '../components/layouts/Wrapper';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../@apollo/queries/user-query';
import { useAuth } from '../contexts/useAuth';
import ToastAlert from '../components/layouts/ToastAlert';

const AddressScreen = () => {
    const {
        authData: { user },
        setAuthData,
    } = useAuth();
    const toast = useToast();
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [address, setAddress] = useState(user.address || '');
    const [updateUser] = useMutation(UPDATE_USER);

    useEffect(() => {
        (async () => {
            setIsLoading(true);

            let { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});

            setLocation(location);

            setIsLoading(false);
        })();
    }, []);

    const onSaveHandler = async () => {
        // prepare the obj
        const obj = {
            location: {
                type: 'Point',
                coordinates: [
                    location?.coords?.longitude || 0,
                    location?.coords?.latitude || 0,
                ],
            },
            address,
        };

        const { data, errors } = await updateUser({
            variables: {
                _id: user._id || null,
                user: obj,
            },
        });

        if (data?.updateUser) {
            setAuthData((prev) => {
                const { user } = prev;
                const newUser = {
                    ...user,
                    address: data?.updateUser.address,
                    location: data?.updateUser.location,
                };

                return {
                    ...prev,
                    user: newUser,
                };
            });

            toast.show({
                title: 'Success!',
                description: 'Successfully submitted the order',
                placement: 'bottom',
                render: () => (
                    <ToastAlert
                        status="success"
                        title="Sucessfully saved your location."
                    />
                ),
            });
        }
    };

    return (
        <Wrapper>
            <Box height={'50%'}>
                <MapView
                    region={{
                        latitude: location?.coords?.latitude || 16.8409,
                        longitude: location?.coords?.longitude || 96.1735,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                    }}
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <Marker
                        draggable
                        onDragEnd={(e) => {
                            console.log(e.nativeEvent);
                            //   const { latitude, longitude } = e.nativeEvent.coordinate
                            //   updateLocation(latitude, longitude)
                        }}
                        coordinate={{
                            latitude: location?.coords?.latitude || 16.8409,
                            longitude: location?.coords?.longitude || 96.1735,
                        }}
                        title="Your address"
                        description={'Hellow Worlld'}
                        // pinColor={Colors.primary}
                    />
                </MapView>
                {isLoading ? (
                    <Box
                        opacity={'0.8'}
                        my={'4'}
                        rounded={'sm'}
                        shadow={'1'}
                        p="4"
                        background={'gray.500'}
                    >
                        <Text color={'white'} textAlign={'center'}>
                            Fetching your coordinates...
                        </Text>
                    </Box>
                ) : null}
                <FormControl mt={'4'}>
                    <TextArea
                        mb={'1'}
                        h={20}
                        placeholder="Address (Optional)..."
                        fontSize={'sm'}
                        value={address}
                        autoCompleteType={undefined}
                        onChangeText={(text) => setAddress(text)}
                    />
                    <Button
                        background={'blue.600'}
                        w="100%"
                        mt={'4'}
                        onPress={onSaveHandler}
                    >
                        <Text py={1} color="white">
                            Save
                        </Text>
                    </Button>
                </FormControl>
            </Box>
        </Wrapper>
    );
};

export default AddressScreen;
