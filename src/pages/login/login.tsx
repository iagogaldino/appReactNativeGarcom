import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  AsyncStorage,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import api from "./../../service/api";
import orderApp from "../../service/order";
import { BotaoDelsuc } from "../componentes/botao";
import { Textos } from "../componentes/TextosApp";
import { CoresApp } from "../componentes/cores";

export default class Login extends Component {
  navigation: any;
  state = {
    statusLoader: false,
  }
  email = '';
  senha = '';

  constructor(props: any) {
    super(props);
    this.navigation = props.navigation;
  }

  componentDidMount() {
    console.log("#TableDetails  -> componentDidMount");
  }

  

  singnIn(email?: string, senha?:string) {

    console.log("press signin!");
    this.setState({ statusLoader: true });

    if (email && senha) {
      this.email = email;
      this.senha = senha;
    }

    orderApp.login((response: any) => {
      try {
        orderApp.setToken(response.resultado.dados_conta.token);
        orderApp.setIDEmpresa(response.resultado.dados_conta.id);
        orderApp.appState.dadosEmpresa = response.resultado.dados_conta;
        orderApp.nomeEmpresa = response.resultado.dados_conta.nome;
        this.setState({ statusLoader: false });


        // this.navigation.navigate('Mesas', this.navigation);
         this.navigation.replace('Mesas', this.navigation);
         
        if (response.erro) { alert(response.mensagem); this.setState({ statusLoader: false }); }
      } catch (e) {
        this.setState({ statusLoader: false });
        alert('Verifique os dados informados! \n\nCaso sua empresa ainda não tenha um cadastro clique em Cadastrar empresa para poder usar nosso sistema. :)');
      }

    }, this.email/*'123'*/, this.senha/*'123'*/);


  };

  setEmail(valor: string) {
    this.email = valor;
  }

  setSenha(valor: string) {
    this.senha = valor;
  }

  tableRender() {
    return (
      <>
        <View style={styles.container}>
          <StatusBar style="dark" backgroundColor="white" />

          <View style={styles.vi1}>
            <View style={styles.vi2}>
              <Image
                style={styles.im}
                source={require("../../../assets/logo.png")}
              />
            </View>

            <View style={styles.vi}>
              <TextInput

                placeholderTextColor="black"
                style={styles.input}
                placeholder={"Email"}
                onChangeText={(text) => this.setEmail(text)}
                keyboardType={"email-address"}
              />
            </View>
            <View style={styles.vi}>
              <TextInput
                placeholderTextColor="black"
                style={styles.input}
                placeholder={"Senha"}
                onChangeText={(text) => this.setSenha(text)}
                textContentType="password"
                secureTextEntry={true}
              />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 15 }}>
              <BotaoDelsuc mostrarBotao={this.state.statusLoader} label="Entrar" onPress={() => { this.singnIn(); }}></BotaoDelsuc>
            </View>



            <View style={{ alignItems: 'center', marginTop: 20 }}>
              <Text style={{ color: "#c4c4c4", fontSize: 13, textAlign: 'center' }}>Você também pode fazer um teste clicando no botão abaixo</Text>
              <TouchableOpacity style={{marginTop: 10, borderColor: CoresApp.paleta01, borderWidth: 1, padding: 10, borderRadius: 10, }} onPress={() => { this.singnIn("e@hotmail.com", "123"); }}>
                <Text style={{ color: CoresApp.paleta01, fontSize: 15 }}>Testar aplicativo</Text>
              </TouchableOpacity>
            </View>

            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity style={styles.button2} onPress={() => { this.navigation.navigate("Cadastro de empresa", {}); }}>
                <Text style={{ color: "black", fontSize: 15 }}>{Textos.BOTAO_01}</Text>
              </TouchableOpacity>
            </View>


          </View>



        </View>
      </>
    );
  }

  consultaPedidos() {
    // this.navigation.navigate("Conta fechada");
    orderApp.getOrderDash((resposta: any) => {
      console.log(resposta);
    });
  }

  render() {
    return (<View style={styles.container}>
      {this.tableRender()}
    </View>);
  }

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
    width: "80%",
    alignItems: "center",
    marginTop: 2,
    borderRadius: 10,
  },
  vi2: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
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
    justifyContent: "center",
  },
});
