const { default: Collection } = require('@discordjs/collection');
const {Client, MessageEmbed}= require('discord.js');
const { parse } = require('dotenv-flow');
const { moveMessagePortToContext } = require('worker_threads');
const client = new Client();
const cumples = require('./cumples.js');
const ytdl = require('ytdl-core'); //para resproducir musica en un futuro

//const {token} = require('./config.json'); //una forma de importar el token desde un .json
require('dotenv-flow').config(); //.env

const config = {
    token: process.env.TOKEN,
    owner: process.env.OWNER,
    prefix: process.env.PREFIX
};


client.on('ready', () => {
    console.log(`Bot ready as ${client.user.tag}`.green);
    client.user.setStatus('online');
});

client.on('message', async msg => {
    //COMANDS FOR EVERYONE
    console.log(msg.content.grey);

    if ((typeof msg.content) === "string")
    {
        var message = msg.content.toLowerCase();
        switch (message)
        {
            case ('ping'):
                msg.reply('pong');
                break;
            case ('hola'):
                if(msg.author.presence.status == 'online')
                    msg.channel.send(`hola ${msg.author}, uwu`);
                break;
        }       

        if (message.includes('bieja') || message.includes('vieja'))
            msg.channel.send('tonta');

        else if (message.includes('marcos')) 
            msg.channel.send('viejo tonto');

        else if (message.includes('juan'))
            msg.channel.send('trolo');

        else if (message.includes('seba'))
            msg.channel.send('deja a tu novia');

        else if (message.endsWith('que') ||  message.endsWith('que?') || message.endsWith('q') || message.endsWith('khe'))
            msg.channel.send('sito');
    } 
});



client.on('message', async (message) => {
    //MODERATORS ONLY
    //ADMINS ONLY

    if(message.member._roles.includes('753719262601936942')){
        
        //Read all the channel trying to add biths
        if(message.content ==`!cumpleactualizar`){
            cumples.actualizarDB(message);
        }


         //add births sent by parameter to the db
        if(message.content.startsWith('!cumpleadd')){
            cumples.addCumple(message.content.slice(11));
        }


         //DELETE THE DATABASE                                                          WARNING
        if(message.content == '!cumpleFormat'){
            cumples.formatDB();
        }


         //Prints every birth
        if(message.content.startsWith('!cumplesimprimir')){
            cumples.toString(message);
        }

        //Delets messages                                                               WARNING
        if (message.content.startsWith('!clear')) {
            //divide el comando del numero de mensajes a borrar
            var arrayComando = message.content.split(' ');
            //si no pone numero borra 10 mensajes automaticamente (a demas del mensaje del comando)
            var limitedTo = 11;
            if(arrayComando.length > 1){
                //si llega por parametro una letra en vez de numero se queda en 0
                limitedTo = 0;
                limitedTo = parseInt(arrayComando[1])+1;
            }
            //selecciona la cantidad de mensajes
            const fetched = await message.channel.messages.fetch({limit : limitedTo });
            //borra todos los mensajes seleccionados
            message.channel.bulkDelete(fetched);
            console.log('msgs deleted'.green);
        }
    }
});





//Play "La Jeepeta" !play




//client.login(token); //importado desde .json
client.login(config.token);
