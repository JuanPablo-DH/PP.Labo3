/* Juan Pablo, Dongo Huaman 3°C Primer Parcial Labo 3

1) Implementar las siguientes Clases.

*/

class Vehiculo
{
    static stringJsonVehiculos = '[{"id":14,  "modelo":"Ferrari F100",          "anoFab":1998,  "velMax":400, "cantPue":2, "cantRue":4},' +
                                 ' {"id":51,  "modelo":"DodgeViper",            "anoFab":1991,  "velMax":266, "cantPue":2, "cantRue":4},' +
                                 ' {"id":67,  "modelo":"Boeing CH-47 Chinook",  "anoFab":1962,  "velMax":302, "altMax":6,  "autonomia":1200},' +
                                 ' {"id":666, "modelo":"Aprilia RSV 1000 R",    "anoFab":2004,  "velMax":280, "cantPue":0, "cantRue":2},' +
                                 ' {"id":872, "modelo":"Boeing 747-400",        "anoFab":1989,  "velMax":988, "altMax":13, "autonomia":13450},' +
                                 ' {"id":742, "modelo":"Cessna CH-1 SkyhookR",  "anoFab":1953,  "velMax":174, "altMax":3,  "autonomia":870}]';

    constructor(pId, pModelo, pAnoFab, pVelMax)
    {
        this.id = pId;
        this.modelo = pModelo;
        this.anoFab = pAnoFab;
        this.velMax = pVelMax;
    }

    toString()
    {
        return "ID: " + this.id + " MODELO: " + this.modelo + " AÑO FABRICACION: " + this.anoFab + " VELOCIDAD MAXIMA: " + this.velMax;
    }

    static esAereo(pVehiculo)
    {
        return (pVehiculo instanceof Aereo) || (pVehiculo && pVehiculo.altMax) || (pVehiculo && pVehiculo.cantPue == "--") || (pVehiculo && pVehiculo.altMax >= 0);
    }

    static esTerrestre(pVehiculo)
    {
        return (pVehiculo instanceof Terrestre) || (pVehiculo && pVehiculo.cantPue) || (pVehiculo && pVehiculo.altMax == "--") || (pVehiculo && pVehiculo.cantPue >= 0);
    }
}

class Aereo extends Vehiculo
{
    constructor(pId, pModelo, pAnoFab, pVelMax, pAltMax, pAutonomia)
    {
        super(pId, pModelo, pAnoFab, pVelMax)
        this.altMax = pAltMax;
        this.autonomia = pAutonomia;
    }

    toString()
    {
        return super.toString() + " ALTURA MAXIMA: $" + this.altMax + " AUTONOMIA: " + this.autonomia;
    }
}

class Terrestre extends Vehiculo
{
    constructor(pId, pModelo, pAnoFab, pVelMax, pCantPue, pCantRue)
    {
        super(pId, pModelo, pAnoFab, pVelMax)
        this.cantPue = pCantPue;
        this.cantRue = pCantRue;
    }

    toString()
    {
        return super.toString() + " CANTIDAD PUERTAS: $" + this.cantPue + " CANTIDAD RUEDAS: " + this.cantRue;
    }
}

function $(pId)
{
    return document.getElementById(pId);
}

/*  Juan Pablo, Dongo Huaman 3°C Primer Parcial Labo 3

2) Dada la siguiente cadena de caracteres, generar un Array de objetos de la jerarquía del punto 1. 

*/

function ArrayJsonToArrayVehiculos(pArray)
{
    let ret = [];

    if(pArray)
    {
        for(let i=0; i<pArray.length; i++)
        {
            if(Vehiculo.esAereo(pArray[i]))
            {
                ret.push(new Aereo(pArray[i].id,
                                   pArray[i].modelo,
                                   pArray[i].anoFab,
                                   pArray[i].velMax,
                                   pArray[i].altMax,
                                   pArray[i].autonomia));
            }
            else if(Vehiculo.esTerrestre(pArray[i]))
            {
                ret.push(new Terrestre(pArray[i].id,
                                       pArray[i].modelo,
                                       pArray[i].anoFab,
                                       pArray[i].velMax,
                                       pArray[i].cantPue,
                                       pArray[i].cantRue));
            }
        }
    }

    return ret;
}

