import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";

import Welcome from "../screens/Welcome/Welcome";
import Login from "../screens/Login/Login";
import Register from "../screens/Register/Register";
import OTP from "../screens/Otp/Otp";
import ProfileImage from "../screens/ProfileImage/ProfileImage";

import Home from "../screens/Home/Home";
import Blogs from "../screens/Blogs/Blogs";
import Tutorial from "../screens/Tutorial/Tutorial";
import Settings from "../screens/Settings/Settings";
import Scan from "../screens/Scan/Scan";
import Complain from "../screens/Complain/Complain";
import SingleBlog from "../screens/SingleBlog/SingleBlog";
import ScanResult from "../screens/ScanResult/ScanResult";
import CropDetails from "../screens/CropDetail/Cropdetails";
import ScanHistory from "../screens/ScanHistory/ScanHistory";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BlogStackNav = createNativeStackNavigator();

function BlogsStack() {
  return (
    <BlogStackNav.Navigator screenOptions={{ headerShown: false }}>
      <BlogStackNav.Screen name="BlogsList" component={Blogs} />
      <BlogStackNav.Screen name="SingleBlog" component={SingleBlog} />
    </BlogStackNav.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: "none" },
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Blogs" component={BlogsStack} />
      <Tab.Screen name="Tutorial" component={Tutorial} />
      <Tab.Screen name="Complain" component={Complain} />
      <Tab.Screen name="Scan" component={Scan} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={isLoggedIn ? "MainTabs" : "Welcome"}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={Register} />
          <Stack.Screen name="VerifyOtp" component={OTP} />
          <Stack.Screen name="ProfileImage" component={ProfileImage} />
          <Stack.Screen name="CropDetails" component={CropDetails} />
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name="Settings" component={Settings} /> 
          <Stack.Screen name="ScanResult" component={ScanResult} />
          <Stack.Screen name="ScanHistory" component={ScanHistory} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}