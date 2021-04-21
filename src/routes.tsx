import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Tabbar from "./pages/tabbarBottom/tabbar";
import Login from "./pages/login/login";
import StoreRegister from "./pages/store-register/store-register";
import TableDetails from "./pages/tableDetails/table-datails";
import MenuItens from "./pages/menu-itens/menu-itens";
import AddTable from "./pages/add-table/add-table";
import MessageTableFinished from "./pages/message-table-finished/message-table-finished";
import ProductDetails from "./pages/product-details/product-details";
import React from "react";



const Stack = createStackNavigator();
const MyTheme = {
    dark: false,
    colors: {
      primary: 'white',
      background: 'white',
      card: 'white',
      text: 'black',
      border: 'black',
      notification: 'black',
    },
  };
export default function StackNavigator() {

  
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ 
        gestureEnabled: false,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
       }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Mesas" component={Tabbar} />
        <Stack.Screen name="Cadastro de empresa" component={StoreRegister} />
        <Stack.Screen name="Detalhes da mesa" component={TableDetails} />
        <Stack.Screen name="Catálogo" component={MenuItens} />
        <Stack.Screen name="Adicionar mesa" component={AddTable} />
        <Stack.Screen name="Conta fechada" component={MessageTableFinished} />
        <Stack.Screen name="Produto" component={ProductDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
