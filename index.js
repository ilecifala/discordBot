const {Client, MessageEmbed}= require('discord.js');
const client = new Client();

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

client.on('message', msg => {
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


    //cumpleañito
    if(msg.content.startsWith('!cumple')){
        const cumpleEmbed = new MessageEmbed()
            .addField('Enero', 'Ile, Seba');
        msg.channel.send(cumpleEmbed);
    }

});

//Play "La Jeepeta" !play




//client.login(token); //importado desde .json
client.login(config.token);
