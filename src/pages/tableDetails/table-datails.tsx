import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ProgressBarAndroid,
  Image,
  TextInput
} from "react-native";
import { Feather } from "@expo/vector-icons";
import tablesService from "./../tables/tables.service";
import serviceTables from "./../tables/tables.service";
import Table from "./../tables/interfaceTable";
import api from "../../service/api";
import orderApp from "../../service/order";
import ProgressCircle from "react-native-progress-circle";
import { BotaoDelsuc } from "../componentes/botao";
import { Textos } from "../componentes/TextosApp";
import { CoresApp } from "../componentes/cores";
import ConfigApp from "../config/AppSistem";

export default class TableDetails extends Component {
  navigation: any;
  motivoCancelamento: string = '';
  table: Table = { status_pedido: 0, comprovante: '', dadoscliente: { nome: '', telefone: '' }, id_pedido: 0, itens: [], nome: '', omissao: 0, total: 0, id_empresa: 0, subtotal: 0, operador: '' };
  focusListener: any;
  state = {
    statusLoader: true,
    statusLoader2: false,
    statusBOX01: false,
  }
  itensTableCliente: [] = [];

  constructor(props: any) {
    super(props);
    this.navigation = props.navigation;
  }

  componentDidMount() {
    console.log("#TableDetails  -> componentDidMount");
    this.focusListener = this.navigation.addListener("focus", () => {
      this.getOrder();
    });
  }

  setItensClient(itensList: []) {
    this.itensTableCliente = itensList;
  }

  setTableData(table: any) {
    this.table = table;
  }

  getOrder() {
    const response = api
      .post("?api=apiEstabelecimento", null, {
        params: {
          api: "apiEstabelecimento",
          token: orderApp.getToken(),
          acao: "consultaPedido",
          "obj[idPedido]": tablesService.getTable().id,
          "obj[id_empresa]": this.table.id_empresa,
          id: orderApp.getIDEmpresa(),
        },
      })
      .then((response: any) => {
        try {
          const jsonResult: {
            erro: boolean;
            detalhes: string;
            resultado: { itens: any };
          } = JSON.parse(JSON.stringify(response.data));
          if (jsonResult.erro === true) {
          } else {
            this.setTableData(jsonResult.resultado.itens);
            this.setState({
              table: jsonResult.resultado.itens,
              statusLoader: false,
            });
          }
          serviceTables.setTable(jsonResult.resultado.itens);
        } catch (e) {
          console.log("error resonse orders json");
          return [];
        }
      });
  }

  addFPMesa() {
    if (this.table.status_pedido && this.table.status_pedido >= 5) {
      alert('Essa mesa não pode mais ser finalizada');
      return;
    }
    this.navigation.navigate("Forma de pagamento", { detalhesMesa: tablesService.getTable() });
  }

  cancelarMesa() {
    if (!this.motivoCancelamento) {
      alert('Informe o motivo do cancelamento desta mesa');
      return;
    }
    this.setState({ statusLoader2: true });
    const cb = (resposta: any) => {

      this.setState({ statusLoader2: false });

      if (resposta.detalhes == "OK") {
        alert("Mesa cancelada");
        this.navigation.navigate("Mesas", { addItem: true });
      } else {
        alert(resposta.detalhes);
      }

    };
    orderApp.attStatusMesa(cb, tablesService.getTable().id, 7, tablesService.getTable().id_empresa, orderApp.appState.dadosEmpresa.operador.nome + ' cancelou a mesa. Motivo: ' + this.motivoCancelamento);
  }

  addProduct() {
    if (this.table.status_pedido == 7) { alert('Mesa indisponível'); return; }
    this.navigation.navigate("Catálogo", { addItem: true });
  }

  removeProductTable(item: any) {

    if (this.table.status_pedido == 7) { alert('Mesa indisponível'); return; }
    this.setState({ statusLoader2: true });
    tablesService.remmoveProduct(item, (resposta: any) => {
      this.setState({ statusLoader2: false });

      if (!resposta.erro) {

        tablesService.getTable().itens.forEach((element: any) => {
          if (element === item) {
            tablesService.getTable().itens.splice(tablesService.getTable().itens.indexOf(element), 1);
            tablesService.getTable().total -= element.preco * element.qnt;
          }
        });
      } else {
        alert(resposta.detalhes);

      }

      this.setState({
        table: serviceTables.getTable(),
      });

    });

  }



