const {Client, MessageEmbed}= require('discord.js');
const client = new Client();


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
                msg.channel.send(`hola ${msg.author}, uwu`);
                break;
            case ('!cumpleañito')
                const embed = new MessageEmbed();
        }       

        if (message.includes('bieja') || message.includes('vieja'))
            msg.channel.send('tonta');

        else if (message.includes('marcos')) 
            msg.channel.send('viejo tonto');

        else if (message.includes('juan'))
            msg.channel.send('trolo');

        else if (message.endsWith('que') ||  message.endsWith('que?') || message.endsWith('q') || message.endsWith('khe'))
            msg.channel.send('sito');
    }
});

//Play "La Jeepeta" !play




client.login('');

