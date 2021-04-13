const Discord    = require('discord.js'),
      Quote      = require('inspirational-quotes'),
      joke       = require('give-me-a-joke'),
	  dateFormat = require('dateformat'),
      file       = require("./secrete"),
      axios      = require("axios").default,
      client     = new Discord.Client();

client.login(file.ID);

var options = {
    method: 'GET',
    url: 'https://livescore6.p.rapidapi.com/matches/v2/list-live',
    params: {Category: 'cricket'},
    headers: {
      'x-rapidapi-key': file.KEY,
      'x-rapidapi-host': 'livescore6.p.rapidapi.com'
    }
  };

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
        let Joke;
        joke.getRandomDadJoke((getJoke) => {
            Joke = getJoke;
        });
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

    else if(txt.startsWith('_score')){  
          axios.request(options).then(function (response) {
              let temp = response.data.Stages;
              if(temp.length > 0){
                temp.forEach(element => {
                    let temp1 = element.Events;
                    msg.reply('This Feature is coming soon...');
                });
              } else {
                msg.channel.send('No Live Matches to Show!!!');
              }
          }).catch(function (error) {
              console.error(error);
          });
    }

})