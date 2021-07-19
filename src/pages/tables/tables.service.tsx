import Table from "./interfaceTable";
import orderApp from "./../../service/order";

let tables: Array<Table>;

let tableSelected: Table;

const addTable = (
  nameT: string,
  valueT: number,
  statusNameT: string,
  statusT: number,
  cb: Function
) => {
  if (!nameT) {
    cb({ erro: true, detalhes: 'Informe o nome da mesa' });
    return;
  }
  if (nameT.length > 30) {
    cb({ erro: true, detalhes: 'O nome da mesa só pode ter até 30 caracteres' });
    return;
  }
  // if (!valueT) { console.warn('Informe o valor total da mesa'); return false;}
  if (!statusNameT) {
    cb({ erro: true, detalhes: 'Informe o status texto da mesa' });
    return;
  }
  if (statusT != 0 && statusT != 1) {
    console.warn("Informe o valor do status da mesa 0/1");
    cb({ erro: true, detalhes: 'Informe o valor do status da mesa 0/1' });
    return;

  }

  orderApp.order.statusAcaoPedido = false;
  orderApp.order.cliente.nome = nameT;
  orderApp.order.cliente.telefone = '74988578851';
  orderApp.order.cliente.id = 0;
  orderApp.order.empresa.id = orderApp.getIDEmpresa().toString();
  orderApp.order.empresa.nome = orderApp.appState.dadosEmpresa.nome;
  orderApp.order.empresa.telefone = "74988420307";
  orderApp.order.endereco.bairro = "";
  orderApp.order.endereco.cidade = "Juazeiro";
  orderApp.order.endereco.numero = "";
  orderApp.order.id_empresa = orderApp.getIDEmpresa();
  orderApp.order.origempedido = "App Mesa";
  orderApp.order.observacao = "Pedido feito pelo aplicativo de mesa";
  orderApp.order.subtotal = 10000000;
  orderApp.order.tipopedido = "retirada";
  orderApp.order.total = 100000;


  orderApp.sendOrderToDash((response: any) => {
    console.log('sendOrderToDash', response);
    cb(response);
  });

  return true;
};

const selectTable = (table: any) => {
  if (!table) {
    console.warn("no table whas selected!");
    return;
  }
  // console.log('#tables.serviceset -> Table', table)
  table.id_pedido = table.id;
  tableSelected = table;
};

const gelectTableSelected = (): Table => {
  // console.log('#tables.serviceset -> Table', tableSelected)
  return tableSelected;
};

const getTables = () => {
  return tables;
};

const addProductToTable = (table: any, product: any, cb: Function) => {
  let totalCarinho = 0;
  try {
    table.itens.push(product);
    console.log("Product added to table");

    table.itens.forEach((element: any) => {
      totalCarinho += element.preco * element.qnt;
    });

    console.log('total', totalCarinho)
    orderApp.order.id = tableSelected.id_pedido;
    orderApp.order.id_empresa = tableSelected.id_empresa;

    const params = {
      "adicionais": [],
      "idPedido": tableSelected.id,
      "idProduto": product.id,
      "qtd": product.qnt,
      "observacao": product.observacao,
      "idEmpresa": tableSelected.id_empresa,
      "tipoacao": "ADD",
      "idItemRemover": 0
    };
    console.log(params);
    orderApp.adicionarProduto(cb, params);

  } catch (e) {
    console.log("Error!", e);
  }
};

const removeProductToTable = (product: any, cb: Function)=> {

  
  try {

   const params = {
      "idPedido": tableSelected.id,
      "idProduto": product.id,
      "idEmpresa": tableSelected.id_empresa,
      "tipoacao": "REMOVER",
      "idItemRemover": product.id
    };
    orderApp.adicionarProduto(cb, params);

  } catch (e) {
    console.log("Error!", e);
  }

};

const removeTableArray = () => {
  const a: any = tableSelected;
  tables.splice(tables.indexOf(a), 1);
};

const serviceTables = {
  getTablesArray: getTables(),
  addTablesArray: addTable,
  setTable: selectTable,
  getTable: gelectTableSelected,
  addProduct: addProductToTable,
  remmoveProduct: removeProductToTable,
  remmoveTable: removeTableArray,
};

export default serviceTables;
