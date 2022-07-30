/// VARIABLES
const anioActual = 2022;
let cantidadPersonas = prompt('Ingrese la cantidad de personas:');
var edadPersona = "";
var anioNacimiento = 0;

/// CICLO 
for (let i = 1; i <= cantidadPersonas; i++) {
    anioNacimiento = 0;
    edadPersona = prompt("Ingrese la edad de la persona " + i + ":");

    if (edadPersona != "") {
        anioNacimiento = anioActual - edadPersona;

        if (anioNacimiento < 0) {
            alert("ERROR! La edad ingresada es muy alta.");
            break;
        }

        alert("La persona " + i + " nació en el año " + anioNacimiento);
    } else {
        alert("ERROR! Ingrese una edad valida para la persona " + i);
        break;
    }
}