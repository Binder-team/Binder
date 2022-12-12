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
import MatchScreen from "../screens/MatchScreen";
import LoginScreen from "../screens/LoginScreen";
import CreateAccountScreen from "../screens/CreatAccountScreen";
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from "../types";
import { AuthProvider } from "../hooks/useAuth";
// import LinkingConfiguration from "./LinkingConfiguration";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  return (
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
        <>
          <Stack.Screen 
              name="Login" 
              component={LoginScreen} 
              options={{title: 'Sign in'}} 
          />
          <Stack.Screen 
              name="CreateAccount" 
              component={CreateAccountScreen} 
              options={{title: 'Create a new account'}} 
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
        })}
      />
      <BottomTab.Screen
        name="AddBookTab"
        component={AddBooksScreen}
        options={{
          title: "Add a book",
        }}
      />
      <BottomTab.Screen
        name="MyPageTab"
        component={MyPageScreen}
        options={{
          title: "My Page"
        }}
      />
      <BottomTab.Screen
        name="MatchTab"
        component={MatchScreen}
        options={{
          title: "Your Matches",
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
