import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import api from "./../../service/api";

export default function Login() {
  let state = {
    errorMessage: false,
  };

  const navigation = useNavigation();
  const singnIn = async () => {
    console.log("press signin!");
    //remover
    navigation.navigate('Mesas', {navigation});
    return;
    try {
      const response: any = await api.post('?acao=login_emrpesa', null, { params: {
        token: '',
        api: 'apiEstabelecimento',
        'obj[email]': 'iago_galdino@hotmail.com',
        'obj[senha]': '123',
      }});

      
      const json = JSON.parse( JSON.stringify( response.data ) );
      console.clear();
      console.log('JSON', json.resultado.dados_conta.id);
      console.log('JSON', json.resultado.dados_conta.nome);

      if (json.resultado.dados_conta.id) {
        console.log('Login succes');
        navigation.navigate('Mesas', {navigation});
      } else {
        console.log('Erro login')
      }
     /*   
     // save data 
      await AsyncStorage.multiSet([
        ["@CodeApi:user", JSON.stringify(response.data)],
      ]);
      */
      // navigation.navigate('Mesas', {navigation});
    } catch (e) {
      console.log(e);
      console.warn('Erro ao tentar efetuar login');
      state.errorMessage = true;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor="white" />

      <View style={styles.vi1}>
        <View style={styles.vi2}>
          <Image
            style={styles.im}
            source={require("../../../assets/vultoRoxo.png")}
          />
          <Text style={{ color: "white", fontSize: 12 }}>
            {" "}
            Gerente de Mesas{" "}
          </Text>
        </View>

        <View style={styles.vi}>
          <TextInput
            placeholderTextColor="black"
            style={styles.input}
            placeholder={"Email"}
          />
        </View>
        <View style={styles.vi}>
          <TextInput
            placeholderTextColor="black"
            style={styles.input}
            placeholder={"Senha"}
          />
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          singnIn();
        }}
      >
        <Text style={{ color: "white", fontSize: 18 }}> Entrar </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button2}>
        <Text
          style={{ color: "black", fontSize: 12 }}
          onPress={() => {
            navigation.navigate("Cadastro de empresa", navigation);
          }}
        >Cadastrar Empresa </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    backgroundColor: "black",
    width: "80%",
    alignItems: "center",
    borderWidth: 1,
    marginTop: 25,
    borderRadius: 10,
  },
  button2: {
    padding: 20,
    backgroundColor: "white",
    width: "80%",
    alignItems: "center",
    marginTop: 25,
    borderRadius: 10,
  },
  vi2: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 70,
  },
  im: {
    width: 150,
    height: 150,
  },
  vi1: {
    width: "100%",
    alignContent: "center",
    alignSelf: "center",
    marginTop: 2,
  },
  vi: {
    width: "100%",
    alignItems: "center",
  },
  input: {
    padding: 15,
    width: "80%",
    backgroundColor: "white",
    borderColor: "black",
    elevation: 5,
    marginTop: 5,
    borderRadius: 6,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
