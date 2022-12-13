import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyPageScreen from '../screens/MyPageScreen';

const Stack = createStackNavigator();

export default function MyPageStack () {

    return (
        <Stack.Navigator>
            <Stack.Screen  name='MyPageScreen'  component={MyPageScreen}/>
        </Stack.Navigator>
    )
}