/// VARIABLES
const anioActual = 2022;
let cantidadPersonas = prompt('Ingrese la cantidad de personas:');
let edadPersona = "";
let anioNacimiento = 0;  /* Mejor usar let en vez de var, esta deprecado :)*/

/// CICLO 
for (let i = 1; i <= cantidadPersonas; i++) {
    anioNacimiento = 0;
    edadPersona = prompt("Ingrese la edad de la persona " + i + ":");

    if (edadPersona >= 1 && edadPersona <= 110 /* Es mejor asi, te fijas que este dentro de ese rango y te ahorras validar mas abajo ;) */) {
        anioNacimiento = anioActual - edadPersona;

        alert("La persona " + i + " nació en el año " + anioNacimiento);
    } else {
        alert(`ERROR! ${edadPersona} no es una edad valida para la persona ${i}`); /* Forma interesante para interpolar strings con variables, se usan (``) y las variables entre ${} */
        break;
    }
}
