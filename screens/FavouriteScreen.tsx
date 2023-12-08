import React from 'react';
import Wrapper from '../components/layouts/Wrapper';
import { Text, Box } from 'native-base';
import { useAuth } from '../contexts/useAuth';
import { GET_ALL_FAVOURITE_ITEMS } from '../@apollo/queries/user-query';
import { useQuery } from '@apollo/client';
import Loading from '../components/layouts/Loading';
import FavouriteItem from '../components/favourite/FavouriteItem';
import { useDidMountEffect } from '../hooks/useDidMountEffect';

const FavouriteScreen = (props) => {
    const {
        authData: { user },
    } = useAuth();

    const { data, error, loading } = useQuery(GET_ALL_FAVOURITE_ITEMS, {
        variables: {
            _id: user?._id || null,
        },
        fetchPolicy: 'cache-and-network',
    });

    if (loading) {
        return <Loading />;
    }

    return (
        <Wrapper>
            {data?.getAllFavouriteItems.map((item) => (
                <FavouriteItem
                    navigation={props.navigation}
                    item={item}
                    key={item._id}
                />
            ))}
        </Wrapper>
    );
};

export default FavouriteScreen;
