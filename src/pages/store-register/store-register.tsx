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
            <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Para usar o aplicativo sua empresa deve estar cadastrada</Text>
          </View>

          <View style={{ height: 50, width: 300 }}>
            <BotaoDelsuc label="Entrar em contato" onPress={() => { Linking.openURL('whatsapp://send?phone=5574988420307&text=Olá, gostaria de falar sobre o aplicativo gerente de mesas.'); }}></BotaoDelsuc>
          </View>


          <View style={{ height: 50, width: 300, marginTop: 20 }}>
            <BotaoDelsuc label="Cadastrar empresa" onPress={() => { Linking.openURL('https://admin.juadelivery.site/login'); }}></BotaoDelsuc>
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
