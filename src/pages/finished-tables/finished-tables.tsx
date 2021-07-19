import orderApp from "../../service/order";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ProgressBarAndroid,
} from "react-native";
import ConfigApp from "../config/AppSistem";
import { Feather } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

export default class TableFinished extends Component {
  navigation: any;
  focusListener: any;
  props: any = '';
  tipoData: string = '';
  state = {
    statusLoader: true,
    tables: [],
    qtdPedidos: 0,
    totalPedidos: 0,
    dataInicio: '00/00/0000',
    dataFim: '00/00/0000',
    loaderItensManuStatus: false,
    mostrarCalendario: false
  }

  constructor(props: any) {
    super(props);
    this.navigation = props.navigation;
    this.props = props.params;
  }

  componentDidMount() {
    console.log("#TableDetails  -> componentDidMount");

    this.focusListener = this.props.navigation.addListener("focus", () => {
      this.consultaPedidos();
    });
  }


  consultaPedidos() {
    this.setState({ loaderItensManuStatus: true });
    orderApp.getOrderDash((resposta: any) => {
      this.setState({
        tables: resposta.resultado.pedidos.lista_pedidos,
        qtdPedidos: resposta.resultado.pedidos.qnt_pedidos,
        totalPedidos: resposta.resultado.pedidos.total_pedidos,
        loaderItensManuStatus: false
      });
      // console.log('consultaPedidos', resposta.resultado.pedidos.total_pedidos)
      this.carregaItensMesas();
    });
  }

  consultaTodosPedidos(di: string, df: string) {
    this.setState({ loaderItensManuStatus: true });

    orderApp.consultaTodosPedidos((resposta: any) => {
      try {
        this.setState({
          tables: resposta.resultado.pedidos.lista_pedidos,
          qtdPedidos: resposta.resultado.pedidos.qnt_pedidos,
          totalPedidos: resposta.resultado.pedidos.total_pedidos,
        });
        this.carregaItensMesas();
      } catch (e) { 
        alert('Não foi possível carregar os pedidos. Tente fazer o login novamente');
     }

      this.setState({ loaderItensManuStatus: false });

    }, di, df);

  }

  abrirCalendario(tipoData: any) {
    this.setState({ mostrarCalendario: true });
    this.tipoData = tipoData;
  }

  ttt = (event: any, selectedDate: any) => {
    this.setState({ mostrarCalendario: false });
    if (event.type == 'set') {
      const d = new Date(selectedDate);
      this.passaDataVars({ day: d.getDate(), month: d.getMonth(), year: d.getFullYear() }, this.tipoData);
    }
  }