function punto_Dos()
{
    let jsonVehiculos = JSON.parse(Vehiculo.stringJsonVehiculos);
    console.log("Punto 2)");
    console.log(ArrayJsonToArrayVehiculos(jsonVehiculos));
}

punto_Dos();

/*  Juan Pablo, Dongo Huaman 3°C Primer Parcial Labo 3

3)Implementar los siguientes Formularios (utilizar Estilos):

Ver HTML

*/

/*  Juan Pablo, Dongo Huaman 3°C Primer Parcial Labo 3

4-a) Mostrar en “Form Datos” la información de los objetos generados en
     el punto 2.

*/

function crearFila()
{
    return document.createElement("tr");
}

function crearCelda(dato)
{
    let td = document.createElement("td");
    td.appendChild(document.createTextNode(dato));
    return td;
}

function tabla_alta(pVehiculo)
{
    if(pVehiculo)
    {
        let tabla = $("tabla");
        let fila = crearFila();
        
        fila.setAttribute("id", pVehiculo.id);

        if(Vehiculo.esAereo(pVehiculo))
        {
            fila.appendChild(crearCelda(pVehiculo.id));
            fila.appendChild(crearCelda(pVehiculo.modelo));
            fila.appendChild(crearCelda(pVehiculo.anoFab));
            fila.appendChild(crearCelda(pVehiculo.velMax));
            fila.appendChild(crearCelda(pVehiculo.altMax));
            fila.appendChild(crearCelda(pVehiculo.autonomia));
            fila.appendChild(crearCelda("--"));
            fila.appendChild(crearCelda("--"));
        }
        else if(Vehiculo.esTerrestre(pVehiculo))
        {
            fila.appendChild(crearCelda(pVehiculo.id));
            fila.appendChild(crearCelda(pVehiculo.modelo));
            fila.appendChild(crearCelda(pVehiculo.anoFab));
            fila.appendChild(crearCelda(pVehiculo.velMax));
            fila.appendChild(crearCelda("--"));
            fila.appendChild(crearCelda("--"));
            fila.appendChild(crearCelda(pVehiculo.cantPue));
            fila.appendChild(crearCelda(pVehiculo.cantRue));
        }

        tabla.appendChild(fila);
    }
}

function punto_Cuatro_A()
{
    let arrayVehiculos = ArrayJsonToArrayVehiculos(JSON.parse(Vehiculo.stringJsonVehiculos));

    for(let i=0; i<arrayVehiculos.length; i++)
    {
        tabla_alta(arrayVehiculos[i]);
    }
}

punto_Cuatro_A();

/*  Juan Pablo, Dongo Huaman 3°C Primer Parcial Labo 3

4-b) Filtrar los datos de los objetos mostrados en “Form Datos” acorde al filtro Seleccionado cuando cambie el valor del
     control (Todos/Terrestre/Aereo).

*/

function tabla_getFilas()
{
    return $("tabla").getElementsByTagName("tr");
}

function tabla_celdasToVehiculo(pCeldas)
{
    let ret = null;

    if(pCeldas)
    {
        if(pCeldas[4].textContent != "--")
        {
            ret = new Aereo(pCeldas[0].textContent,
                            pCeldas[1].textContent,
                            pCeldas[2].textContent,
                            pCeldas[3].textContent,
                            pCeldas[4].textContent,
                            pCeldas[5].textContent);
        }
        else if(pCeldas[6].textContent != "--")
        {
            ret = new Terrestre(pCeldas[0].textContent,
                                pCeldas[1].textContent,
                                pCeldas[2].textContent,
                                pCeldas[3].textContent,
                                pCeldas[6].textContent,
                                pCeldas[7].textContent);
        }
    }

    return ret;
}

function tabla_getArrayVehiculos()
{
    let filas = tabla_getFilas();
    let ret = [];

    for(let i=1; i<filas.length; i++)
    {
        let celdas = filas[i].getElementsByTagName("td");
        ret.push(tabla_celdasToVehiculo(celdas));
    }

    return ret;
}

function tabla_ocultarTodos()
{
    let filas = tabla_getFilas();

    for(let i=1; i<filas.length; i++)
    {
        filas[i].style.display = "none";
    }
}

function tabla_mostrarTodos()
{
    let filas = tabla_getFilas();

    for(let i=1; i<filas.length; i++)
    {
        filas[i].style.display = "table-row";
    }
}

