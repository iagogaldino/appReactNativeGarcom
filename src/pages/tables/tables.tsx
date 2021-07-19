import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ProgressBarAndroid,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import serviceTables from "./tables.service";
import api from "../../service/api";
import Table from "./interfaceTable";
import orderApp from "../../service/order";
import ConfigApp from "../config/AppSistem";
import { CoresApp } from "../componentes/cores";

export default class Tables extends Component {
  props: any;
  focusListener: any;
  navigation: any;

  state = {
    tables: [],
    statusLoader: false,
    paginaCarregada: false,
  };
  timerInterval: any;

  constructor(params: any) {
    super(params);
    this.props = params.params;
    this.navigation = params.navigation;
    orderApp.navigation = params.navigation;
    this.state.tables = [];
   // params.navigation.replace('Login')

    if (this.timerInterval) {
      console.log('Limp')
      clearInterval(this.timerInterval);
    }

    this.timerInterval = setInterval(() => {
      this.getOrders(false);
    }, 5000)

    

  }

  

  async getOrders(mostarProgressp: boolean) {
    if (mostarProgressp) {
      this.setState({
        statusLoader: true,
      });
    }
    const response = await api
      .post("?api=apiEstabelecimento", null, {
        params: {
          api: "apiEstabelecimento",
          token: orderApp.getToken(),
          acao: "pedidos",
          tipoFiltro: "APPMESA",
          id: orderApp.getIDEmpresa(),
        },
      })
      .then((response: any) => {
        try {
          const jsonResult: {
            erro: boolean;
            detalhes: string;
            resultado: { pedidos: { lista_pedidos: Array<any> } };
          } = JSON.parse(JSON.stringify(response.data));
          if (jsonResult.erro === true) {
          } else {
            // console.log('Mesa criadas serviço: ' + jsonResult.resultado.pedidos.lista_pedidos.length);

            this.setState({
              tables: jsonResult.resultado.pedidos.lista_pedidos,
              statusLoader: false,
            });
          }
        } catch (e) {
          console.log("error resonse orders json");
          return [];
        }
      });
  }

  componentDidMount() {
    console.log("#componentDidMount");
    this.focusListener = this.props.navigation.addListener("focus", () => {
      if (!orderApp.appState.statusMesasCarregadas) {
        orderApp.appState.statusMesasCarregadas = true;
        this.getOrders(true);
      } else {
        this.getOrders(false);
      }
       
    });
  }

  openTable(tableData: any) {
    console.log(tableData.total)
    serviceTables.setTable(tableData);
    this.props.navigation.navigate("Detalhes da mesa");
  }

  showStatusTable(status: any): string {
    let statusTable = "";
    switch (status) {
      case "1":
        {
          statusTable = "Mesa ocupada";
        }
        break;
      case "2":
        {
          statusTable = "Pedido pronto";
        }
        break;
      case "3":
        {
          statusTable = "Pedido pronto";
        }
        break;
      case "5":
        {
          statusTable = "Mesa finalizada";
        }
        break;
      case "6":
        {
          statusTable = "Mesa concluida";
        }
        break;
      case "7":
        {
          statusTable = "Mesa cancelada";
        }
        break;
      default: {
        statusTable = "Mesa pendente";
      }
    }

    return statusTable;
  }

  prog() {
    if (!this.state.statusLoader) {
      return;
    }
    return (
      <View
        style={{ flex: 1, backgroundColor: "white", justifyContent: "center" }}
      >
        <ProgressBarAndroid
          styleAttr="Normal"
          color={CoresApp.progressoBar}
          indeterminate={true}
          progress={0}
        />
      </View>
    );
  }


  scrollTables() {
    if (this.state.statusLoader) {
      return;
    }
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
         
        <View style={styles.tables}>

          {this.state.tables.map((item: Table, l) => (
            <TouchableOpacity key={l} style={[styles.tableItem, this.verificaStatusPedido(item.status_pedido)]} onPress={() => { this.openTable(item); }} >
              <Text style={{ fontSize: 9, color: 'gold', marginTop: 3 }}>Referência mesa #{item.id}</Text>
              <Text style={[styles.f1, {height: 23, width: '97%'}]}>{item.dadoscliente.nome}</Text>
              
              <Text style={{ color: "white", fontSize: 13, height: 20, marginTop: 1, fontWeight: 'bold' }}>
                <Feather style={styles.ic} name="archive" size={13} /> {this.showStatusTable(item.status_pedido)}
              </Text>

              <Text style={{ color: "white", fontSize: 13, height: 20, marginTop: 1, fontWeight: 'bold' }}>
                <Feather style={styles.ic} name="user-check" size={16} /> {item.operador}
              </Text>
               
              <Text style={[styles.f1, { fontSize: 25, marginTop: 10 }]}>{ConfigApp.mascaraDinheiro(item.total)}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    );
  }

  verificaStatusPedido(status: any) {
    let x;
    switch (status) {
      case "0": { x = styles.pendente } break;
      case "1": { x = styles.aceito; } break;
      case "2": { x = styles.caminho; } break;
      case "3": { x = styles.pronto; } break;
      case "4": { x = styles.pronto; } break;
      case "5": { x = styles.entregue; } break;
      case "6": { x = styles.concluido; } break;
      case "7": { x = styles.cancelado; } break;

      default: { x = styles.concluido; }
    }

    return x;

  }

  render() {
    return (
      <View style={styles.container}>
        {this.prog()}
        {this.scrollTables()}
      </View>
    );
  }


}

const styles = StyleSheet.create({

  pendente: { backgroundColor: CoresApp.mesaPendente },
  aceito: { backgroundColor: CoresApp.mesaAceita },
  finalziado: { backgroundColor: CoresApp.mesaConcluida },
  cancelado: { backgroundColor: CoresApp.mesaCancelada },
  concluido: { backgroundColor: CoresApp.mesaConcluida },
  pronto: { backgroundColor: CoresApp.mesaProntaSair },
  entregue: { backgroundColor: CoresApp.mesaEntregue },
  caminho: { backgroundColor: CoresApp.mesaAcaminho },

  ic: {
    color: 'white'
  },


  buttonADD: {
    backgroundColor: "black",
    height: 50,
    width: "100%",
    elevation: 3,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
  },

  tables: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 8,
    
  },

  f1: {
    color: "white",
    fontSize: 18,
  },

  tableItem: {
    minWidth: 150,
    width: '47%',
    height: 130,
    backgroundColor: "#58DE65",
    elevation: 12,
    borderRadius: 3,
    margin: 2,
    alignItems: "flex-start",
    paddingLeft: 10
  },

  tableItemOFF: {
    width: 165,
    height: 150,
    backgroundColor: "#D91136",
    elevation: 12,
    borderRadius: 3,
    margin: 2,
    alignItems: "center",
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