  removeTable() {
    tablesService.remmoveTable();
    this.navigation.navigate("Mesas");
  }

  itensTable() {
    if (this.table.itens.length === 0) {
      console.log("This table no have itens");
      return <></>;
    }

    try {
      return this.table.itens.map((item: any, l) => (
        <View key={l} style={[styles.tableItem]}>
          <View style={styles.areaDataItem}>
            <Text style={styles.nameItem}>{item.qnt}x {item.nome}</Text>
            <Text style={styles.descriptionItem}>{item.descricao}</Text>
            <Text style={[styles.observacao, { fontWeight: 'bold' }]}>Observação:</Text>
            <Text style={styles.observacao}>{item.observacao}</Text>

            <View style={styles.dels}>
              <Text style={styles.priceItem}>R${item.preco}</Text>
              <TouchableOpacity
                style={styles.btRem}
                onPress={() => {
                  this.removeProductTable(item);
                }}
              >
                <Text style={{ color: "white", fontSize: 15 }}>
                  <Feather name="trash-2" size={26} color="white" />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ));
    } catch (e) {
      console.log("Erro format array");
    }
  }

  imgEmpresa() {
    if (!orderApp.appState.dadosEmpresa.imagem) {
      return '';
    } else {
      return orderApp.appState.dadosEmpresa.imagem;
    }
  }

  mostrarBox01() {
    if (this.table.status_pedido && this.table.status_pedido > 5) {
      alert('Esta mesa não pode mais ser cancelada');
      return;
    }
    this.setState({ statusBOX01: true })
  }
  ocultarBox01() {
    this.setState({ statusBOX01: false })
  }

  setMotivo(valor: string) {
    this.motivoCancelamento = valor;
  }

  tableRender() {
    if (this.state.statusLoader) { return; }
    return (
      <>

        <View style={styles.vv6}>
          <View style={styles.aLogo}>
            <Image style={styles.logoEmpresa} source={{ uri: this.imgEmpresa() }} />
          </View>

          <View style={styles.vi}>

            <Text style={{ fontSize: 12, color: 'black' }}>Operador: {this.table.operador}</Text>
            <Text style={{ fontSize: 12, color: '#bab6b6' }}>Nome da mesa</Text>
            <Text style={styles.f1}>{this.table.dadoscliente.nome}</Text>

            <View style={styles.valores}>
              <View>
                <Text style={styles.f4}>Desconto</Text>
              </View>
              <View>
                <Text style={styles.f4}>{ConfigApp.mascaraDinheiro(this.table.desconto)}</Text>
              </View>
            </View>

            <View style={styles.valores}>
              <View>
                <Text style={styles.f4}>Taxa extra</Text>
              </View>
              <View>
                <Text style={styles.f4}>{ConfigApp.mascaraDinheiro(this.table.taxaextra)}</Text>
              </View>
            </View>

            <View style={styles.valores}>
              <View>
                <Text style={styles.f5}>Total</Text>
              </View>
              <View>
                <Text style={styles.f5}>{ConfigApp.mascaraDinheiro(this.table.total)}</Text>
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            height: 60,
            padding: 10,
            flexDirection: "row",
            borderRadius: 10,
          }}
        >
          <View style={{ width: "50%" }}>
            <TouchableOpacity style={styles.button1} onPress={() => { this.addFPMesa(); }}>
              <Text style={{ color: "white", fontSize: 15 }}>{Textos.BOTAO_FECHAR_MESA}</Text>
            </TouchableOpacity>
          </View>

          <View style={{ width: "50%", marginLeft: 2 }}>
            <TouchableOpacity style={[styles.buttonADD, { backgroundColor: "red" }]} onPress={() => { this.mostrarBox01(); }}>
              <Text style={{ color: "white" }}>{Textos.BOTAO_CANCELAR_MESA}</Text>
            </TouchableOpacity>
          </View>