function tabla_mostrarSoloAereos()
{
    let arrayVehiculos = tabla_getArrayVehiculos();
    let arrayFiltrado = arrayVehiculos.filter((elemento, indice, array) => {
        return Vehiculo.esAereo(elemento);
    });

    tabla_ocultarTodos();

    let filas = tabla_getFilas();

    for(let i=1; i<filas.length; i++)
    {
        let idFila = filas[i].getAttribute("id");

        for(let j=0; j<arrayFiltrado.length; j++)
        {
            if(arrayFiltrado[j].id == idFila)
            {
                filas[i].style.display = "table-row";
            }
        }
    }
}

function tabla_mostrarSoloTerrestres()
{
    let arrayVehiculos = tabla_getArrayVehiculos();
    let arrayFiltrado = arrayVehiculos.filter((elemento, indice, array) => {
        return Vehiculo.esTerrestre(elemento);
    });

    tabla_ocultarTodos();

    let filas = tabla_getFilas();

    for(let i=0; i<filas.length; i++)
    {
        let idFila = filas[i].getAttribute("id");

        for(let j=0; j<arrayFiltrado.length; j++)
        {
            if(arrayFiltrado[j].id == idFila)
            {
                filas[i].style.display = "table-row";
            }
        }
    }
}

function eventoFiltrar(e)
{
    let comboxFiltrar = $("comboxFiltrar");

    switch(comboxFiltrar.value)
    {
        case "todos":
            tabla_mostrarTodos();
            break;

        case "aereos":
            tabla_mostrarSoloAereos();
            break;

        case "terrestres":
            tabla_mostrarSoloTerrestres();
            break;
    }
}
$("comboxFiltrar").addEventListener("change", eventoFiltrar);

/*  Juan Pablo, Dongo Huaman 3°C Primer Parcial Labo 3

4-c) Al hacer Click en el botón “Calcular”, debe mostrarse la velocidad maxima promedio de los elementos filtrados. Utilizar
     Map/Reduce/Filter

*/

function eventoCalcular(e)
{
    let arrayVehiculos = tabla_getArrayVehiculos();
    let sumaVelMax = arrayVehiculos.reduce((valorAnterior ,elemento, indice, array) => {
        return valorAnterior + parseInt(elemento.velMax);
    }, 0);
    let cantidadVelMax = arrayVehiculos.length;
    let promedioEdades = sumaVelMax / cantidadVelMax;

    $("txtVelMaxPromedio").value = parseInt(promedioEdades);
}
$("btnVelMaxPromedio").addEventListener("click", eventoCalcular);

/*  Juan Pablo, Dongo Huaman 3°C Primer Parcial Labo 3

4-d) Al hacer doble click en una fila del “Form Datos” o en el botón “Agregar” ocultar el “Form Datos” y mostrar el
     “Formulario ABM” con los datos de la fila o vacío según corresponda (ocultar los botones que correspondan).

4-e) Al hacer click en alguno de los botones del “Formulario ABM” debe realizarse la operación que corresponda, ocultar el
     formulario y mostrar el Formulario “Form Datos” con los datos actualizados. En caso de ser un Alta, generar ID único.
     Utilizar Map/Reduce/Filter.

4-f) El formulario ABM debe realizar validaciones acorde al tipo de objeto y a las restricciones descritas en el diagrama del
     punto 1. El campo ID no debe ser modificable y debe mostrar el id del objeto existente o vacío en caso de un alta.

*/

function limpiarInput()
{
    $("txtId").value = " ";
    $("txtModelo").value = " ";
    $("txtAnoFab").value = " ";
    $("txtVelMax").value = " ";
    $("comboxTipo").value = "default";
    const event = new Event("change");
    $("comboxTipo").dispatchEvent(event);
    $("txtAltMax").value = " ";
    $("txtAutonomia").value = " ";
    $("txtCantPue").value = " ";
    $("txtCantRue").value = " ";
}

function eventoCancelarAbm(e)
{
    $("formAbm").style.display = "none";
    $("formDatos").style.display = "flex";
    limpiarInput();
}
$("btnCancelar").addEventListener("click", eventoCancelarAbm);

