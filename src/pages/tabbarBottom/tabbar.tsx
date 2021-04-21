import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Tables from "./../tables/tables";
import MenuItens from "./../menu-itens/menu-itens";
import FinishedTables from "./../finished-tables/finished-tables";
import TableDetails from "./../tableDetails/table-datails";
 
import { Feather } from "@expo/vector-icons";
import { View } from "react-native";

const Tab = createBottomTabNavigator();

export default function Tabbar() {

  return (
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: "black",
          inactiveTintColor: "lightgray",
          activeBackgroundColor: "white",
          inactiveBackgroundColor: "white",
          style: {
            backgroundColor: "white",
            paddingBottom: 1,
          },
        }}
      >
        <Tab.Screen
          name="Mesas"
          component={Tables}
          options={{
            title: "Mesas",
            tabBarIcon: () => (
              <View>
                <Feather name="home" size={26} color="black" />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Catálogo"
          component={MenuItens}
          options={{
            title: "Catálogo",
            tabBarIcon: () => (
              <View>
                <Feather name="book-open" size={26} color="black" />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Finalizadas"
          component={FinishedTables}
          options={{
            title: "Mesas finalizadas",
            tabBarIcon: () => (
              <View>
                <Feather name="list" size={26} color="black" />
              </View>
            ),
          }}
        />


      </Tab.Navigator>
  );
}
