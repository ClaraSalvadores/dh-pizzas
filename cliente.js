// Función Require de inquirer
const inquirer = require("inquirer");

// Función Require de File System
const fs = require('fs');

// Preguntas
let preguntasDelivery = [ 
// Pregunta a - Delivery T/F
    {
    type:"confirm",
    name: "paraDelivery",
    message: "¿Te llevamos la pizza?",
    default: false
    },
// Pregunta b - Si delivery es True, pregunta domicilio y valida que el campo no esté vacío
    {
    type:"input",
    name: "direccion",
    message: "¿Cuál es la dirección de entrega? (Ingresá Calle, Piso, Departamento)",
    when: function (respuestas) {
        return respuestas.paraDelivery;
    },
    validate: function (respuestaDeEstaPregunta) {
        if (respuestaDeEstaPregunta.trim() === "") {
            return 'Necesitamos saber la dirección para llevarte la pizza :)';
        }
        return true;
    }
    },
// Pregunta c - Nombre
    {
    type: "input",
    name: "nombreCliente",
    message: "Ingresá tu nombre",
    validate: function (respuestaDeEstaPregunta){
        if (respuestaDeEstaPregunta.trim() === ""){
            return "¡Hey, ninja! Necesitamos saber tu nombre, queda entre nosotros ;)";
        }
        return true;
    }
    },
// Pregunta d - Teléfono
    {
    type: "input",
    name: "telefono",
    message: "Ingresá tu número de teléfono",
    validate: function (respuestaDeEstaPregunta){
        if (respuestaDeEstaPregunta.trim() === ""){
            return "Por favor, ingresá un número de teléfono ;)";
        }
        else if (isNaN(respuestaDeEstaPregunta)){
            return "Por favor, ingresá sólo números";
        }
        return true;
        }
    },
// Pregunta e - Gustos de la Pizza
    {
    type: "rawlist",
    name: "gustosPizza",
    message: "¿De qué gusto querés la pizza?",
    choices: ["Muzzarela", "Napolitana", "Americana", "Fugazzeta"],
    default: "Muzzarela"
    },
// Pregunta f - Tamaño de la Pizza
    {
        type: "list",
        name: "tamanioPizza",
        message: "¿De qué tamaño querés la pizza?",
        choices: ["Grande", "Mediana", "Personal"],
        default: "Grande"
    },
// Pregunta g - Pregunta por Bebida T/F
    {
        type: "confirm",
        name: "conBebida",
        message: "¿Querés agregar bebida?",
        default: false
    },
// Pregunta h - Si bebida es True, pregunta cuál
    {
        type: "list",
        name: "gustosBebida",
        message: "¿De qué gusto querés la bebida?",
        choices: ["Coca-Cola", "Sprite", "Fanta", "Paso de los Toros Pomelo", "Paso de los Toros Tónica"],
        when: function (respuestaDeEstaPregunta) {
            return respuestaDeEstaPregunta.conBebida;
        },
        default: "Coca-Cola"
    },
// Pregunta i - Pregunta si es Cliente habitual T/F
    {
    type: "confirm",
    name: "clienteHabitual",
    message: "¿Ya pediste antes?",
    default: false
    },
// Pregunta j - Si es cliente habitual, pregunta por empanadas
    {
        type: "checkbox",
        name: "gustosEmpanadas",
        message: "Por ser cliente habitual, te regalamos 3 empanadas ¿De qué gusto las querés?",
        choices: ["Carne", "Jamón y Queso", "Pollo", "Verdura", "Carne Picante", "Cebolla y Queso"],
        when: function (respuestaDeEstaPregunta) {
            return respuestaDeEstaPregunta.clienteHabitual;
        },
        validate: function (cantidad) {
			if (cantidad.length < 3 || cantidad.length > 3) {
				return "Por favor, elegí 3 gustos";
			}
			return true;
		}
    },


];
//Bienvenida
console.log('Bienvenido a DH Pizzas. Estamos listos para tomar tu pedido');