function formAbm_cargarVehiculo(pIdVehiculo)
{
    if(pIdVehiculo)
    {
        let fila = $(pIdVehiculo);
        let vehiculo = tabla_celdasToVehiculo(fila.getElementsByTagName("td"));
        $("txtId").value = vehiculo.id;
        $("txtModelo").value = vehiculo.modelo;
        $("txtAnoFab").value = vehiculo.anoFab;
        $("txtVelMax").value = vehiculo.velMax;
        if(vehiculo instanceof Aereo)
        {
            $("comboxTipo").value = "aereo";
            const event = new Event("change");
            $("comboxTipo").dispatchEvent(event);
            $("txtAltMax").value = vehiculo.altMax;
            $("txtAutonomia").value = vehiculo.autonomia;
        }
        else if(vehiculo instanceof Terrestre)
        {
            $("comboxTipo").value = "terrestre";
            const event = new Event("change");
            $("comboxTipo").dispatchEvent(event);
            $("txtCantPue").value = vehiculo.cantPue;
            $("txtCantRue").value = vehiculo.cantRue;
        }
    }
}

function eventoTipo(e)
{
    let comboxTipo = $("comboxTipo");
    switch(comboxTipo.value)
    {
        case "default":
            $("divAltMax").style.display = "none";
            $("divAutonomia").style.display = "none";
            $("divCantPue").style.display = "none";
            $("divCantRue").style.display = "none";
            break;

        case "aereo":
            $("divAltMax").style.display = "flex";
            $("divAutonomia").style.display = "flex";
            $("divCantPue").style.display = "none";
            $("divCantRue").style.display = "none";
            break;

        case "terrestre":
            $("divAltMax").style.display = "none";
            $("divAutonomia").style.display = "none";
            $("divCantPue").style.display = "flex";
            $("divCantRue").style.display = "flex";
            break;
    }
}
$("comboxTipo").addEventListener("change", eventoTipo)

function eventoModoModificarYModoBaja(e)
{
    let elemento = e.currentTarget;
    $("formAbm").style.display = "flex";
    $("formDatos").style.display = "none";
    formAbm_cargarVehiculo(elemento.getAttribute("id"));
    $("divId").style.display = "flex";
    $("btnAlta").style.display = "none";
    $("btnModificar").style.display = "flex";
    $("btnBaja").style.display = "flex";
}
let filas = tabla_getFilas();
for(let i=1; i<filas.length; i++)
{
    filas[i].addEventListener("dblclick", eventoModoModificarYModoBaja);
}

function eventoModoAlta(e)
{
    $("formAbm").style.display = "flex";
    $("formDatos").style.display = "none";
    $("divId").style.display = "none";
    $("btnAlta").style.display = "flex";
    $("btnModificar").style.display = "none";
    $("btnBaja").style.display = "none";
}
$("btnAgregar").addEventListener("click", eventoModoAlta);

function crearId()
{
    let arrayVehiculos = tabla_getArrayVehiculos();
    let flagMax = 0;
    for(let i=0; i<arrayVehiculos.length; i++)
    {
        if(i == 0)
        {
            flagMax = arrayVehiculos[i].id;
        }
        else if(arrayVehiculos[i] > flagMax)
        {
            flagMax = arrayVehiculos[i].id;
        }
    }
    return (parseInt(flagMax) + 1);
}

function eventoRealizarAlta(e)
{
    let inputModelo = $("txtModelo").value;
    let inputAnoFab = $("txtAnoFab").value;
    let inputVelMax = $("txtVelMax").value;
    let inputAltMax = $("txtAltMax").value;
    let inputAutonomia = $("txtAutonomia").value;
    let inputCantPue = $("txtCantPue").value;
    let inputCantRue = $("txtCantRue").value;

    if(!(inputModelo.length > 3))
    {
        alert("Modelo no valido. Tiene que tener mas de 3 caracteres");
    }
    else if(!(inputAnoFab > 1885))
    {
        alert("Año de Fabricacion no valido. Tiene que ser mayor a 1885");
    }
    else if(!(inputVelMax > 0))
    {
        alert("Velocidad Maxima no valida. Tiene que ser mayor a 0 (cero).");
    }
    else
    {
        switch($("comboxTipo").value)
        {
            case "default":
                alert("Hay que seleccionar el Tipo");
                break;
    
            case "aereo":
                if(!(inputAltMax > 0))
                {
                    alert("Altura Maxima no valida. Tiene que ser mayor a 0 (cero)");
                }
                else if(!(inputAutonomia > 0))
                {
                    alert("Autonomia no valida. Tienen que ser mayor a 0 (cero)");
                }
                else
                {
                    tabla_alta(new Aereo(crearId(),
                                         inputModelo,
                                         inputAnoFab,
                                         inputVelMax,
                                         inputAltMax,
                                         inputAutonomia));
                    eventoCancelarAbm(e);
                }
                break;
    
            case "terrestre":
                if(!(inputCantPue > -1))
                {
                    alert("Cantidad de Puertas no valida. Tiene que ser mayor a -1");
                }
                else if(!(inputCantRue > 0))
                {
                    alert("Cantidad de Ruedas no valida. Tiene que ser mayor a 0 (cero)");
                }
                else
                {
                    tabla_alta(new Terrestre(crearId(),
                                             inputModelo,
                                             inputAnoFab,
                                             inputVelMax,
                                             inputCantPue,
                                             inputCantRue));
                    eventoCancelarAbm(e);
                }
                break;
        }
    }
}
$("btnAlta").addEventListener("click", eventoRealizarAlta);

