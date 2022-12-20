// import { FontAwesome } from "@expo/vector-icons";
//import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs"
import {NavigationContainer, DefaultTheme, DarkTheme, TabActions,} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { useState } from "react";
import { ColorSchemeName, Pressable } from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import NotFoundScreen from "../screens/NotFoundScreen";
import { getToken } from "../components/userTokenManager";
import BookMatchingScreen from "../screens/BookMatchingScreen";
import AddBooksScreen from "../screens/AddBooksScreen";
import MyPageScreen from "../screens/MyPageScreen";
import MatchScreen from "../screens/MatchScreen";
import LoginScreen from "../screens/LoginScreen";
import CreateAccountScreen from "../screens/CreatAccountScreen";
import ConfirmExchange from "../components/ConfirmExchange";
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from "../types";
import { AuthProvider } from "../hooks/useAuth";
import { BottomNavigation, Provider, BottomNavigationProps, Text } from "react-native-paper";
// import LinkingConfiguration from "./LinkingConfiguration";
import Icon from "react-native-vector-icons/FontAwesome5";
import { BottomTabBarButtonProps, BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";

function LogoTitle() {
  return (
    <Image
      style={{ width: 60, height: 60, justifyContent: 'center',alignItems: 'center',resizeMode:'contain', alignSelf:"center"}}
      source={require('../assets/images/logo-transparent.png')}
    />
  );
}

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  return (
    <Provider>
      <NavigationContainer
        theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      // linking={LinkingConfiguration}
      >
        <AuthProvider 
          setAuthenticated={setAuthenticated}
          authenticated={authenticated}
        >
          <RootNavigator/>
        </AuthProvider>
      </NavigationContainer>
    </Provider>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#E7C7B2',
      },
      headerTitleAlign: 'center'
      // headerTintColor: '#fff',
      // headerTitleStyle: {
      //   fontWeight: 'bold',
      // },
    }} >
      {getToken()!==null?(
        <>
          <Stack.Screen
            name="Book x Change"
            component={BottomTabNavigator}
            options={{ headerShown: true, headerTitle: (props) => <LogoTitle {...props} /> }}
          />
          <Stack.Screen
            name="ConfirmExchange"
            component={ConfirmExchange}
            options={{ title: 'Confirm exchange' }}
          />
        </>
        ):(
        <>
          <Stack.Screen 
              name="Login" 
              component={LoginScreen} 
              options={{title: 'Sign in', headerShown: false}} 
          />
          <Stack.Screen 
              name="CreateAccount" 
              component={CreateAccountScreen} 
              options={{title: 'Create a new account', headerShown: false}} 
          />
         </> 
        )}
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

//the nav bar at the bottom is this


const BottomTab = createMaterialBottomTabNavigator<BottomTabBarProps>();


function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  

  return (
    <BottomTab.Navigator
      initialRouteName="FindBookTab" 
      activeColor="white"
      inactiveColor="white"
      labelStyle={{ fontSize: 20 }}
      screenOptions={{
        tabBarColor: '#e89064',
       // taBarStyle: { height: 400}
        //tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
      
            
    >
      <BottomTab.Screen
        name="FindBookTab"
        component={BookMatchingScreen}
        options={({
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => {
            return <Icon name="home" color={color} size={25}/>
          }
          
        })}
      />
      <BottomTab.Screen
        name="AddBookTab"
        component={AddBooksScreen}
        options={{
          tabBarLabel: "Add a Book",
          tabBarIcon: ({ color }) => {
            return <Icon name="plus-circle" color={color} size={24} />
          }
        }}
      />
      <BottomTab.Screen
        name="MyPageTab"
        component={MyPageScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => {
            return <Icon name="user-alt" color={color} size={25}/>
          }
        }}
      />
      <BottomTab.Screen
        name="MatchTab"
        component={MatchScreen}
        options={{
          title: "X Change",
          tabBarIcon: ({ color }) => {
            return <Icon name="book" color={color} size={25}/>
          }
        }}
      />

    </BottomTab.Navigator>
    
  );

  
}


/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
// function TabBarIcon(props: {
//   name: React.ComponentProps<typeof FontAwesome>["name"];
//   color: string;
// }) {
//   return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
// }
