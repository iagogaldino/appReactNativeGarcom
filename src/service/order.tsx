import api from "./api";


let appState = {
  token: '',
  idEmpresa: 0,
  dadosEmpresa: {nome: '', telefone: '', formaspagamento: [], imagem: '', operador: {nome: ''}},
  cardapio: [{itens: []}],
  statusConsultaCardapio: false,
  statusMesasCarregadas: false,
  qntProdutosEmpresa: 0
}

let navigation: any;
let nomeEmpresa: any;


let order_ = {
  id: 0,
  id_pedido: 0,
  id_empresa: 0,
  observacao: '',
  statusAcaoPedido: false, // false = ADD PEDIDO , TRUE == Editar pedido
  cliente: { nome: '', telefone: '', id: 0 },
  itens: [],
  subtotal: 0,
  origempedido: '',
  status_pedido: 1,
  formasPagamento: [],
  formapagamento: { tipo: '', troco: 0, nome: 'false' },
  item_pagamento: { id: '', nome: '', status: false },
  desconto: 0,
  cupom: '',
  total: 0,
  total_pedido: 0,
  taxaentrega: 0,
  taxaextra: '',
  tipopedido: 'false',
  endereco: {
    rua: '',
    numero: '',
    bairro: {},
    complemento: '',
    cidade: {},
    estado: '',
    pais: 'Brasil',
    latitude: '',
    longetude: '',
    tiporesidencia: ''
  },
  empresa: {
    id: '',
    imagem: '',
    nome: '',
    telefone: '',
  },
  pagcred: false,
  credito: 0,
  itensTABLE: [],
};


const sendOrder = (cb?: Function) => {
  let paramsSender = {
    api: 'apiEstabelecimento',
    "token": appState.token,
    "acao": 'adicionar_pedido',
    "obj[id_pedido]": order_.id,
    "obj[id_empresa]": orderApp.getIDEmpresa(),
    "obj[cliente][nome]": order_.cliente.nome,
    "obj[cliente][telefone]": order_.cliente.telefone,
    "obj[cliente][id]": order_.cliente.id,
    "obj[subtotal]": order_.tipopedido,
    "obj[origempedido]": order_.origempedido,
    "obj[formapagamento]": "limpo",
    "obj[formapagamento][tipo]": "limpo",
    "obj[statusAcaoPedido]": order_.statusAcaoPedido,
    "obj[desconto]": 0,
    "obj[cupom]": order_.cupom,
    "obj[total_pedido]": order_.total_pedido,
    "obj[taxaentrega]": order_.taxaentrega,
    "obj[tipopedido]": order_.tipopedido,

    "obj[endereco][rua]": order_.endereco.rua,
    "obj[endereco][numero]": order_.endereco.numero,
    "obj[endereco][complemento]": order_.endereco.complemento,
    "obj[endereco][bairro][id]": 0,
    "obj[endereco][bairro][nome]": order_.endereco.bairro,
    "obj[endereco][cidade][id]": 0,
    "obj[endereco][cidade][nome]": order_.endereco.cidade,
    "obj[endereco][estado]": "",
    "obj[endereco][pais]": "Brasil",
    "obj[endereco][latitude]": "",
    "obj[endereco][longetude]": "",
    "obj[endereco][tiporesidencia]": "",
    "obj[empresa][id]": orderApp.getIDEmpresa(),
    "obj[empresa][imagem]": order_.empresa.imagem,
    "obj[empresa][nome]": order_.empresa.nome,
    "obj[empresa][telefone]": order_.empresa.telefone,

  }


  let key = 0;
  let arrayItens: any = {};

  order_.itensTABLE.forEach((item: any) => {
    arrayItens['obj[itens][' + key + '][id]'] = item.id;
    arrayItens['obj[itens][' + key + '][nome]'] = item.nome;
    arrayItens['obj[itens][' + key + '][observacao]'] = item.observacao;
    arrayItens['obj[itens][' + key + '][qnt]'] = item.qnt;
    arrayItens['obj[itens][' + key + '][preco]'] = item.preco;
    arrayItens['obj[itens][' + key + '][total]'] = item.total;
    key++;
  });

  Object.assign(paramsSender, arrayItens);

  // console.log('paramsSender', paramsSender);
  // return;//REMOVER

  const response: any = api.post('?api=apiEstabelecimento', null, { params: paramsSender }).then((response) => {

    const responseJSON = JSON.parse(
      JSON.stringify(response.data)
    );

    if (cb) {
      cb(response.data);
    } else { console.log('Nenhuma funcao callback definida'); }
  });
}




const adicionarProdutoPedido = (success: any, parametros: any) => {
  console.log('adicionarProdutoPedido');
  const response: any = api.post('?api=adicionarProdutoPedido', parametros,
    {
      params: {
        api: 'apiEstabelecimento',
        "token": appState.token,
        "acao": "adicionarProdutoPedido",
      },


    }
  ).then((response) => {

    if (success) { 
      success(response.data); 
    }

  });
}