function tabla_modificar(pVehiculo)
{
    if(pVehiculo)
    {
        let fila = $(pVehiculo.id);
        let celdas = fila.getElementsByTagName("td");

        celdas[0].textContent = pVehiculo.id;
        celdas[1].textContent = pVehiculo.modelo;
        celdas[2].textContent = pVehiculo.anoFab;
        celdas[3].textContent = pVehiculo.velMax;

        if(Vehiculo.esAereo(pVehiculo))
        {
            celdas[4].textContent = pVehiculo.altMax;
            celdas[5].textContent = pVehiculo.autonomia;
            celdas[6].textContent = "--";
            celdas[7].textContent = "--";
        }
        else if(Vehiculo.esTerrestre(pVehiculo))
        {
            celdas[4].textContent = "--";
            celdas[5].textContent = "--";
            celdas[6].textContent = pVehiculo.cantPue;
            celdas[7].textContent = pVehiculo.cantRue;
        }
    }
}
function eventoRealizarModificacion(e)
{
    let inputId = $("txtId").value;
    let inputModelo = $("txtModelo").value;
    let inputAnoFab = $("txtAnoFab").value;
    let inputVelMax = $("txtVelMax").value;
    let inputAltMax = $("txtAltMax").value;
    let inputAutonomia = $("txtAutonomia").value;
    let inputCantPue = $("txtCantPue").value;
    let inputCantRue = $("txtCantRue").value;

    if(!(inputModelo.length > 3))
    {
        alert("Modelo no valido. Tiene que tener mas de 3 caracteres");
    }
    else if(!(inputAnoFab > 1885))
    {
        alert("Año de Fabricacion no valido. Tiene que ser mayor a 1885");
    }
    else if(!(inputVelMax > 0))
    {
        alert("Velocidad Maxima no valida. Tiene que ser mayor a 0 (cero).");
    }
    else
    {
        switch($("comboxTipo").value)
        {
            case "default":
                alert("Hay que seleccionar el Tipo");
                break;

            case "aereo":
                if(!(inputAltMax > 0))
                {
                    alert("Altura Maxima no valida. Tiene que ser mayor a 0 (cero)");
                }
                else if(!(inputAutonomia > 0))
                {
                    alert("Autonomia no valida. Tienen que ser mayor a 0 (cero)");
                }
                else
                {
                    tabla_modificar(new Aereo(inputId,
                                              inputModelo,
                                              inputAnoFab,
                                              inputVelMax,
                                              inputAltMax,
                                              inputAutonomia));
                    eventoCancelarAbm(e);
                }
                break;

            case "terrestre":
                if(!(inputCantPue > -1))
                {
                    alert("Cantidad de Puertas no valida. Tiene que ser mayor a -1");
                }
                else if(!(inputCantRue > 0))
                {
                    alert("Cantidad de Ruedas no valida. Tiene que ser mayor a 0 (cero)");
                }
                else
                {
                    tabla_modificar(new Terrestre(inputId,
                                                  inputModelo,
                                                  inputAnoFab,
                                                  inputVelMax,
                                                  inputCantPue,
                                                  inputCantRue));
                    eventoCancelarAbm(e);
                }
                break;
        }
    }
}
$("btnModificar").addEventListener("click", eventoRealizarModificacion);

function eventoRealizarBaja(e)
{
    let rta = prompt("Esta seguro ? s/n | si/no").toLowerCase();
    if(rta == "s" ||  rta == "si")
    {
        let fila = $($("txtId").value);
        fila.parentNode.removeChild(fila);
        eventoCancelarAbm(e);
    }
}
$("btnBaja").addEventListener("click", eventoRealizarBaja);

