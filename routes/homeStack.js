import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Headers from '../components/header';
import Home from '../screens/home';
import React from 'react';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); 
const screens = {
    Home :  {
        screen: Home,
        navigationOptions:  ({navigation}) => {
            return  {
                headerTitle: () => <Headers navigation={navigation} title="Weather Forcast"/>
            }
        }
           
    }
}


const homeStack = createStackNavigator(screens,{
    defaultNavigationOptions: {
        headerStyle: {height:60,backgroundColor:"#062b3d"}
    }
});

const AppContainer = createAppContainer(homeStack);
export default AppContainer;