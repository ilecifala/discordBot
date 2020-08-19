const {Client, MessageEmbed}= require('discord.js');
const { parse } = require('dotenv-flow');
const client = new Client();
const cumples = require('./cumples.js');

//const {token} = require('./config.json'); //una forma de importar el token desde un .json
require('dotenv-flow').config(); //.env

const config = {
    token: process.env.TOKEN,
    owner: process.env.OWNER,
    prefix: process.env.PREFIX
};


client.on('ready', () => {
    console.log(`Bot ready as ${client.user.tag}`);
    client.user.setStatus('invisible');
});

client.on('message', async msg => {
    //Recibiendo el mensaje
    console.log(msg.content);

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
    if (message.content.startsWith('!clear')) {
        var arrayComando = message.content.split(' ');
        var limitedTo = 11;
        if(arrayComando.length > 1){
            limitedTo = 0;
            limitedTo = parseInt(arrayComando[1])+1;
        }
        const fetched = await message.channel.messages.fetch({limit : limitedTo });
        message.channel.bulkDelete(fetched);
        console.log('msgs deleted'.green);
    }
});


client.on('message', async (message) => {
    if(message.content.startsWith(`${config.prefix}actualizar`)){
        cumples.actualizarDB(message);
    }
    if(message.content.startsWith('!add')){
        cumples.addCumple(message.content.split('*')[1]);
    }
    if(message.content.startsWith('!formatCumples')){
        cumples.formatDB();
    }
});

//Play "La Jeepeta" !play




//client.login(token); //importado desde .json
client.login(config.token);