/*  Juan Pablo, Dongo Huaman 3°C Primer Parcial Labo 3

4-g) Al hacer Click en alguno de los botones de los encabezados de la tabla del Formulario “Form Datos”, ordenar las filas
     de la tabla por la columna clickeada. Utilizar Map/Reduce/Filter

*/

function tabla_modificarPorIndiceDeFila(pVehiculo, pIndiceFila)
{
    if(pIndiceFila > 0)
    {
        let tabla = $("tabla");
        let fila = tabla.getElementsByTagName("tr")[pIndiceFila];
        let columnas = fila.getElementsByTagName("td");

        fila.setAttribute("id", pVehiculo.id);
        columnas[0].textContent = pVehiculo.id;
        columnas[1].textContent = pVehiculo.modelo;
        columnas[2].textContent = pVehiculo.anoFab;
        columnas[3].textContent = pVehiculo.velMax;

        if(Vehiculo.esAereo(pVehiculo))
        {
            columnas[4].textContent = pVehiculo.altMax;
            columnas[5].textContent = pVehiculo.autonomia;
            columnas[6].textContent = "--";
            columnas[7].textContent = "--";
        }
        else if(Vehiculo.esTerrestre(pVehiculo))
        {
            columnas[4].textContent = "--";
            columnas[5].textContent = "--";
            columnas[6].textContent = pVehiculo.cantPue;
            columnas[7].textContent = pVehiculo.cantRue;
        }
    }
}

function eventoOrdenarPorId(e)
{
    let arrayVehiculos = tabla_getArrayVehiculos();
    
    arrayVehiculos.sort((a, b) => {
        let ret = 0;
        if(a.id && b.id)
        {
            ret = (parseInt(a.id) - parseInt(b.id));
        }
        return ret;
    });

    for(let i=0; i<arrayVehiculos.length; i++)
    {
        tabla_modificarPorIndiceDeFila(arrayVehiculos[i], i + 1);
    }

    eventoFiltrar(e);
}
$("btnTablaId").addEventListener("click", eventoOrdenarPorId);

function eventoOrdenarPorModelo(e)
{
    let arrayVehiculos = tabla_getArrayVehiculos();

    arrayVehiculos.sort((a, b) => {
        if(a.modelo > b.modelo)
        {
            return 1;
        }
        else if(a.modelo < b.modelo)
        {
            return -1;
        }
        else
        {
            return 0;
        }
    });

    for(let i=0; i<arrayVehiculos.length; i++)
    {
        tabla_modificarPorIndiceDeFila(arrayVehiculos[i], i + 1);
    }

    eventoFiltrar(e);
}
$("btnTablaModelo").addEventListener("click", eventoOrdenarPorModelo);

function eventoOrdenarPorAnoFab(e)
{
    let arrayVehiculos = tabla_getArrayVehiculos();

    arrayVehiculos.sort((a, b) => {
        let ret = 0;
        if(a.anoFab && b.anoFab)
        {
            ret = (parseInt(a.anoFab) - parseInt(b.anoFab));
        }
        return ret;
    });

    for(let i=0; i<arrayVehiculos.length; i++)
    {
        tabla_modificarPorIndiceDeFila(arrayVehiculos[i], i + 1);
    }

    eventoFiltrar(e);
}
$("btnTablaAnoFab").addEventListener("click", eventoOrdenarPorAnoFab);

function eventoOrdenarPorVelMax(e)
{
    let arrayVehiculos = tabla_getArrayVehiculos();

    arrayVehiculos.sort((a, b) => {
        let ret = 0;
        if(a.velMax && b.velMax)
        {
            ret = (parseInt(a.velMax) - parseInt(b.velMax));
        }
        return ret;
    });

    for(let i=0; i<arrayVehiculos.length; i++)
    {
        tabla_modificarPorIndiceDeFila(arrayVehiculos[i], i + 1);
    }

    eventoFiltrar(e);
}
$("btnTablaVelMax").addEventListener("click", eventoOrdenarPorVelMax);

