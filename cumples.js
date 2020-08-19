const fs = require('fs');
const colors = require('colors');
const discord = require('discord.js');

//vector con nombre de los meses
const meses = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre"
];
//objeto vacio de meses para contener los cumpleaños
const virgen = {
    enero: [],
    febrero: [],
    marzo: [],
    abril: [],
    mayo: [],
    junio: [],
    julio: [],
    agosto: [],
    septiembre: [],
    octubre: [],
    noviembre: [],
    diciembre: []
  };

//objeto tipo texto con los meses vacios
const dataVirgen =JSON.stringify(virgen,null,2);

//trae datos en hexadecimal desde la carpeta
var dataCumples = fs.readFileSync('cumples.json',);
//lo transforma en objeto real
var cumples = JSON.parse(dataCumples);

//deja el archivo JSON sin personas
const formatDB = function (){
    //escribe en
    fs.writeFile('cumples.json',dataVirgen,function(err){
        if(err){
            console.log(err);
        }
        console.log('Se resetea la Base de datos de cumpleaños'.yellow);
    });
    //resetea el objeto principal que representa el JSON
    cumples = JSON.parse(dataVirgen);
}

//lee el canal de texto y agrega todos los cumpleaños que se escribieron
const  actualizarDB = async function (msg){
    //selecciona los mensajes del canal
    const fetched = await msg.channel.messages.fetch({limit : 100 });
    //mientras haya mensajes, agrega los cumpleaños al JSON
    fetched.forEach(message => {
        console.log(message.content);
        addCumple(message.content);
    });
    console.log('Termino de actualizar'.green);
}

//agrega un cumpleaños al JSON
const addCumple = function (st){

    st = st.toLowerCase();
    st = st.split(' ');
    
    //selecciona solo los strings de 2 a 4 palabras que es el formato que abarca
    if((st.length < 5) && (st.length > 1)){
        var dia;
        var mes;
        if(st.length === 2){
            let fecha = st[1].split('/'); 
            dia = fecha[0];
            mes = meses[Number(fecha[1]) -1];
        }else{
            var dia = st[1];
            var mes = st[st.length -1];
        }
        var persona = {
            nombre: st[0],
            dia: dia
        };

        //agrega al final del mes a la persona que se agrega
        cumples[mes].push(persona);

        //convierte el objeto para que sea entendible en JSON
        dataCumples = JSON.stringify(cumples,null,2);
        //escribe la carpeta JSON con la persona agregada
        fs.writeFile('cumples.json',dataCumples,function(err){
            if(err){
                console.log('El error fue: ',err);
            }
            console.log('Se intento cambiar cumples.json'.green);
        });
    }else{
        console.log("Formato invalido".red);
    }
    
}

const toString = function (msg){
    //trae el objeto a imprimir
    var cumples_actual = JSON.parse(fs.readFileSync('./cumples.json'));
    //crea el objeto contenedor del mensaje a imprimir
    let cumples_mensaje = new discord.MessageEmbed();
    //recorre cada mes del objeto
    for (let j = 0; j < 12; j++) {
        let description = "";
        console.log(`cantidad de personas en ${meses[j]}: ${cumples_actual[meses[j]].length}`.yellow);
        //si hay personas en el objeto
        if(cumples_actual[meses[j]].length > 0){
            //agrega en la descripcion las personas que se van a imprimir
            for (let i = 0; i < cumples_actual[meses[j]].length; i++) {
                description += cumples_actual[meses[j]][i].dia + ' ' + cumples_actual[meses[j]][i].nombre + '\n';
            }
        }else{
            description = "     -";
        }
        //agrega titulo del mes y descripcion del mes
        cumples_mensaje.addField(meses[j],description,true);                       
    }
    //imprime
    msg.channel.send(cumples_mensaje);
};

module.exports.actualizarDB = actualizarDB;
module.exports.addCumple = addCumple;
module.exports.formatDB = formatDB;
module.exports.toString = toString;