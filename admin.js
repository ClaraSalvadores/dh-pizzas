// Función Require de File System
const fs = require('fs');
//  Variable con la rutaDelArchivo 
const rutaPedidos = `${__dirname}/pedidos.json`;

//  Leer el contenido del archivo Pedidos.json 
const contenidoPedidos = fs.readFileSync(rutaPedidos, 'utf8');
let pedidos = contenidoPedidos.length > 0 ? JSON.parse(contenidoPedidos) : null;

//Condicional si tiene contenido
if (pedidos == null) {
	console.log('No hay pedidos para generar el reporte');
} else {
    console.log("¡Reporte generado con éxito!"+ "\n");
    

    console.log("|===*** Reporte de ventas ***====|"+ "\n");
    let fecha = new Date();
    let fechaReporte = fecha.toLocaleDateString();
    let horaReporte = fecha.toLocaleTimeString();


    console.log("Fecha de generación: "+ fechaReporte);
    console.log("Hora: "+ horaReporte + "\n");

    

    console.log("|===*** Cantidad de Pedidos realizados ***====|");
    console.log(`Total: ${pedidos.length}`+"\n");
    
    console.log("|===*** Cantidad de Pedidos para delivery ***====|");
    let filtrarPorDelivery = delivery => pedidos.filter (pedido => pedido.paraDelivery == delivery).length;
    let deliveryOk = filtrarPorDelivery(true);
    console.log (`Total: ${deliveryOk}`+ "\n");

    console.log("|===*** Cantidad de pizzas vendidas por gustos ***====|");
    
    let filtrarPorGusto = gusto => pedidos.filter(pedido => pedido.gustosPizza == gusto).length;
    let gustoMuzzarela = filtrarPorGusto('Muzzarela');
	let gustoNapolitana = filtrarPorGusto('Napolitana');
	let gustoAmericana = filtrarPorGusto('Americana');
    let gustoFugazzeta = filtrarPorGusto('Fugazzeta');
    
    console.log(`Cantidad de Muzzarela: ${gustoMuzzarela}`);
	console.log(`Cantidad de Napolitana: ${gustoNapolitana}`);
	console.log(`Cantidad de Americana: ${gustoAmericana}`);
    console.log(`Cantidad de Fugazzeta: ${gustoFugazzeta}`+ "\n");

    console.log("|===*** Cantidad de pizzas vendidas por tamaños ***====|");
    
    let filtrarPorTamanio = tamanio => pedidos.filter(pedido => pedido.tamanioPizza == tamanio).length;
    let tamanioGrande = filtrarPorTamanio('Grande');
	let tamanioMediana = filtrarPorTamanio('Mediana');
	let tamanioPersonal = filtrarPorTamanio('Personal');
    
    
    console.log(`Cantidad de Pizzas Grandes: ${tamanioGrande}`);
	console.log(`Cantidad de Pizzas Medianas: ${tamanioMediana}`);
	console.log(`Cantidad de Pizzas Personales: ${tamanioPersonal}`+ "\n");

    console.log("|===*** Cantidad de Pedidos con Bebida ***====|");
    let filtrarPorBebida = bebida => pedidos.filter (pedido => pedido.conBebida == bebida).length;
    let bebidaOk = filtrarPorBebida(true);
    console.log (`Total: ${bebidaOk}`+ "\n");

    console.log("|===*** Cantidad de Clientes Habituales ***====|");
    let filtrarPorClienteHabitual = cliente => pedidos.filter (pedido => pedido.clienteHabitual == cliente).length;
    let clienteOk = filtrarPorClienteHabitual(true);
    console.log (`Total: ${clienteOk}`+ "\n");

    console.log("|===*** Cantidad de Empanadas Regaladas ***====|");
    console.log (`Total: ${clienteOk*3}`);


    let contenidoAGuardar = `
        Fecha del reporte: ${fechaReporte}
        Hora del reporte: ${horaReporte}
        Cantidad total de pedidos: ${pedidos.length}
        Cantidad de Pedidos Delivery: ${deliveryOk}
		Cantidad de Muzzarela: ${gustoMuzzarela}
		Cantidad de Napolitana: ${gustoNapolitana}
		Cantidad de Americana: ${gustoAmericana}
        Cantidad de Fugazzeta: ${gustoFugazzeta}
        Cantidad de Pizzas Grandes: ${tamanioGrande}
	    Cantidad de Pizzas Medianas: ${tamanioMediana}
        Cantidad de Pizzas Personales: ${tamanioPersonal}
        Cantidad de Pedidos con Bebidas: ${bebidaOk}
        Cantidad de Pedidos de Clientes Habituales: ${clienteOk}
        Cantidad de Empanadas Regaladas: ${clienteOk*3}
	`;

    fs.writeFileSync(`${__dirname}/reporte.txt`, contenidoAGuardar);

    }