function eventoOrdenarPorAltMax(e)
{
    let arrayVehiculos = tabla_getArrayVehiculos();

    arrayVehiculos.sort((a, b) => {
        let ret = 0;
        if(a.altMax && b.altMax)
        {
            ret = (parseInt(a.altMax) - parseInt(b.altMax));
        }
        return ret;
    });

    for(let i=0; i<arrayVehiculos.length; i++)
    {
        tabla_modificarPorIndiceDeFila(arrayVehiculos[i], i + 1);
    }

    eventoFiltrar(e);
}
$("btnTablaAltMax").addEventListener("click", eventoOrdenarPorAltMax);

function eventoOrdenarPorAutonomia(e)
{
    let arrayVehiculos = tabla_getArrayVehiculos();

    arrayVehiculos.sort((a, b) => {
        let ret = 0;
        if(a.autonomia && b.autonomia)
        {
            ret = (parseInt(a.autonomia) - parseInt(b.autonomia));
        }
        return ret;
    });

    for(let i=0; i<arrayVehiculos.length; i++)
    {
        tabla_modificarPorIndiceDeFila(arrayVehiculos[i], i + 1);
    }

    eventoFiltrar(e);
}
$("btnTablaAutonomia").addEventListener("click", eventoOrdenarPorAutonomia);

function eventoOrdenarPorCantPue(e)
{
    let arrayVehiculos = tabla_getArrayVehiculos();

    arrayVehiculos.sort((a, b) => {
        let ret = 0;
        if(a.cantPue && b.cantPue)
        {
            ret = (parseInt(a.cantPue) - parseInt(b.cantPue));
        }
        return ret;
    });

    for(let i=0; i<arrayVehiculos.length; i++)
    {
        tabla_modificarPorIndiceDeFila(arrayVehiculos[i], i + 1);
    }

    eventoFiltrar(e);
}
$("btnTablaCantPue").addEventListener("click", eventoOrdenarPorCantPue);

function eventoOrdenarPorCantRue(e)
{
    let arrayVehiculos = tabla_getArrayVehiculos();
    arrayVehiculos.sort((a, b) => {
        let ret = 0;
        if(a.cantRue && b.cantRue)
        {
            ret = (parseInt(a.cantRue) - parseInt(b.cantRue));
        }
        return ret;
    });

    for(let i=0; i<arrayVehiculos.length; i++)
    {
        tabla_modificarPorIndiceDeFila(arrayVehiculos[i], i + 1);
    }

    eventoFiltrar(e);
}
$("btnTablaCantRue").addEventListener("click", eventoOrdenarPorCantRue);

/*  Juan Pablo, Dongo Huaman 3°C Primer Parcial Labo 3

4-h) El formulario “Form Datos” debe mostrar/ocultar las columnas de la tabla según esté chequeado el checkbox
     correspondiente a esa columna (chequeado mostrar, no chequeado ocultar).

*/

function tabla_setDisplayColumnaPorIndice(pIndice, pDisplay)
{
    let filas = tabla_getFilas();
    let filaEncabezado = filas[0].getElementsByTagName("th");

    filaEncabezado[pIndice].style.display = pDisplay;

    for(let i=1; i<filas.length; i++)
    {
        let columnas = filas[i].getElementsByTagName("td");
        columnas[pIndice].style.display = pDisplay;
    }
}
function eventoActualizarColumnas(e)
{
    let listaChBoxes = ["chboxId", "chboxModelo", "chboxAnoFab", "chboxVelMax", "chboxAltMax", "chboxAutonomia", "chboxCantPue", "chboxCantRue"];

    for(let i=0; i<listaChBoxes.length; i++)
    {
        let chbox = $(listaChBoxes[i])
        
        if(chbox.checked)
        {
            tabla_setDisplayColumnaPorIndice(i, "table-cell");
        }
        else
        {
            tabla_setDisplayColumnaPorIndice(i, "none");
        }
    }
}
$("chboxId").addEventListener("change", eventoActualizarColumnas);
$("chboxModelo").addEventListener("change", eventoActualizarColumnas);
$("chboxAnoFab").addEventListener("change", eventoActualizarColumnas);
$("chboxVelMax").addEventListener("change", eventoActualizarColumnas);
$("chboxAltMax").addEventListener("change", eventoActualizarColumnas);
$("chboxAutonomia").addEventListener("change", eventoActualizarColumnas);
$("chboxCantPue").addEventListener("change", eventoActualizarColumnas);
$("chboxCantRue").addEventListener("change", eventoActualizarColumnas);
