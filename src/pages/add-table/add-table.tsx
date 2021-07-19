import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ProgressBarAndroid,
} from "react-native";
import orderApp from "../../service/order";
import { BotaoDelsuc } from "../componentes/botao";
import { CoresApp } from "../componentes/cores";
import TablesS from "./../tables/tables.service";

export default class AddTable extends Component {
  navigation: any;
  tableName = "";

  state = {
    statubBt: false, // ativa e desativa bt com loader
  };

  constructor(props: any) {
    super(props);
    this.navigation = props.navigation;
  }

  onClickADDTable() {
    if (!this.tableName) {
      alert('Informe o nome da mesa');
      return;
    }
    this.setState({
      statubBt: true,
    });

    let resp = TablesS.addTablesArray('Mesa: ' + this.tableName, 0, "Disponível", 0, (response: any) => {
      if (response.erro === true) {
        this.setState({
          statubBt: false,
        });
        alert(response.detalhes);

      } else {
        this.navigation.navigate("Mesas");
      }
    }
    );
    console.log("resp", resp);
  }

  setNameTValue(value: string) {
    this.tableName = value;
  }

  prog() {
    if (!this.state.statubBt) {
      console.log("Tables not loader..");
      return;
    }
    return (
      <View style={{ width: "100%", justifyContent: "center" }}>
        <ProgressBarAndroid
          styleAttr="Horizontal"
          color="gold"
          indeterminate={true}
          progress={0}
        />
      </View>
    );
  }

  textoBt() {
    if (!this.state.statubBt)
      return <Text style={{ color: "white", fontSize: 18 }}>Adicionar</Text>;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{textAlign: 'center', marginTop: 10, color: CoresApp.paleta01}}>Após a mesa adicionada, a mesma deve ser aceita no dashboard para que você possa adicionar outra.</Text>
        <View style={styles.vi}>
          <TextInput
            onChangeText={(text) => this.setNameTValue(text)}
            placeholderTextColor="black"
            style={styles.input}
            placeholder={"Numeração da mesa"}
          />
        </View>


        <View style={styles.button} >
          <BotaoDelsuc label="Adicionar" mostrarBotao={this.state.statubBt} onPress={() => { this.onClickADDTable(); }}></BotaoDelsuc>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  vi: {
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  input: {
    padding: 15,
    width: "80%",
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    marginTop: 5,
    borderRadius: 6,
    color: "black",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  button: {
    padding: 12,
    alignItems: "center",
    marginTop: 25,
  },
});