const attStatusMesa = (success: any, idMesa: any, status: number, idEmpresa: number, motivo: string) => {
  console.log('FECHAR MESA');
  const response: any = api.post('?api=apiEstabelecimento', null,
    {
      params: {
        "token": appState.token,
        "acao": "att_status_pedido",
        "obj[id_pedido]": idMesa,
        "obj[status]": status,
        "obj[id_empresa]": idEmpresa,
        "obj[params][motivo]": motivo,
      },


    }
  ).then((response) => {

    if (success) { 
      success(response.data); 
    }

  });
}

const getOrders = (success: any) => {
  console.log('getIdEmpresa()', getIdEmpresa());
  console.log('ttt()', getToken());
  const response: any = api.post('?api=apiEstabelecimento', null, {
    params: {
      api: 'apiEstabelecimento',
      "token": appState.token,
      "acao": "pedidos",
      "tipoFiltro": "APPMESA",
      "id": getIdEmpresa(),
    }
  }).then((response) => {
    if (success) {
      success(response.data);
    }
  });
}

const consultaTodosPedidos = (success: any, datainicio: string, datafim: string) => {
  console.log('getIdEmpresa()', getIdEmpresa());
  console.log('ttt()', getToken());
  const response: any = api.post('?api=apiEstabelecimento', null, {
    params: {
      api: 'apiEstabelecimento',
      "token": appState.token,
      "acao": "consulta_todos_pedidos",
      "id": getIdEmpresa(),
      "tipoFiltro": "APPMESA",
      "obj[datai]": datainicio,
      "obj[dataf]": datafim,
    }
  }).then((response) => {
    if (success) {
      success(response.data);
    }
  });
}
 

const ADDFp = (success: any, params: Object) => {
  const response: any = api.post('?api=apiEstabelecimento', params, {
    params: {
      api: 'apiEstabelecimento',
      "token": appState.token,
      "acao": "adicionaFormaPagamentoPedido",
      "id": getIdEmpresa(),
    }
  }).then((response) => {
    if (success) {
      success(response.data);
    }
  });
}

const AttTaxas = (success: any, params: Object) => {
  const response: any = api.post('?api=apiEstabelecimento', params, {
    params: {
      api: 'apiEstabelecimento',
      "token": appState.token,
      "acao": "adicionarTaxasPedido",
      "id": getIdEmpresa(),
    }
  }).then((response) => {
    if (success) {
      success(response.data);
    }
  });
}

const ConsultaItensPedido = (success: any, params: Object) => {
  const response: any = api.post('?api=apiEstabelecimento', params, {
    params: {
      api: 'apiEstabelecimento',
      "token": appState.token,
      "acao": "itensPedido",
      "id": getIdEmpresa(),
    }
  }).then((response) => {
    if (success) {
      success(response.data);
    }
  });
}

const ConsultaCardardapio = (success: any, params: Object) => {
  const response: any = api.post('?api=apiEstabelecimento', params, {
    params: {
      api: 'apiEstabelecimento',
      "token": appState.token,
      "acao": "cardapio",
      "id": getIdEmpresa(),
      'acmenu': "listar",
    }
  }).then((response) => {
    if (success) {
      success(response.data);
    }
  });
}

const Login = (success: any, email: string, senha: string) => {
  console.log('email' + email);
  console.log('senha' + senha);
  const response: any = api.post('?api', {}, {
    params: {
      "api": 'apiEstabelecimento',
      "acao": "login_emrpesa",
      "obj[email]": email,
      "obj[senha]": senha,
    }
  }).then((response) => {
    if (success) {
      success(response.data);
    }
  });
}


const getToken = () => {
  return appState.token;
}

const setToken = (token: string) => {
  return appState.token = token;
}

const setIdEmpresa = (idEmpresa: number) => {
  return appState.idEmpresa = idEmpresa;
}

const getIdEmpresa = () => {
  return appState.idEmpresa;
}

const orderApp = {
  order: order_,
  adicionarProduto: adicionarProdutoPedido,
  sendOrderToDash: sendOrder,
  getOrderDash: getOrders,
  getToken: getToken,
  setIDEmpresa: setIdEmpresa,
  getIDEmpresa: getIdEmpresa,
  setToken: setToken,
  attStatusMesa: attStatusMesa,
  addFpPedido: ADDFp,
  AttTaxas: AttTaxas,
  appState: appState,
  consultaItensPedido: ConsultaItensPedido,
  consultaTodosPedidos: consultaTodosPedidos,
  consultaCardardapio: ConsultaCardardapio,
  login: Login,
  navigation: navigation,
  nomeEmpresa: nomeEmpresa,
}  
 
export default orderApp;