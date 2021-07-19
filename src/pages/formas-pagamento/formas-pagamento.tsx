import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import orderApp from "../../service/order";
import { BotaoDelsuc } from "../componentes/botao";
import { CoresApp } from "../componentes/cores";
import tablesService from "../tables/tables.service";

export default class FormasPagamento extends Component {
    navigation: any;
    formasPagamento: Array<any> = [];
    state = {
        dadosMesa: { id: 0, dadoscliente: { nome: '' }, total: 0 },
        itemPagamento: [{ itens: [] }],
        statusLoader: false,
        desconto: 0,
        taxaExtra: 0,
        totalMesa: 0,
        operador: ''
    };

    constructor(props: any) {
        super(props);
        this.navigation = props.navigation;
        this.state.dadosMesa.id = props.route.params.detalhesMesa.id;
        this.state.dadosMesa.dadoscliente.nome = props.route.params.detalhesMesa.dadoscliente.nome;
        this.state.dadosMesa.total = parseFloat(props.route.params.detalhesMesa.total);
        this.state.desconto = parseFloat(props.route.params.detalhesMesa.desconto);
        this.state.taxaExtra = parseFloat(props.route.params.detalhesMesa.taxaextra);
        this.state.itemPagamento = orderApp.appState.dadosEmpresa.formaspagamento;
        this.state.totalMesa = props.route.params.detalhesMesa.total;
        this.state.operador = props.route.params.detalhesMesa.operador;

    }

    componentDidMount() {
        console.log('componentDidMount')
    }

