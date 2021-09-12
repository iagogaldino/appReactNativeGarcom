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
import orderApp from "../../service/order";
import { BotaoDelsuc } from "../componentes/botao";
import { CoresApp } from "../componentes/cores";


export default class StoreRegister extends Component {

  dadosEmpresa = {
    email: '',
    telefone: '',
    cep: '',
    senha: '',
    nome: '',
    rua: '',
    numero: '',
    emailC: '',
    senhaC: '',
    bairro: '',
    cidade: '',
    nomepessoal: '',
    uf: '',
  }

  constructor(props: any) {
    super(props);
    this.navigation = props.navigation;
  }

  navigation: any;
  statusCEP = false;
  state = {
    statusLoader: false,
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>

          {/* <View style={{flex: 1, alignItems: 'center'}}>
  <View style={{ padding: 30,  }}>
    <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Para usar o aplicativo sua empresa deve estar cadastrada</Text>
  </View>

  <View style={{ height: 50, width: 300 }}>
    <BotaoDelsuc label="Entrar em contato" onPress={() => { Linking.openURL('whatsapp://send?phone=5574988420307&text=Olá, gostaria de falar sobre o aplicativo gerente de mesas.'); }}></BotaoDelsuc>
  </View>


  <View style={{ height: 50, width: 300, marginTop: 20 }}>
    <BotaoDelsuc label="Cadastrar empresa" onPress={() => { Linking.openURL('https://admin.juadelivery.site/login'); }}></BotaoDelsuc>
  </View>
</View> */}
          <View style={{ padding: 20, width: '100%' }}>

            <Text style={styles.in}> Dados da empresa </Text>

            <TextInput
              placeholderTextColor="black"
              style={styles.input}
              keyboardType="default"
              placeholder={"Nome da empresa"}
              onChangeText={(text) => { this.dadosEmpresa.nome = text; }}
            />

            <TextInput
              placeholderTextColor="black"
              style={styles.input}
              keyboardType="numeric"
              placeholder={"Telefone"}
              onChangeText={(text) => { this.dadosEmpresa.telefone = text; }}
            />

            <TextInput
              placeholderTextColor="black"
              style={[styles.input, {marginBottom: 10}]}
              keyboardType="numeric"
              placeholder={"CEP"}
              onChangeText={(text) => { this.buscaCEP(text) }}
            />

            {!this.statusCEP && (
              <Text style={{color: 'red',fontSize: 12}}>
                Endereço: Informe o cep
              </Text>
            )}
            {this.statusCEP && (
              <Text style={{color: 'green',fontSize: 12}}>
                Endereço: {this.dadosEmpresa.rua}, {this.dadosEmpresa.cidade} - {this.dadosEmpresa.uf}
              </Text>
            )}

            <TextInput
              placeholderTextColor="black"
              style={[styles.input, {marginTop: 10}]}
              keyboardType="numeric"
              placeholder={"Número"}
              onChangeText={(text) => { this.dadosEmpresa.numero = text; }}
            />

            <Text style={styles.in}> Dados para acesso </Text>

            <TextInput
              placeholderTextColor="black"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize='none'
              placeholder={"Email"}
              onChangeText={(text) => { this.dadosEmpresa.email = text; }}
            />
            <TextInput
              placeholderTextColor="black"
              style={styles.input}
              secureTextEntry={true}
              autoCapitalize='none'
              placeholder={"Senha"}
              onChangeText={(text) => { this.dadosEmpresa.senha = text; }}
            />

            <TextInput
              placeholderTextColor="black"
              style={styles.input}
              secureTextEntry={true}
              autoCapitalize='none'
              placeholder={"Confirmar senha"}
              onChangeText={(text) => { this.dadosEmpresa.senhaC = text; }}
            />

            <Text style={styles.in}> Dados pessoais </Text>

            <TextInput
              placeholderTextColor="black"
              style={styles.input}
              keyboardType="default"
              placeholder={"Nome pessoal"}
              onChangeText={(text) => { this.dadosEmpresa.nomepessoal = text; }}
            />


            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 15 }}>
              <BotaoDelsuc mostrarBotao={this.state.statusLoader} label="Finalizar cadastro" onPress={() => { this.enviar() }}></BotaoDelsuc>
            </View>

          </View>


        </View>
      </ScrollView>

    );
  }

  buscaCEP(cep: string) {
    if (cep.length == 8) {
      console.log('busca cep')
      orderApp.consultaCEP(cep, (res: any) => {
        console.log(res)
        if (!res.erro)
          this.statusCEP = true;
        this.dadosEmpresa.rua = res.resultado.logradouro
        this.dadosEmpresa.bairro = res.resultado.bairro
        this.dadosEmpresa.cidade = res.resultado.localidade
        this.dadosEmpresa.uf = res.resultado.uf
        this.setState({
          dadosEmpresa: this.dadosEmpresa
        })
      })
    }
  }

  enviar() {
    if (!this.statusCEP) { alert('Informe o cep'); return; }
    if (this.dadosEmpresa.senha != this.dadosEmpresa.senhaC) { alert('Verifique se a senha está igual a senha confirmação'); return; }
    this.setState({ statusLoader: true })
    console.log(this.dadosEmpresa)
    orderApp.cadastroEmpresa(this.dadosEmpresa.email,
      this.dadosEmpresa.telefone,
      this.dadosEmpresa.cep,
      this.dadosEmpresa.senha,
      this.dadosEmpresa.nome,
      this.dadosEmpresa.rua,
      this.dadosEmpresa.numero,
      this.dadosEmpresa.emailC,
      this.dadosEmpresa.senhaC,
      this.dadosEmpresa.bairro,
      this.dadosEmpresa.cidade,
      this.dadosEmpresa.nomepessoal,
      this.dadosEmpresa.uf,
      (res: any) => {
        console.log(res)
        this.setState({ statusLoader: false })

        if (res.erro) { alert(res.mensagem); return; }
        alert(res.mensagem);
        this.navigation.navigate('Login')
      }
    );
  }

}

const styles = StyleSheet.create({
  tex: { marginTop: 20, color: CoresApp.paleta02 },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: 'white'
  },

  input: {
    padding: 15,
    width: "100%",
    borderColor: "#e5dede",
    borderWidth: 1,
    marginTop: 5,
    borderRadius: 6,
    color: "black",
    margin: 2
  },

  in: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#f2e6e6',
    borderRadius: 30,
    textAlign: 'center'
  },

});
