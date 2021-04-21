import Table from "./interfaceTable";

   
   let tables = [
        { name: "01", itens: [], value: 150, statusName: "Disponível", status: 0 },
    ]


    let tableSelected: Table;
 
 
    const addTable =  (nameT: string, valueT: number, statusNameT: string, statusT: number) => {
        if (!nameT) { console.warn('Informe o nome da mesa'); return false;}
        if (nameT.length > 3) { console.warn('O nome da mesa só pode ter até 3 caracteres'); return false;}
        // if (!valueT) { console.warn('Informe o valor total da mesa'); return false;}
        if (!statusNameT) { console.warn('Informe o status texto da mesa'); return false;}
        if (statusT != 0 && statusT != 1) { console.warn('Informe o valor do status da mesa 0/1'); return false;}

        const newTable = { name: nameT, itens: [], value: valueT, statusName: statusNameT, status: statusT }
        tables.push(newTable);
        console.log('Mesa adicionada');
        // console.log(tables);
        return true;
    }
    
    const selectTable = (table: any) => {
        if (!table) {  console.warn('no table whas selected!'); return;}
        // console.log('#tables.serviceset -> Table', table)
        tableSelected = table;
    }

    const gelectTableSelected = () : Table => { 
        // console.log('#tables.serviceset -> Table', tableSelected)
        return tableSelected;
    }

    const getTables = () => {
        return tables;
    }

    const addProductToTable = (table: any, product: any) => {
        table.itens.push(product);
        console.log('Product added to table');
        // console.log(tableSelected);
    }

    const removeProductToTable = (table: any, product: any) => {
     
            table.itens.forEach((element: any) => {
            if (element === product) {
                console.log('Remove: ', element.nome);
                table.itens.splice(0, 1, element);
            }
            console.log(element.nome);
        });

        
    }

    const serviceTables = ({
        getTablesArray: getTables(),
        addTablesArray: addTable,
        setTable: selectTable,
        getTable: gelectTableSelected,
        addProduct: addProductToTable,
        remmoveProduct: removeProductToTable,
    });
    

    export default serviceTables;
    

