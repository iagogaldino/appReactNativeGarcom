import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { BotaoDelsuc } from "../componentes/botao";
import { CoresApp } from "../componentes/cores";


export default class StoreRegister extends Component {

  constructor(props: any) {
    super(props);
    this.navigation = props.navigation;
  }

  navigation: any;
  state = {
    statusLoader: true,
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={{flex: 1, alignItems: 'center'}}>
          <View style={{ padding: 30,  }}>
            <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>Cadastre-se e comece a trabalhar</Text>
            <Text style={{ marginTop: 10, color: 'white' }}>1º Faça o cadastro de sua empresa clicando no botão Cadastrar minha empresa</Text>
            <Text style={{ marginTop: 10, color: 'white' }}>2º Configure a forma de funcionamento de sua empresa</Text>
            <Text style={{ marginTop: 10, color: 'white' }}>3º Adicione as categorias e os produtos de acordo com o seu catálogo</Text>
            <Text style={{ marginTop: 20, color: 'white' }}>Para tirar duvidas você pode entrar em contato conosco <Text style={{fontWeight: 'bold'}}>(74)988420307</Text> </Text>
          </View>


          <View style={{ height: 50, width: 300 }}>
            <BotaoDelsuc label="Cadastrar minha empresa" onPress={() => { Linking.openURL('https://admin.juadelivery.site/login'); }}></BotaoDelsuc>
          </View>
        </View>


      </View>
    );
  }

}

const styles = StyleSheet.create({
  tex: { marginTop: 20, color: CoresApp.paleta02 },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor:  CoresApp.paleta02 
  },
});