    render() {
        // console.log(orderApp.appState.dadosEmpresa.formaspagamento)
        return (
            <ScrollView>
                <View style={styles.container}>


                    <View style={styles.vv6}>
                        <View style={styles.aLogo}>
                            <Image style={styles.logoEmpresa} source={{ uri: this.imgEmpresa() }} />
                        </View>

                        <View style={styles.vi}>

                            <Text style={{ fontSize: 12, color: 'black' }}>Operador: {this.state.operador}</Text>
                            <Text style={{ fontSize: 12, color: '#bab6b6' }}>Nome da mesa</Text>
                            <Text style={styles.f1}>{this.state.dadosMesa.dadoscliente.nome}</Text>

                            <View style={styles.valores}>
                                <View>
                                    <Text style={styles.f4}>Desconto</Text>
                                </View>
                                <View>
                                    <Text style={styles.f4}>{this.mascaraREAL(this.state.desconto)}</Text>
                                </View>
                            </View>

                            <View style={styles.valores}>
                                <View>
                                    <Text style={styles.f4}>Taxa extra</Text>
                                </View>
                                <View>
                                    <Text style={styles.f4}>{this.mascaraREAL(this.state.taxaExtra)}</Text>
                                </View>
                            </View>

                            <View style={styles.valores}>
                                <View>
                                    <Text style={styles.f5}>Total</Text>
                                </View>
                                <View>
                                    <Text style={styles.f5}>{this.mascaraREAL(this.getTotalMesa())}</Text>
                                </View>
                            </View>
                        </View>
                    </View>


                    <View style={styles.cont}>
                        <View style={styles.cont01}></View>
                        <Text style={styles.f3}>Taxas para a mesa</Text>
                    </View>

                    <View style={styles.conta}>
                        <View style={styles.cont01}></View>
                        <View style={styles.ain}>
                            <Text style={styles.f4}>Taxa extra</Text>
                            <TextInput
                                placeholderTextColor="black"
                                style={styles.input}
                                keyboardType="numeric"
                                placeholder={" % "}
                                onChangeText={(text) => this.setNameTValue(text)}
                            />
                        </View>


                        <View style={styles.ain}>
                            <Text style={styles.f4}>Desconto</Text>
                            <TextInput
                                placeholderTextColor="black"
                                style={styles.input}
                                placeholder={"R$0,00"}
                                onChangeText={(text) => this.setDesconto(text)}
                                keyboardType="numeric"
                            />
                        </View>

                    </View>

                    <View style={styles.cont}>
                        <View style={styles.cont01}></View>
                        <Text style={styles.f3}>Formas de pagamento</Text>
                    </View>


                    {this.state.itemPagamento.map((item: any, index: any) => (
                        <>
                            <View style={{ backgroundColor: 'white', marginBottom: 20 }}>
                                <TouchableOpacity key={index} onPress={() => { this.selecionarFormadePagamento(item) }} style={styles.itemCartao}>
                                    <View style={styles.itemCartaoV1}>
                                        {item.imagem && (
                                            <View style={styles.itemCartaoT1}>
                                                <Image style={styles.itemCartaoIMG} source={{ uri: item.imagem }} />
                                            </View>
                                        )}
                                        <Text style={[styles.itemCartaoT1, { marginTop: 7 }]}>{item.nome}</Text>
                                    </View>
                                    <View style={styles.itemCartaoV2}>
                                        <View style={this.checaSelecionadoFP(item.selecionado)}></View>
                                    </View>
                                </TouchableOpacity>

                                {item.itens.map((itemPagamento: any, index2: any) => (
                                    <TouchableOpacity key={index2} onPress={() => { this.selecionarItemPagamento(itemPagamento, item) }} style={styles.itemPag}>
                                        <View style={styles.itemCartaoV1}>
                                            {item.imagem && (
                                                <View style={styles.itemCartaoT1}>
                                                    <Image style={styles.itemCartaoIMG} source={{ uri: itemPagamento.imagem }} />
                                                </View>
                                            )}
                                            <Text style={[styles.itemCartaoT1, { fontSize: 13, marginTop: 5, color: 'green' }]}>{itemPagamento.nome}</Text>
                                        </View>
                                        <View style={styles.itemCartaoV2}>
                                            <View style={this.checaSelecionadoFP(itemPagamento.selecionado)}></View>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>

                        </>
                    ))}

                    <View style={styles.cont01}></View>
                    <View style={{ height: 60, padding: 5 }}>
                        <BotaoDelsuc label="Finalizar mesa" onPress={() => { this.adicionarTaxas(); }}></BotaoDelsuc>
                    </View>
                </View>
            </ScrollView>
        );
    }

    setNameTValue(valor: any) {
        const t = valor / 100 * this.state.dadosMesa.total;
        console.log(valor + '%' + '=' + t);
        this.setState({
            taxaExtra: t,
        });
    }
    setDesconto(valor: any) {
        if (!valor) {
            this.setState({
                desconto: 0
            });
            return;
        }
        this.setState({
            desconto: valor
        });
    }
    getTotalMesa(): number {
        const t =
            this.state.dadosMesa.total
            + this.state.taxaExtra - this.state.desconto;
        console.log('Total ' + this.state.dadosMesa.total + ' Taxa ext = ' + this.state.taxaExtra + t)
        return t;
    }

    mascaraREAL(valor: any) {
        try {
            return 'R$' + valor.toFixed(2).replace(".", ",");
        } catch (e) { return 'R$' + valor; }
    }

    imgEmpresa() {
        if (!orderApp.appState.dadosEmpresa.imagem) {
            return '';
        } else {
            return orderApp.appState.dadosEmpresa.imagem;
        }
    }

    adicionarTaxas() {

        if (this.state.statusLoader) { return alert('Processando...'); }
        this.state.statusLoader = true;

        const params = {
            "idPedido": this.state.dadosMesa.id,
            "taxaExtra": this.state.taxaExtra,
            "desconto": this.state.desconto
        }

        orderApp.AttTaxas
            ((resposta: any) => {
                if (resposta.erro) {
                    alert(resposta.detalhes);
                    this.state.statusLoader = false;
                } else {

                    this.confirmar();
                }
            }, params);

    }

    confirmar() {

        const params = {
            "idPedido": this.state.dadosMesa.id,
            "idEmpresa": orderApp.getIDEmpresa(),
            "formasPagamento": this.state.itemPagamento.filter((item: any) => (item.selecionado) == true)
        }

        orderApp.addFpPedido((resposta: any) => {
            if (resposta.erro) {
                alert(resposta.detalhes);
                this.state.statusLoader = false;
            } else {

                this.attStatusMesa(5);
            }
        }, params);


    }

    attStatusMesa(status: number) {

        const cb = (resposta: any) => {
            console.log(resposta);
            if (resposta.detalhes == "OK") {
                alert("Conta fechada com sucesso");
                this.navigation.navigate("Mesas", { addItem: true });
            } else {
                alert(resposta.detalhes);
                this.state.statusLoader = false;
            }

        };

        orderApp.attStatusMesa(cb, tablesService.getTable().id, status, tablesService.getTable().id_empresa, orderApp.appState.dadosEmpresa.operador.nome + ' finalizou a mesa');

    }



    selecionarItemPagamento(item: any, itemListaPagamentos: any) {
        console.log(item);

        this.state.itemPagamento.forEach((element: any) => {
            element.selecionado = false;
            element.valor = 0;
            element.itens.forEach((element: any) => {
                element.selecionado = false;
                element.valor = 0;
            });
        });



        if (item.disponivel) {

            itemListaPagamentos.selecionado = true;
            itemListaPagamentos.valor = this.state.dadosMesa.total;

            item.selecionado = true;
            item.valor = this.state.dadosMesa.total;

        } else {

            alert('Item de pagamento indisponível');
            return;

        }

        itemListaPagamentos.itemSelecionado = item;
        console.log(itemListaPagamentos);

        this.setState({
            itemPagamento: this.state.itemPagamento
        });


    }

    selecionarFormadePagamento(item: any) {

        this.state.itemPagamento.forEach((element: any) => {
            element.selecionado = false;
            element.valor = 0;

            element.itens.forEach((i: any) => {
                i.selecionado = false;
                i.valor = 0;
            });

        });

        if (item.disponivel) {

            item.selecionado = true;
            item.valor = this.state.dadosMesa.total;

        } else {

            alert('Forma de pagamento indisponível');

        }
        this.setState({
            itemPagamento: this.state.itemPagamento
        });
    }

    checaSelecionadoFP(status: boolean) {
        let x;
        switch (status) {
            case true: { x = styles.itemCartaoMakSelecionado } break;
            case false: { x = styles.itemCartaoMak; } break;

            default: { x = styles.itemCartaoMak; }
        }

        return x;
    }

}

const styles = StyleSheet.create({

    f1: { fontSize: 20, color: 'black' },
    f2: { fontSize: 25, color: 'black' },
    f3: { fontSize: 17, fontWeight: 'bold', color: 'black', padding: 10 },
    f4: { fontSize: 14, color: 'black' },
    f5: { fontSize: 16, color: 'black', fontWeight: 'bold' },


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

    conta: {
        paddingTop: 5,
        paddingBottom: 5,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    cont: {
        paddingTop: 5,
        paddingBottom: 5,
    },

    vi: {
        marginTop: 0,
        width: '75%',
    },

    valores: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 10,
        borderBottomColor: '#e9e5ea',
        borderBottomWidth: 1,
        marginTop: 5,
        paddingBottom: 5,

    },

    cont01: {
        backgroundColor: '#F1F2F5',
        paddingTop: 5,
        paddingBottom: 5,
    },

    container: {
        flex: 1,
        backgroundColor: "white",
    },

    areaItensCart: {
        flex: 1,
        backgroundColor: '#f0f0f0'
    },

    itemCartaoIMG: {
        height: 35,
        width: 45,
    },

    itemCartaoMak: {
        height: 20,
        width: 20,
        backgroundColor: '#E0E0E0',
        borderRadius: 20
    },

    itemCartaoMakSelecionado: {
        height: 20,
        width: 20,
        backgroundColor: '#00af9c',
        borderRadius: 20
    },

    itemCartao: {
        flexDirection: 'row',
        minHeight: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        marginTop: 10
    },

    itemPag: {
        backgroundColor: 'white',
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
        marginLeft: 25
    },

    itemCartaoV1: {
        flexDirection: 'row',

    },
    itemCartaoV2: {
        marginRight: 10
    },
    itemCartaoT1: {
        marginLeft: 10
    },

    botaoConfirmar: {
        backgroundColor: "red",
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        borderRadius: 8
    },
    btCor: {
        color: 'white',
        fontSize: 18
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

    ain: {
        width: '46%',
        margin: 5,

    },
});
