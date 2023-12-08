import { NavigationContainer } from '@react-navigation/native';
import { Text } from 'native-base';
import Loading from './components/layouts/Loading';
import { useAuth } from './contexts/useAuth';
import AppDrawer from './navigations/AppDrawer';
import AuthStack from './navigations/AuthStack';

export const Router = () => {
    const { authData, loading } = useAuth();

    if (loading) {
        //You can see the component implementation at the repository
        return <Loading />;
    }

    return (
        <NavigationContainer>
            {authData ? <AppDrawer /> : <AuthStack />}
        </NavigationContainer>
    );
};
