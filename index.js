const Discord    = require('discord.js'),
      Quote      = require('inspirational-quotes'),
      joke       = require('give-me-a-joke'),
	  dateFormat = require('dateformat'),
      file       = require("./secrete"),
      client     = new Discord.Client();

client.login(file.ID);

var Joke;
joke.getRandomDadJoke((getJoke) => {
    Joke = getJoke;
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
})

client.on('message', msg => {
    if(msg.author.bot){
        return;
    }

    let txt = msg.content;

    if(txt.startsWith('_a-bot')){
        msg.reply('\nWhat can I do for U?\n_help : to list all commands\n_quote : get an inspirational quote\n_joke : crack a joke');
    }

    else if(txt.startsWith('_help')){
        msg.channel.send("_quote : get an inspirational quote\n_joke : crack a joke\n_date : today's date and time\n_clear : delete last 10 messages");
    }

    else if(txt.startsWith('_quote')){
        quote = Quote.getQuote();
        msg.channel.send(quote.text + '\nby - ' + quote.author);
    }

    else if(txt.startsWith('_joke')){
        msg.channel.send(Joke);
    }

    else if(txt.startsWith('_date')){
        let date = dateFormat(Date.now(), 'dd/mm/yyyy'),
            time = dateFormat(Date.now(), 'hh:MM:ss TT');
        msg.channel.send("Date : " + date + "\nTime : " + time);
    }

    else if(txt.startsWith('_clear')){
        msg.channel.bulkDelete(10)
        .then(messages => console.log(`Bulk deleted ${messages.size} messages`))
        .catch(console.error);
    }
})