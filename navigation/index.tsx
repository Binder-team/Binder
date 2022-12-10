// import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {NavigationContainer, DefaultTheme, DarkTheme,} from "@react-navigation/native";
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
import MessagesScreen from "../screens/MessagesScreen";
import LoginScreen from "../screens/LoginScreen";
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from "../types";
import useAuth, { AuthProvider } from "../hooks/useAuth";
// import LinkingConfiguration from "./LinkingConfiguration";

//import { AuthProvider } from "./AuthProvider";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  return (
    <AuthProvider>
    <NavigationContainer
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    // linking={LinkingConfiguration}
    >
      <AuthProvider 
        setAuthenticated={setAuthenticated}
      >
        <RootNavigator />
      </AuthProvider>
    </NavigationContainer>
    </AuthProvider>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  

  return (
    <Stack.Navigator >
      {getToken()!==null?(
        <>
          <Stack.Screen
            name="Root"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
        </>
        ):(
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{title: 'Sign in'}} 
          />
        )}
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

//the nav bar at the bottom is this


const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="FindBookTab"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="FindBookTab"
        component={BookMatchingScreen}
        options={({ navigation }: RootTabScreenProps<"FindBookTab">) => ({
          title: "Find a book",
          // tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("Messages")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              {/* <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              /> */}
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="AddBookTab"
        component={AddBooksScreen}
        options={{
          title: "Add a book",
          // tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="MyPageTab"
        component={MyPageScreen}
        options={{
          title: "My Page",
          // tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      {/* <BottomTab.Screen
        name="LoginTab"
        component={LoginScreen}
        options={{
          title: "Login Page",
        }}
      /> */}
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
