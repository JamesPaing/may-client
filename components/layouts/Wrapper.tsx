import { Box, ScrollView } from 'native-base';
import React from 'react';
import { SafeAreaView } from 'react-native';

const Wrapper = ({ children }) => {
    return (
        <SafeAreaView
            style={{
                flex: 1,
                height: '100%',
                width: '100%',
            }}
        >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
                w={'full'}
                h={'full'}
            >
                <Box
                    flex={'1'}
                    padding={'4'}
                    height={'100%'}
                    width={'100%'}
                    background={'gray.100'}
                >
                    {children}
                </Box>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Wrapper;