const functionDelThen = rtas => {

//Resumen del pedido 
    console.log("=== Resumen de tu pedido ===");
    console.log("Tus datos son - Nombre: " + rtas.nombreCliente + " / Teléfono:  "+ rtas.telefono);
            
	    if (rtas.paraDelivery === true) {
		console.log('Tu pedido será entregado en: ' + rtas.direccion);
		} else {
		console.log('Nos indicaste que pasarás a retirar tu pedido');
		};
        console.log('=== Productos solicitados ===');
        console.log('Pizza: ' + rtas.gustosPizza);
        console.log('Tamaño: ' + rtas.tamanioPizza);
    
        if (rtas.conBebida === true) {
            console.log('Bebida: ' + rtas.gustosBebida);
        } else {
            console.log();
        };
        if (rtas.clienteHabitual === true) {
            console.log('Tus tres empanadas de regalo serán de: ' + "\n" +
            "• " + "Gusto Empanada 1: " + rtas.gustosEmpanadas[0] + "\n" +
            "• " + "Gusto Empanada 2: " + rtas.gustosEmpanadas[1] + "\n" +
            "• " + "Gusto Empanada 3: " + rtas.gustosEmpanadas[2]);
        } else {
            console.log();
        };

        console.log('===============================');
// Precios
    let precioDelivery = 0;    
    let precioPizza = 0;
	let precioBebida = 0; 
    let descuento = 0;
    
//Total productos: 
if (rtas.conBebida=== true){
    precioBebida = 80;
};

switch (rtas.tamanioPizza) {
    case "Personal":
        descuento = rtas.conBebida ? 0.03 : 0;
        precioPizza = 430 + precioBebida;
        break;
    case 'Mediana':
        descuento = rtas.conBebida ? 0.05 : 0;
        precioPizza = 560 + precioBebida;
        break;
    default:
        descuento = rtas.conBebida ? 0.08 : 0;
        precioPizza = 650 + precioBebida;
        break;
}

console.log("Total Productos: $" + precioPizza); 
//Total delivery: 
if (rtas.paraDelivery=== true){
    precioDelivery = 20;
};
console.log("Total delivery: $" + precioDelivery);

//Descuentos: 
console.log("Descuentos: $" + descuento*precioPizza);

//TOTAL: 
console.log("Total: $" + (precioPizza + precioDelivery - (precioPizza*descuento)));

console.log('===============================');
console.log("Gracias por comprar en DH Pizzas. Esperamos que disfrutes tu pedido.");


// Versión 3
//PUNTO H - Agregar fechas
let fecha = new Date();
let fechaPedido = fecha.toLocaleDateString();
let horaPedido = fecha.toLocaleTimeString();

// PUNTO I -Agregando Data Adicional
let dataAdicional = {
    fecha: fechaPedido,
    hora: horaPedido,
    totalProductos: precioPizza,
    descuento: descuento*precioPizza,
}

// PUNTO F - Variable con la rutaDelArchivo 
const rutaDelArchivo = __dirname + '/pedidos.json';

// PUNTO G- Leo el archivo para saber si tiene algo RUTA DEL ARCHIVO + CODIFICACIÓN
    let contenidoPedidos = fs.readFileSync(rutaDelArchivo, 'utf8');
    // tiene que haber array de pedidos - cada pedido es un obj lit   
    let arrayPedidos = contenidoPedidos.length == 0 ? [] : JSON.parse(contenidoPedidos);

// Spread Operator - para agregar lo adicional + el nro de pedido al obj de rtas
rtas = {
    nroDePedido: arrayPedidos.length + 1,
    ...rtas,
    ...dataAdicional,
};

arrayPedidos.push(rtas);

fs.writeFileSync(rutaDelArchivo, JSON.stringify(arrayPedidos, null, ""));
	
}


//Ejecución del inquirer
inquirer
.prompt(preguntasDelivery)
.then(functionDelThen)