  passaDataVars(data: any, tipoData: any) {
    try {

      let diFORM: string = '';
      let dfFORM: string = '';
      let mes = '';

      for (let x = 0; x < 10; x++) {
        if (data.day == x) { const d = '0' + data.day; data.day = d; }
      }
      for (let x = 0; x < 10; x++) {
        if (data.month == x) { 
          mes = data.month + 1;
          const m = '0' + mes; mes = m; 
        }
      }
      if (tipoData == 'di') {
        diFORM = data.day + '/' + mes + '/' + data.year;
        this.setState({ dataInicio: diFORM });
      }
      if (tipoData == 'df') {
        dfFORM = data.day + '/' + mes + '/' + data.year;
        this.setState({ dataFim: dfFORM });
      }

      if (this.state.dataFim != '' && this.state.dataFim != '00/00/0000' && this.state.dataInicio != '' && this.state.dataInicio != '00/00/0000') {
        this.consultaTodosPedidos(this.state.dataInicio, this.state.dataFim);
      }

    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  }

  onCCalen = (data: any) => {
    console.log(data)
  }

  clickMesa(item: any) {
    this.setState({
      item: item
    });
    orderApp.consultaItensPedido((data: any) => {
      item.itens = data.resultado;
      this.setState({
        item: item
      });
    }, { idPedido: item.id })
  }

  render() {
    return (<View style={styles.container}>
      {this.tableRender()}
    </View>);
  }



  carregaItensMesas() {
    this.state.tables.forEach(element => {
      this.clickMesa(element);
    });
  }

  progress() {
    if (!this.state.loaderItensManuStatus) { return; }
    return <ProgressBarAndroid
      styleAttr="Horizontal"
      color="black"
      indeterminate={this.state.loaderItensManuStatus}
      progress={0}
      style={{ height: 10 }}
    />
  }

  tableRender() {
    return (
      <>
        <View style={styles.container}>
          <View style={{ height: 135, paddingBottom: 20, borderWidth: 0, elevation: 1 }}>
            <View style={styles.wq}>
              <View style={styles.vi}>

                <TouchableOpacity onPress={() => { this.abrirCalendario('di') }} style={styles.di}>
                  <View>
                    <Feather style={styles.diFt} name="calendar" size={26} />
                  </View>
                  <View style={{ marginLeft: 10 }}>
                    <View>
                      <Text style={styles.diFt}> Data início</Text>
                      <Text style={[styles.diFt, { fontSize: 18 }]}>{this.state.dataInicio}</Text>
                    </View>
                  </View>
                </TouchableOpacity>

                {this.state.mostrarCalendario && (
                  <DateTimePicker onChange={this.ttt} testID="dateTimePicker" value={new Date()} display="calendar" is24Hour={true} />
                )}



              </View>
              <View style={styles.vi}>
                <TouchableOpacity onPress={() => { this.abrirCalendario('df') }} style={styles.di}>
                  <View>
                    <Feather style={styles.diFt} name="calendar" size={26} />
                  </View>
                  <View>
                    <View style={{ marginLeft: 10 }}>
                      <Text style={styles.diFt}> Data final</Text>
                      <Text style={[styles.diFt, { fontSize: 18 }]}>{this.state.dataFim}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ paddingLeft: 0 }}>
              <Text style={styles.f3}>Quantidade de pedidos: {this.state.qtdPedidos}</Text>
              <Text style={styles.f3}>Total:{ConfigApp.mascaraDinheiro(this.state.totalPedidos)}</Text>
            </View>
          </View>
          <View style={{}}>
            {this.progress()}
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>

            <View style={styles.tables}>
              {this.state.tables.map((item: any, l) => (
                <TouchableOpacity key={l} style={[styles.tableItem]}>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: '40%', alignItems: 'flex-start' }}>
                      <Text style={styles.f1}>{item.status_texto}</Text>
                      <Text style={styles.f1}>Referência #{item.id}</Text>
                      <Text style={styles.f1}>{item.info + " às " + item.horario}</Text>
                      <Text style={{ color: "black", fontSize: 12, marginTop: 3, fontWeight: 'bold' }}>Nome da mesa:</Text>
                      <Text style={{ color: "black", fontSize: 12, marginBottom: 1 }}> {item.dadoscliente.nome} </Text>
                      <Text style={{ color: "black", fontSize: 12, marginTop: 3, fontWeight: 'bold' }}>Operador:</Text>
                      <Text style={{ color: "black", fontSize: 12, marginBottom: 1 }}> {item.operador} </Text>
                    </View>
                    <View style={{ backgroundColor: 'gold', width: '60%', paddingRight: 7, borderLeftWidth: 1, borderLeftColor: 'black', paddingLeft: 2 }}>

                      <Text style={{ fontSize: 11, fontWeight: 'bold' }}>Produtos</Text>


                      {item.itens.map((produto: any, y: any) => (

                        <View key={y} style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: 'black', borderBottomWidth: 1 }}>
                          <View><Text style={{ fontSize: 10 }}>{produto.qnt}x {produto.nome}</Text></View>
                          <View><Text style={{ fontSize: 10 }}>{ConfigApp.mascaraDinheiro(produto.total)}</Text></View>
                        </View>

                      ))}

                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: 'black', borderBottomWidth: 1 }}>
                        <View><Text style={{ fontSize: 10 }}>Desconto</Text></View>
                        <View><Text style={{ fontSize: 10 }}>{ConfigApp.mascaraDinheiro(item.desconto)}</Text></View>
                      </View>

                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: 'black', borderBottomWidth: 1 }}>
                        <View><Text style={{ fontSize: 10 }}>Taxa extra</Text></View>
                        <View><Text style={{ fontSize: 10 }}>{ConfigApp.mascaraDinheiro(item.taxaextra)}</Text></View>
                      </View>
                    </View>


                  </View>


                  <View
                    style={{
                      width: "100%",
                      justifyContent: "flex-end",
                      alignContent: "flex-end",
                      flexDirection: "row",
                      marginTop: 0,
                    }}
                  >
                    <Text style={styles.f2}>{ConfigApp.mascaraDinheiro(item.total)}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

          </ScrollView>
        </View>
      </>
    );
  }
}


const styles = StyleSheet.create({

  di: {
    backgroundColor: '#46E3A1',
    padding: 5,
    width: '90%',
    alignItems: 'center',
    borderRadius: 3,
    flexDirection: 'row'
  },

  diFt: {
    color: 'white'
  },

  f3: {
    fontSize: 15,
    color: 'black',
    paddingLeft: 13
  },

  vi: {
    width: "50%",
    alignItems: "center",
    height: 50,
  },
  input: {
    padding: 15,
    width: "80%",
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    marginTop: 5,
    borderRadius: 6,
    color: "white",
  },
  wq: {
    height: 120,
    width: "100%",
    flexDirection: "row",
    flex: 1,
    paddingTop: 5
  },

  buttonADD: {
    backgroundColor: "#3700B3",
    height: 50,
    width: "100%",
    elevation: 10,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
  },

  tables: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center", // if you want to fill rows left to right
    justifyContent: "center",
    marginTop: 10,
  },

  f1: {
    color: "black",
    fontSize: 12,
    margin: 1
  },
  f2: {
    color: "white",
    fontSize: 20,
    backgroundColor: 'black',
    width: 230,
    textAlign: 'center',
    borderTopLeftRadius: 7
  },

  tableItem: {
    width: '97%',
    backgroundColor: "white",
    elevation: 12,
    borderRadius: 3,
    margin: 2,
    alignItems: "flex-start",
    paddingLeft: 5
  },

  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },
});
