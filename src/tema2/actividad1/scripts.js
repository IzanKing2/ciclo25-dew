// Variables
let numEmployer; // Número de empleados

// Datos del empleado
let nombre;
let horas;
let pagoxh;

let empleadoDelete; // Empleado a eliminar

// Datos del sueldo
let sueldo;
let extra; // Horas extra
let impuestos;
let sueldoNeto;

// Lista de datos solicitadas
let empleadosList = new Array(); // [Izan, Diego]
let sueldosBrutosList = new Array(); // [20, 10]
let sueldosNetosList = new Array(); // [11, 50]

// ————————————————————————————————————————

// Pedimos el número de empleados a introducir
num_employer = prompt("Número de empleados a registrar: ");

// Bucle para introducir los datos del empleado
for (let i=0; i < num_employer; i++) {
    nombre = prompt("Nombre: ");
    horas = prompt("Horas trabajadas: ");
    pagoxh = prompt("Pago por horas: ");
    empleadosList.push(nombre); // Añadimos un empleado a la lista

    if (horas <= 40) { // 'Si trabajó 40 horas o menos, el sueldo es horas × pago por hora.'
        sueldo = horas * pagoxh;
        sueldosBrutosList.push(sueldo); // Añadimos sueldo bruto
    } else { // 'Si trabajó más de 40 horas, las horas extras se pagan al 150%.'
        sueldo = 40 * pagoxh;
        extra = (horas - 40) * (pagoxh * 1.5);
        sueldosBrutosList.push(sueldo + extra); // Añadimos sueldo bruto
    }

    // Calculamos los inpuestos que se le cobran en cada caso
    if (sueldosBrutosList[i] > 1000) {
        impuestos = sueldosBrutosList[i] * 0.10; // 10% del bruto
    } else {
        impuestos = sueldosBrutosList[i] * 0.05; // 5% del bruto
    }

    sueldoNeto = sueldosBrutosList[i] - impuestos;
    sueldosNetosList.push(sueldoNeto) // Añadimos el sueldo neto a la lista sueldosNetosList
}

// Mostramos los datos del empleado y sus sueldos
for (let i=0; i < empleadosList.length; i++) {
    document.write(i + ". Nombre: " + empleadosList[i] + " | Sueldo bruto: " + sueldosBrutosList[i] + "€ | Sueldo neto: " + sueldosNetosList[i] + "€</br>");
}

let eliminar = prompt("¿Quieres eliminar un usuario?(s/n)");
if (eliminar == "s") {
    // Eliminamos un empleado junto a sus sueldos
    empleadoDelete = prompt("Empleado a eliminar:");
    let index = empleadosList.indexOf(empleadoDelete);

    if (index !== -1) {
        delete empleadosList[index];
        delete sueldosBrutosList[index];
        delete sueldosNetosList[index];
    }
    
    document.write("</br>"); // Añadimos salto de linea

    // Mostramos los datos del empleado y sus sueldos una vez eliminado el empleado
    for (let i=0; i < empleadosList.length; i++) {
        if (empleadosList[i] === undefined) continue; // salta los huecos creados por 'delete'
        document.writeln(i + ". Nombre: " + empleadosList[i] + " | Sueldo bruto: " + sueldosBrutosList[i] + "€ | Sueldo neto: " + sueldosNetosList[i] + "€</br>");
    }
}