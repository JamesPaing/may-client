import { Box, Button, Radio, Text } from 'native-base';
import React, { useState } from 'react';
import { useAuth } from '../../contexts/useAuth';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

type LocationChooseProps = {
    locationValue: any;
    setLocationValue: any;
    coordinates: any;
    setCoordinates: any;
};

const LocationChoose: React.FC<LocationChooseProps> = ({
    locationValue,
    coordinates,
    setCoordinates,
    setLocationValue,
}) => {
    const {
        authData: { user },
    } = useAuth();

    const [isFetching, setIsFetching] = useState(false);

    const onUpdateLocation = async () => {
        setIsFetching(true);

        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});

        setCoordinates([location?.coords.longitude, location?.coords.latitude]);

        setIsFetching(false);
    };

    return (
        <>
            <Text mt={'8'} fontSize={'md'} fontWeight={'bold'}>
                Location Choose
            </Text>
            <Box mt={'2'}>
                <Radio.Group
                    name="myRadioGroup"
                    accessibilityLabel="favorite number"
                    value={locationValue}
                    onChange={(nextValue) => {
                        setLocationValue(nextValue);
                    }}
                >
                    <Radio colorScheme={'red'} size={'sm'} value={'1'} my={2}>
                        My Address
                    </Radio>
                    <Radio colorScheme={'red'} size={'sm'} value={'2'} my={2}>
                        My Location
                    </Radio>
                </Radio.Group>
            </Box>
            {locationValue === '1' && (
                <Box mt={'4'}>
                    <Text>{user.address}</Text>
                </Box>
            )}
            {locationValue === '2' && (
                <>
                    <Button onPress={onUpdateLocation} my={'4'}>
                        Update My Location
                    </Button>
                    <Box h={'200'}>
                        <MapView
                            region={{
                                latitude: coordinates[1] || 16.8409,
                                longitude: coordinates[0] || 96.1735,
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
                                    latitude: coordinates[1] || 16.8409,
                                    longitude: coordinates[0] || 96.1735,
                                }}
                                title="Your address"
                                description={'Hellow Worlld'}
                                // pinColor={Colors.primary}
                            />
                        </MapView>
                    </Box>
                </>
            )}
        </>
    );
};

export default LocationChoose;
