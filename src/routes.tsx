import { CardStyleInterpolators, createStackNavigator, HeaderBackButton } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Tabbar from "./pages/tabbarBottom/tabbar";
import Login from "./pages/login/login";
import StoreRegister from "./pages/store-register/store-register";
import TableDetails from "./pages/tableDetails/table-datails";
import MenuItens from "./pages/menu-itens/menu-itens";
import AddTable from "./pages/add-table/add-table";
import MessageTableFinished from "./pages/message-table-finished/message-table-finished";
import ProductDetails from "./pages/product-details/product-details";
import React, { Component } from "react";
import FormasPagamento from "./pages/formas-pagamento/formas-pagamento";
import { StatusBar } from "expo-status-bar";
import { Button, View, Text, TouchableOpacity } from "react-native";
import orderApp from "./service/order";
import { CoresApp } from "./pages/componentes/cores";
import AddItem from "./pages/add-item/addItem";


export default class StackNavigator extends Component {
  navigation: any;
  Stack = createStackNavigator();
  MyTheme = {
    dark: false,
    colors: {
      primary: 'white',
      background: 'white',
      card: 'white',
      text: 'black',
      border: 'white',
      notification: 'black',
    },
  };

  constructor(props: any) {
    super(props);
    this.navigation = props.navigation;

  }

  render() {
    return (
      <NavigationContainer theme={this.MyTheme}>
        <StatusBar backgroundColor="white"></StatusBar>
        <this.Stack.Navigator initialRouteName="Adicionar produto" screenOptions={{
          gestureEnabled: false,
          gestureDirection: 'horizontal',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}
        >
          <this.Stack.Screen name="Login" component={Login} />
          <this.Stack.Screen name="Mesas" component={Tabbar}
            options={{
              headerTitle: orderApp.nomeEmpresa,
              headerRight: () => (this.b())
            }}
          />
          <this.Stack.Screen name="Cadastro de empresa" component={StoreRegister} />
          <this.Stack.Screen name="Detalhes da mesa" component={TableDetails} />
          <this.Stack.Screen name="Catálogo" component={MenuItens} />
          <this.Stack.Screen name="Adicionar mesa" component={AddTable} />
          <this.Stack.Screen name="Produto" component={ProductDetails} />
          <this.Stack.Screen name="Forma de pagamento" component={FormasPagamento} />
          <this.Stack.Screen name="Configurar produto" component={AddItem} />

        </this.Stack.Navigator>


      </NavigationContainer>
    );
  }

  b() {
    return (
      <TouchableOpacity style={{ marginRight: 10, backgroundColor: CoresApp.paleta01,padding: 8, marginTop: 5, borderRadius: 7 }} onPress={() => { orderApp.navigation.navigate('Adicionar mesa'); }}>
        <Text style={{color: CoresApp.corTextoPaletaLeve01}}> Adicionar mesa </Text>
      </TouchableOpacity>
    )
  }

}