        </View>
        {this.state.statusBOX01 && (
          <View style={{ width: '100%', paddingLeft: 10, paddingRight: 10 }}>
            <Text style={{ color: 'red', fontSize: 12 }}>Motivo do cancelamento da mesa</Text>
            <TextInput

              placeholderTextColor="black"
              style={{ elevation: 1, height: 90, textAlign: 'center', backgroundColor: '#ebed71' }}
              placeholder={"Informe aqui o motivo..."}
              onChangeText={(text) => this.setMotivo(text)}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <TouchableOpacity style={styles.bccl} onPress={() => { this.ocultarBox01(); }}>
                <Text style={{ color: 'green', fontWeight: 'bold' }}>Não cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.bccl, { backgroundColor: 'red' }]} onPress={() => { this.cancelarMesa(); }}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Confirmar</Text>
              </TouchableOpacity>
            </View>

          </View>
        )}

        {this.state.statusLoader2 && (<View>
          <ProgressBarAndroid
            styleAttr="Small"
            color={CoresApp.progressoBar}
            indeterminate={true}
            progress={0}
            style={{ marginTop: 10 }}
          />
        </View>
        )}

        <ScrollView style={styles.ScrollView}>
          {this.itensTable()}
        </ScrollView>

        <View style={{ height: 70, elevation: 1, width: "100%", padding: 10 }}>
          <BotaoDelsuc label="Adicionar produto" onPress={() => { this.addProduct(); }}></BotaoDelsuc>
        </View>
      </>
    );
  }

  prog() {
    if (!this.state.statusLoader) { return; }
    return (
      <View
        style={{ flex: 1, alignItems: 'center', justifyContent: "center", alignContent: 'center', width: '100%' }}
      >
        <ProgressCircle
          percent={80}
          radius={20}
          borderWidth={3}
          color="#3399FF"
          shadowColor="#998"
          bgColor="#fff"
        ></ProgressCircle>
      </View>
    );
  }

  render() {
    return (<View style={styles.container}>
      {this.prog()}
      {this.tableRender()}
    </View>);
  }
}

const styles = StyleSheet.create({
  bccl: {
    borderColor: '#e0e0db',
    borderWidth: 1,
    marginLeft: 10,
    padding: 9,
    borderRadius: 7,
    marginTop: 7
  },

  vv6: {
    padding: 10,
    flexDirection: 'row'
  },

  aLogo: {
    width: 100,
  },

  logoEmpresa: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginTop: 5
  },

  valores: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
    borderTopColor: '#e9e5ea',
    borderTopWidth: 1,
    marginTop: 5,
    paddingTop: 5,

  },

  vi: {
    marginTop: 0,
    width: '75%',
  },



  tableItem: {
    width: "100%",
    marginBottom: 1,
    flex: 1,
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 10,
  },
  priceItem: {
    fontSize: 20,
    color: "black",
    marginTop: 10,
  },

  f4: { fontSize: 14, color: 'black' },
  f5: { fontSize: 16, color: 'black', fontWeight: 'bold' },


  nameItem: {
    fontSize: 15,
    color: "black",
  },

  descriptionItem: {
    fontSize: 12,
    color: "black",
  },
  observacao: {
    color: 'red'
  },

  dels: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  areaDataItem: {
    paddingLeft: 5,
    paddingRight: 5,
    width: "100%",
    backgroundColor: "white",
    elevation: 2,
    borderRadius: 10,
    marginTop: 15,
  },

  imgit: {
    width: 132,
    height: 140,
  },

  ScrollView: {
    backgroundColor: "white",
  },

  im: {
    width: 70,
    height: 70,
  },
  cont1: {
    flexDirection: "column",
    alignSelf: "flex-start",
    paddingLeft: 10,
    paddingBottom: 10,
    paddingTop: 20
  },

  f11: {
    fontSize: 20,
    color: "white",
  },
  f22: {
    fontSize: 30,
    color: "black",
  },
  f1: {
    fontSize: 20,
    color: "black",
  },
  f2: {
    fontSize: 14,
    color: "black",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  button1: {
    backgroundColor: "green",
    height: 20,
    width: "100%",
    elevation: 3,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
  },
  btRem: {
    backgroundColor: "red",
    height: 38,
    width: 38,
    elevation: 3,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 5,
    marginRight: 3,
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
});
