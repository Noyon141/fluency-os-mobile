import { Tabs } from "expo-router";
import { Book, Home, LucideIcon, Search, Settings } from "lucide-react-native";
import React from "react";
import { View } from "react-native";

function TabBarIcon({
  Icon,
  color,
  focused,
}: {
  Icon: LucideIcon;
  color: string;
  focused: boolean;
}) {
  return (
    <View className={`flex flex-row items-center justify-center`}>
      <View
        className={`w-12 h-12 flex items-center justify-center flex-row mt-7 ${focused ? "bg-gray-400 rounded-full" : ""}`}
      >
        <Icon size={24} color={color} className="" />
      </View>
    </View>
  );
}

const TabsLayout = () => {
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        animation: "fade",
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "black",
          borderRadius: 50,
          borderWidth: 0,
          elevation: 0,
          paddingBottom: 0,
          paddingTop: 0,
          height: 70,
          position: "absolute",
          marginHorizontal: 20,
          marginBottom: 20,
        },
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon Icon={Home} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: "Two",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon Icon={Search} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="three"
        options={{
          title: "Three",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon Icon={Book} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="four"
        options={{
          title: "Four",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon Icon={Settings} color={color} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
