const fs = require('fs');
const colors = require('colors');

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
const dataVirgen =JSON.stringify(virgen,null,2);

//trae datos en hexadecimal desde la carpeta
var dataCumples = fs.readFileSync('cumples.json',);
//lo transforma en objeto real
var cumples = JSON.parse(dataCumples);

const formatDB = function (){
    //escribe en
    fs.writeFile('cumples.json',dataVirgen,function(err){
        if(err){
            console.log(err);
        }
        console.log('Se resetea la Base de datos de cumpleaños'.yellow);
    });
    cumples = JSON.parse(dataVirgen);
}

const  actualizarDB = async function (msg){
    const fetched = await msg.channel.messages.fetch({limit : 100 });
    fetched.forEach(message => {
        console.log(message.content);
        addCumple(message.content);
    });
    console.log('Termino de actualizar'.green);
}

const addCumple = function (st){

    //agregado de la persona en el objeto
    st = st.toLowerCase();
    st = st.split(' ');
    
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

        //cumples[enero].push() por ejemplo
        cumples[mes].push(persona);

        //convierte el objeto para que sea entendible en json
        dataCumples = JSON.stringify(cumples,null,2);
        //escribe la carpeta json con el objeto agregado
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

module.exports.actualizarDB = actualizarDB;
module.exports.addCumple = addCumple;
module.exports.formatDB = formatDB;