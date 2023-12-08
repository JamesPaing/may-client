import React from 'react';
import Wrapper from '../components/layouts/Wrapper';
import { useQuery } from '@apollo/client';
import { GET_ORDER } from '../@apollo/queries/order-query';
import { Box } from 'native-base';
import MapView, { Marker } from 'react-native-maps';
import Loading from '../components/layouts/Loading';
import MapViewDirections from 'react-native-maps-directions';

interface OrderDetailScreenProps {
    route: any;
}

const OrderDetailScreen: React.FC<OrderDetailScreenProps> = ({ route }) => {
    const { orderId } = route.params;

    const { data, error, loading } = useQuery(GET_ORDER, {
        variables: {
            _id: orderId,
        },
    });

    if (loading) {
        return <Loading />;
    }

    return (
        <Wrapper>
            <Box h={'50%'}>
                <MapView
                    region={{
                        latitude:
                            data?.getOrder?.location?.coordinates[1] || 16.8409,
                        longitude:
                            data?.getOrder?.location?.coordinates[0] || 96.1735,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                    }}
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <MapViewDirections
                        origin={{
                            latitude: 16.8108,
                            longitude: 96.1766,
                        }}
                        destination={{
                            latitude: 16.7827,
                            longitude: 96.1858,
                        }}
                        apikey={'AIzaSyDmDWNsuzSrEvOEmLZjhS-2ylBS4S2UuXo'}
                    />
                </MapView>
            </Box>
        </Wrapper>
    );
};

export default OrderDetailScreen;
