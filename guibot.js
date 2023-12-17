const Discord = require('discord.js'),
      client = new Discord.Client();

const chalk = require('chalk');
const dotenv = require("dotenv");
dotenv.config();
const token = process.env.DISCORD_BOT_SECRET;


client.on('ready', () => {
    client.user.setPresence({ status: 'Playing', game: { name: 'בבייצים' } });
    const guilds = client.guilds.map(guild => {
        return {
            name: guild.name,
            channels: guild.channels.map(channel => {
                if (channel.type == "category") return chalk.red(">> Category: ") + chalk.gray(channel.name);
                if (channel.type == "voice") return chalk.white(">> Voice: ") + chalk.gray(channel.name);
                if (channel.type == "text") return chalk.white(">> Text: ") + chalk.gray(`#${channel.name}`);
            })
        };
    });

    guilds.forEach(info => {
        console.log(chalk.blue.bgRed.bold(">>>>>>>>>>>>>>>>>> Guild ") + chalk.gray(info.name));
        console.log(info.channels.join("\n"));
        console.log(chalk.gray('----------------'));
    });

    // const channel = client.channels.get("797533178243317770"); 
    // channel.send("מה קורה זונות שלי");

    notice(`Booted online as ${client.user.username}#${client.user.discriminator}`);
});

client.on('message', message => {

    if (message.author.bot) return;
    if (message.content) return command(message);

});

const prefix = ""
function command(message) {
    const channel = message.channel,
          user = message.author,
          member = message.member;

	const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase()
	

    // const split = message.cleanContent.split(" "),
    //       command = split[0].substr(1),
    //       args = split.slice(1);
	
    // if (command == "בוא") return join(member, channel); 
    if (command == "הומו") return help(args, message); 
    if (command == "פיפו") return draft(args, message); 
    if (command == "איפוס") return gather(args, message); 
    if (command == "שיר" || command == "שירים") return montage(args, message);  
    if (message.content.includes('סתום') || message.content.includes('שתוק') || message.content.includes('שקט')) return specs(args, message); 
    if (message.content.includes('משה') || message.content.includes('מושיקו')) return embed(message); 

};

function embed(message) {

	const embed = new Discord.RichEmbed()
	.setTitle(`moshe`)
	.setColor('#f4b342')
	.setThumbnail('https://images-ext-1.discordapp.net/external/zAH35AhJ-Hvac6L7-IIbN52vrUMhnVe79smtEX-MVdI/https/cdn-longterm.mee6.xyz/plugins/embeds/images/583574396686434304/bb005d43bf4aa287053d156edcf50ed163882cdf3766c2b77da4f852d7640aad.png')
	message.channel.send(embed);
	
};

 function specs(args, message) {


	const voiceChannel = message.member.voiceChannel
  
	if (!voiceChannel) return message.reply('**אם אתה גבר כנס לערוץ שיחה ותרשום שוב את מה שרשמת . . .**').then(message => message.delete(60000));
  
	voiceChannel.join().then(async (connection) => {
	 let dispatcher = connection.playFile('./img/botsound.mp3', {volume: 1.0});
	   await dispatcher.on("end", end => {voiceChannel.leave();
		  for (let member of voiceChannel.members) {member[1].setMute(false)}
	  });
	})
	 .catch(console.error);
	 for (let member of voiceChannel.members) {member[1].setMute(true)}





};


function montage(args, message) {
	
	const embed1 = new Discord.RichEmbed()
			.setTitle('🎧 HAFLOTBOT 🎧')
			.setDescription(` \`רשימת השירים שלי\``)
			.addField('1',  '**משה**', true)
			.addField('2', '**רוסלנה**', true)
			.addField('3', '**מתן**', true)
			.addField('4',  '**אורן**', true)
			.setColor("#3498DB")
			.setThumbnail('https://images-ext-1.discordapp.net/external/zAH35AhJ-Hvac6L7-IIbN52vrUMhnVe79smtEX-MVdI/https/cdn-longterm.mee6.xyz/plugins/embeds/images/583574396686434304/bb005d43bf4aa287053d156edcf50ed163882cdf3766c2b77da4f852d7640aad.png')
 			.setTimestamp()
			

	if (args.length !== 1) return message.channel.send(embed1).then((msg)=> { 
		setTimeout(function(){
		  msg.edit(message.author + 'אם תרצה להוסיף גם את שלך, תשלח לעמי בפרטי').then(msg.delete(10000));
		}, 12000)
	  }); 

	  
	if (args == "מתן" || args == "matan" || args == "כלף") {
		const voiceChannel = message.member.voiceChannel
		message.delete(10000);
	  
		async function play(voiceChannel) {
		  await voiceChannel.join().then(async (connection) => {
			let dispatcher = await connection.playFile('./img/matan.mp3', {volume: 1.0,});
			await dispatcher.on('end', function () { 
				setTimeout(function () { voiceChannel.leave();}, 10000);
				for (let member of voiceChannel.members) {member[1].setMute(false)}
			});
	  
			});
	  
		}
			 if (!voiceChannel) return message.reply('**אתה לא בערוץ שיחה איך אתה רוצה לשמוע בידיוק?**').then(message => message.delete(10000));
			 if (!client.voice.connections.some(conn => conn.channel.id == voiceChannel.id)) {
			 voiceChannel.join()
			 
			const embed2 = new Discord.RichEmbed()
			.setTitle('🎧 MASTERBOT-TUBE 🎧')
			.setColor("#3498DB")
			.addField('🔇הערוץ הושתק זמנית לניגון הקטע🔇', 'רצוי לא לעבור לערוץ אחר אחרת תתקע עם ההשתק')
			.setDescription('`🔊 5 שניות לניגון הלהיט של מתן האשדודי 🔊`')
			.setImage('https://github.com/amiboko/GAMERSUNITEDBOT/blob/main/img/MATANA.gif?raw=true')    
			.setTimestamp()
			
			message.channel.send(embed2).then(message => message.delete(120000));
			setTimeout(function () { play(voiceChannel); }, 5000);
			let channel = message.member.voiceChannel;
			for (let member of channel.members) {
			  member[1].setMute(true)    }
		 
	  }
	}
	if (args == "רוס" || args == "רוסלן" || args == "רועי" || args == "רוסלנה") {
		const voiceChannel = message.member.voiceChannel

		message.delete(10000);
		
		async function play(voiceChannel) {
		  await voiceChannel.join().then(async (connection) => {
			let dispatcher = await connection.playFile('./img/roslan.mp3', {volume: 1.0,});
			await dispatcher.on('end', function () { 
				setTimeout(function () { voiceChannel.leave();}, 5000);
				for (let member of voiceChannel.members) {member[1].setMute(false)}
			});
	  
			});
	  
		}
			 if (!voiceChannel) return message.reply('**אתה לא בערוץ שיחה איך אתה רוצה לשמוע בידיוק?**').then(message => message.delete(10000));
			 if (!client.voice.connections.some(conn => conn.channel.id == voiceChannel.id)) {
			 voiceChannel.join()
			 
			const embed2 = new Discord.RichEmbed()
			.setTitle('🎧 MASTERBOT-TUBE 🎧')
			.setColor("#3498DB")
			.addField('🔇הערוץ הושתק זמנית לניגון הקטע🔇', 'רצוי לא לעבור לערוץ אחר אחרת תתקע עם ההשתק')
			.setDescription('`🔊 5 שניות לניגון הלהיט של רוסלנה 🔊`')
			.setImage('https://github.com/amiboko/GAMERSUNITEDBOT/blob/main/img/ROSLANA.gif?raw=true') 
			.setTimestamp()
	  
			message.channel.send(embed2).then(message => message.delete(120000));
			setTimeout(function () { play(voiceChannel); }, 5000);
			let channel = message.member.voiceChannel;
			for (let member of channel.members) {
			  member[1].setMute(true)    }
		 
	  }


	}
	if (args == "משה") {

		const voiceChannel = message.member.voiceChannel
  
		message.delete(10000);
		
		async function play(voiceChannel) {
		  await voiceChannel.join().then(async (connection) => {
			let dispatcher = await connection.playFile('./img/moshe.mp3', {volume: 1.0,});
			await dispatcher.on('end', function () { 
				setTimeout(function () { voiceChannel.leave();}, 10000);
				for (let member of voiceChannel.members) {member[1].setMute(false)}
			});
	  
			});
	  
		}
			 if (!voiceChannel) return message.reply('**בא לך לשמוע משהו על משה? כנס לחדר שיחה קודם**').then(message => message.delete(10000));
			 if (!client.voice.connections.some(conn => conn.channel.id == voiceChannel.id)) {
			 voiceChannel.join()
			 
			const embed2 = new Discord.RichEmbed()
			.setColor("#3498DB")
			.setDescription(`${message.author}` +'\xa0' + 'מצטרף רגע את חברה שלי יש לה משהו לומר למשה ...')
			
			message.channel.send(embed2).then(message => message.delete(120000));
				 setTimeout(function () { play(voiceChannel); }, 2000);
	  
	  }
	}
};

function help(args, message) {

	const results = ['כן', 'לא', 'יש מצב','בדוק!','אני בטוח שכן','הומו על מלא','להההה זה אוהב כוס זה'];
	const result = results[Math.floor(Math.random() * results.length)]
	const options = ['יכול להיות שנולדת תיימני?', 'שמע אתה סתום', 'קשה לקרוא הוראות אה?!','הכל רשום בצורה מסודרת איך אתה מצליח עדיין להתבלבל!','אתה שגוי','מתי תתאבד?','סתום תפה כבר'];
	const option = options[Math.floor(Math.random() * options.length)];
	const input = args.join(' ')
  
	if (!input) {
	  const embed = new Discord.RichEmbed()

		.setTitle('הגרלת הומו הופעלה')
		.setDescription(`בוא נשחק, תרשום הומו מי או הומו מה`)
  
	  message.channel.send(embed)
	} else {
	  if (message.content.includes('מי') || message.content.includes('מה')) {
		if (message.channel.type === 'dm') {
		  const member = ['You.', 'Me.']
		  const result = member[Math.floor(Math.random() * member.length)]
		  message.channel.send(`${result}`)
		}
		var member = message.guild.members.random().displayName
		const embed2 = new Discord.RichEmbed()
		.setThumbnail(member.avatarURL)
		.setTitle('האם   '  +  member)
		.addField("הומו?", result)
		.setFooter('😂😂😂😂😂😂😂😂😂😂')
		.setImage(`https://emoji.discadia.com/emojis/AniGay.gif`)
		message.channel.send(embed2)

	  } else {
		message.channel.send(message.author +`${option}`)
	  }
	}
};

function draft(args, message) {
	const embed2 = new Discord.RichEmbed();
	embed2.setTitle(`אני צריל לנחש!? כמה שחקנים יש בכל קבוצה`);
	embed2.setColor('#f4b342');
    	if (args.length !== 1) return message.channel.send(embed2);
    	const value = parseInt(args[0]);
    	if (isNaN(value) || value < 1 || value > 6) return message.channel.send("אני יכול לפצל קבוצות של 2-6 שחקנים");
    	const vc = message.guild.channels.find(x => x.name == "𝐅𝐈𝐅𝐎 𝐌𝐀𝐈𝐍");
    	const members = shuffle(Array.from(vc.members));
    	const diff = (value * 2) - members.length;
    	if (diff !== 0) return message.channel.send(`צריך ${diff > 0 ? 'עוד' : 'להסיר'} {${Math.abs(diff)}} שחקנים ${diff > 0 ? 'שיצטרפו' : ''} בערוץ פיפו (${members.length}/${value * 2})`);
    	const teams = chunkify(members, value);
	message.channel.send("הקבוצות מוכנות, כדי להחזיר את כולם לפיפו הראשי רשום איפוס");
    	teams.forEach((members, i) => {
        const channels = Array.from(message.guild.channels.filter(x => x.name.includes("𝗧𝗘𝗔𝗠") && x.type == "voice"));
        const embed = new Discord.RichEmbed();
        embed.setTitle(`𝗧𝗘𝗔𝗠 ${i + 1}`);
        embed.setColor('#f4b342');
        embed.setDescription(members.map(x => `> ${x[1]}`));
		embed.setThumbnail('https://images-ext-1.discordapp.net/external/zAH35AhJ-Hvac6L7-IIbN52vrUMhnVe79smtEX-MVdI/https/cdn-longterm.mee6.xyz/plugins/embeds/images/583574396686434304/bb005d43bf4aa287053d156edcf50ed163882cdf3766c2b77da4f852d7640aad.png');
        message.channel.send(embed);
        members.forEach(member => {
        	member[1].setVoiceChannel(channels[i][1]);
        });
    	});
};

function gather(args, message) {
	const voiceChannel = message.member.voiceChannel
	if (!voiceChannel) return message.reply('**אין שחקנים בפיפו מה אתה מחפש לאפס סתם**').then(message => message.delete(60000));
	
	const channels = message.guild.channels.filter(x => x.name.toLowerCase().includes("𝗧𝗘𝗔𝗠"));
	if (!channels) return message.reply('**אין שחקנים בפיפו מה אתה מחפש לאפס סתם**').then(message => message.delete(30000));

    	const vc = message.guild.channels.find(x => x.name == "𝐅𝐈𝐅𝐎 𝐌𝐀𝐈𝐍");

		if (message.member.roles.has('1120782924019671130')) {
			for (const [channelID, channel] of channels) {
				for (const [memberID, member] of channel.members) {
				  member.setVoiceChannel('1133811152976085092')
					.then(() => console.log(`Moved ${member.user.tag}.`))
					.catch(console.error);
							}
	 }	
	 const embed = new Discord.RichEmbed();
	 embed.setThumbnail('https://media1.giphy.com/media/POl26oYm14YtpDOpTi/giphy.gif?cid=ecf05e47vwh293zgreulcupfskbct6iqdlmt82hsctvq8d32&ep=v1_gifs_search&rid=giphy.gif&ct=g');
	 embed.setTitle(`שחקנים הוחזרו לערוץ הראשי בהצלחה`);
	 embed.setColor('#f4b342');

	 message.channel.send(embed);
		}
		 else return message.reply('**אין לך הרשאה לאפס!**').then(message => message.delete(30000));

};

function join(member, channel) {
    	member.voiceChannel.join().then(() => {
        channel.send("Hello friends.");
    	});
};

function shuffle(array) {
    	// Fischer-Yates Randomization Algorithm
    	let copy = [], n = array.length, i;
    	while (n) {
        i = Math.floor(Math.random() * n--);
        copy.push(array.splice(i, 1)[0]);
    	};
    	return copy;
};

function chunkify(myArray, chunk_size){
    	let index = 0;
    	let arrayLength = myArray.length;
    	let tempArray = [];
    	for (index = 0; index < arrayLength; index += chunk_size) {
        myChunk = myArray.slice(index, index+chunk_size);
        tempArray.push(myChunk);
    	};
    	return tempArray;
};

function notice(message) {
    	console.log(chalk.red("[NOTICE]: ") + chalk.gray(message));
};

client.on('message', async message => {

	let songlist = ['תנגן', 'נגן', 'ישיר', 'נשיר','מנגינה','מוזיקה'] 
  
	let foundInText = false;
	for (var i in songlist) { 
	  if (message.content.toLowerCase().includes(songlist[i].toLowerCase())) foundInText = true;
	}
	  if (foundInText) {
		if (message.author.bot) return;
		//message.delete();
   
		  message.channel.send(message.author + 'להפעלת שיר מהרשימה יש לרשום שיר [שם השיר]');
	}
  });

client.on('presenceUpdate', (oldMember, newMember) => {
	const guild = newMember.guild;
	const playingRole = guild.roles.find(role => role.id === '1138802019075891220');
	  
	if (newMember.user.bot || oldMember.presence.status !== newMember.presence.status) return;
  
	const oldGame = oldMember.presence.game && [0, 1].includes(oldMember.presence.game.type) ? true : false;
	const newGame = newMember.presence.game && [0, 1].includes(newMember.presence.game.type) ? true : false;
  
	if (!oldGame && newGame) {         // Started playing.
	  newMember.addRole(playingRole)
		.then(() => console.log(`${playingRole.name} added to ${newMember.user.tag}.`))
		.catch(console.error);
	
	} else if (oldGame && !newGame) {  // Stopped playing.
	  newMember.removeRole(playingRole)
		.then(() => console.log(`${playingRole.name} removed from ${newMember.user.tag}.`))
		.catch(console.error);
	}


	


	
  });


  client.on("presenceUpdate", (oldGuildMember, newGuildMember) => {
   
    const Role = newGuildMember.guild.roles.get('1138802019075891220');
    if (!Role) {return console.error("No role found.")};

    if (newGuildMember.presence.status == "offline") {
        newGuildMember.removeRole(Role).then(() => console.log(`${Role.name} removed from ${newGuildMember.user.tag}.`))
		.catch(console.error);
    } 
});

client.on('message', async message => {

	let botlist = ['משחק', 'מתארגן', 'אבוא', 'שחקנים', 'קואד', 'טריו', 'שחקן', 'מי בא', 'לשחק'] 
	
	let foundInText = false;
	for (var i in botlist) { 
		
	  if (message.content.toLowerCase().includes(botlist[i].toLowerCase())) foundInText = true;
	}
	  if (foundInText) {
		if (message.author.bot) return
		const Moderator = message.guild.roles.find(role => role.id === '671631357725638656')

		const embed1 = new Discord.RichEmbed()
		.setTitle('אתם גם ככה במשחק אז תנו בקליק <a:down:1149230468856827935> <#1133811152976085092>')
		.addField('<a:line:1149230466566737980><a:line:1149230466566737980><a:line:1149230466566737980>', `${Moderator ? `${Moderator}` : ""}`)
		.setImage('https://media.giphy.com/media/EFeuZSiPSymM6YYrbr/giphy.gif');
		const embed2 = new Discord.RichEmbed()
		.setTitle('אתם גם ככה במשחק אז תנו בקליק <a:down:1149230468856827935> <#1133811152976085092>')
		.addField('<a:line:1149230466566737980><a:line:1149230466566737980><a:line:1149230466566737980>', `${Moderator ? `${Moderator}` : ""}`)
		.setImage('https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGNvYThiaDhrZ242M2xwdTdlcjI3ejBtaW40NmpxNGJxYjZ0Zzl3eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/lfHrUAr831oqC1so8O/giphy.gif');
		const embed3 = new Discord.RichEmbed()
		.setTitle('אתם גם ככה במשחק אז תנו בקליק <a:down:1149230468856827935> <#1133811152976085092>')
		.addField('<a:line:1149230466566737980><a:line:1149230466566737980><a:line:1149230466566737980>', `${Moderator ? `${Moderator}` : ""}`)
		.setImage('https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHA0Z2ZudWw4eGF1YjJ0dndjeGdjMjVjMjVxYTdjdDdyYnc1dm8wZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/7EFCu9NGr4bSXFoXcY/giphy-downsized-large.gif');
		const embed4 = new Discord.RichEmbed()
		.setTitle('אתם גם ככה במשחק אז תנו בקליק <a:down:1149230468856827935> <#1133811152976085092>')
		.addField('<a:line:1149230466566737980><a:line:1149230466566737980><a:line:1149230466566737980>', `${Moderator ? `${Moderator}` : ""}`)
		.setImage('https://media1.giphy.com/media/qt1RpaoZdOjShr4s9l/giphy.gif?cid=ecf05e47s8tym57xdx1t4uqty03abdxjstdwv29mxvrlq7jz&ep=v1_gifs_search&rid=giphy.gif&ct=g');
		  
		const answerlist = [embed1,embed2,embed3,embed4]
		
		let ansxd = answerlist[Math.floor(Math.random() * answerlist.length)]

		  message.channel.send(ansxd).then(message => message.delete(300000).catch());

	}
  });
  client.on('voiceStateUpdate', (oldState,newState) => {
    if(oldState.selfMute === true && newState.selfMute === false)
        console.log("unmuted")
    if(oldState.selfMute === false && newState.selfMute === true)
        console.log("muted")
    if(oldState.selfDeaf === true && newState.selfDeaf === false)
        console.log("undeaf")
    if(oldState.selfDeaf === false && newState.selfDeaf === true)
        console.log("deaf")
});

//   client.on('message', async message =>{

//     if(message.author.bot) return;
//     if(message.content=="test"){

// 		const vc = message.guild.channels.find(x => x.name == "pregame");
// 		message.guild.members.forEach(member => {
// 		  //guard clause, early return
// 		  if(member.id === message.member.id || !vc) return;
// 		  member.voice.setChannel(vc);
// 		}) } });

  client.on('message', message => {
  
	if(message.content.includes('יצר אותך')) {
	  if (message.author.bot) return;
	  const embed = new Discord.RichEmbed()
	  .setTitle('זכויות יוצרים! תיזהר בלשונך')
	  .setDescription(`${message.author}`)
	  .setColor("#FFFF00")
		message.channel.send(embed);
		
	}
  });

  client.on('message', message => {
  
	if(message.content.includes('עייפים') | message.content.includes('עייף')) {
	  if (message.author.bot) return;
	  const embed = new Discord.RichEmbed()
	  .setTitle('כולם פה גופות')
	  .setDescription(`${message.author}`)
	  .setImage('https://media2.giphy.com/media/10fxZavhBFXsUE/giphy.gif?cid=ecf05e4703v5iw5ne32om3jc0y7okpasbq70cvkpaui8vhtz&ep=v1_gifs_related&rid=giphy.gif&ct=g')
	  .setColor("#FFFF00")
		message.channel.send(embed);
		
	}
  });
  client.on('message', message => {
  
	if(message.content.includes('FIFO')) {
	  if (message.author.bot) return;
	  const embed = new Discord.RichEmbed()
	  .setTitle('<#1133811152976085092>')
	  .setDescription(`${message.author}`)
		message.channel.send(embed);
		
	}
  });
  client.on('message', message => {
  

	if(message.content.includes("סטטוס")) {
	  const embed = new Discord.RichEmbed()
	  .setTitle("**מצב נוכחי**")
	  .setColor('#0099ff')
	  .addField('סהכ', `**${message.guild.memberCount}**`, true)
	  .setThumbnail('https://images-ext-1.discordapp.net/external/zAH35AhJ-Hvac6L7-IIbN52vrUMhnVe79smtEX-MVdI/https/cdn-longterm.mee6.xyz/plugins/embeds/images/583574396686434304/bb005d43bf4aa287053d156edcf50ed163882cdf3766c2b77da4f852d7640aad.png')
	
	  .addField('משתמשים', `**${message.guild.members.filter(member => !member.user.bot).size}**`, true)
	  .addField('בוטים', `**${message.guild.members.filter(member => member.user.bot).size}**`, true)
	  .addField('דוח סטטוס', `**${message.guild.members.filter(o => o.presence.status === 'online').size}** Online\n**${message.guild.members.filter(i => i.presence.status === 'idle').size}** Inactive\n**${message.guild.members.filter(dnd => dnd.presence.status === 'dnd').size}** Do Not Disturb\n**${message.guild.members.filter(off => off.presence.status === 'offline').size}** Offline\n**${message.guild.members.filter(s => s.presence.status === 'streaming').size}** Streaming`)
	  .setFooter(`© MASTERBOT`)
	
	  message.channel.send({embed});
  }
  
  });

  client.on('message', message => {
  
	if(message.content.includes('עומר')) {
	  if (message.author.bot) return;
	  const embed = new Discord.RichEmbed()
	  .setTitle('`עומרי ובניו`')
	  .setImage('https://github.com/amiboko/GAMERSUNITEDBOT/blob/main/img/omri.gif?raw=true')


		message.channel.send(embed);
		
	}
  });

  client.on('message', message => {
  
	if(message.content.includes('גמור')) {
	  if (message.author.bot) return;
	  const embed = new Discord.RichEmbed()
	  .setTitle('`אתה גמור?! תראה אותה מסכנה`')
	  .setImage('https://github.com/amiboko/GAMERSUNITEDBOT/blob/main/img/dog.gif?raw=true')


		message.channel.send(embed);
		
	}
  });

  client.on('message', async message => {

	let amitlist = ['ששש', 'אל', 'אחלה', 'ביצה', 'עמי', 'שב']
	
	let amit = 
	[
  
		"מה איתך חיים שיייילייייי",
		"מתי תבוא לעל האש מתי",
		"איזה כיף זה להיות עמית אה",
		"אין על ה-אפלוליים",
		"התגעגתי אליך",
		"גע בי",
		"חתיכי!",
  
	];

	let amitush = Math.floor((Math.random() * amit.length));

	let foundInText = false;
	for (var i in amitlist) { 
	  if (message.content.toLowerCase().includes(amitlist[i].toLowerCase())) foundInText = true;
	  if (message.author.bot) return;
     }

		if(foundInText && message.author.id == '768978918911770655'){
	  const embed = new Discord.RichEmbed()
	  .setColor("#790000")
	  .setTitle(amit[amitush])
	  .setImage('https://github.com/amiboko/GAMERSUNITEDBOT/blob/main/img/AMIT.gif?raw=true')
  
		message.channel.send(embed);

		}
	
  });

  
  client.on('message', message => {
  
	if(message.content.includes('ksp')) {
	  if (message.author.bot) return;
	  const embed = new Discord.RichEmbed()
	  .setTitle('KSP \n שרמוטות גנבים אוכלים בתחת')
	  .setDescription(`${message.author}`)
	  .setColor("#000000")
		message.channel.send(embed);
		
	}
  });

  client.on('message', message => {

	if(message.content.includes('אוהב אותך')) {
	  if (message.author.bot) return;
	  const embed = new Discord.RichEmbed()
	  .setTitle('גם אני אוהב אותך נשמה יקרה')
	  .setDescription(`${message.author}`)
	  .setColor("#FFC0CB")
		message.channel.send(embed);
		
	}
  });

  client.on('message', message => {

	if(message.content.includes('שונא אותך')) {
	  if (message.author.bot) return;
	  const embed = new Discord.RichEmbed()
	  .setTitle('גם אני שונא אותך נשמה יקרה')
	  .setDescription(`${message.author}`)
	  .setColor("#FF69B4")
		message.channel.send(embed);
		
	}
  });


  client.on('message', message => {

	if(message.content.includes('כנס')) {
	  if (message.author.bot) return;
	  const embed = new Discord.RichEmbed()
	  .setTitle('`יאלה כנסו הבנות מחכות`')
	  .setImage('https://github.com/amiboko/GAMERSUNITEDBOT/blob/main/img/OMRICOD.gif?raw=true')
	  .setColor("#E6E6FA")
		message.channel.send(embed);
		
	}
  });


  client.once('ready', () => {
	const moment = require('moment-timezone');
	const CronJob = require('cron').CronJob;
	const channel = client.channels.find(chan => chan.name === '𝐂𝐡𝐚𝐭');
	let answerlist = [
	  'שבת שלום יפים שלי' 
	  ,'שבת שלום ומבורכת לכולם'  
	  ,'יאלה מתקלח זריז והולך לבית כנסת'  
	  ,'מי אוהב את השבת?'  
	  ,'שבת היום!'  
	  ,'SHABAT SHALOM!'  
	  ,'גיימרים יקרים שלי שתיהיה לכם שבת שלום']
  let ansxd = answerlist[Math.floor(Math.random() * answerlist.length)];
	var job = new CronJob({
		cronTime: '00 19 * * FRI', 
		onTick: function() {
		  const embed = new Discord.RichEmbed()
		  .setColor('#FFFF00')
		  .setTitle(ansxd)
		  channel.send(embed)
		  console.log(moment.tz('Israel').format('HH:mm:ss'))
		},
		start: false,
		timeZone: 'Israel'
   });
	job.start();
  });
  
  
  client.on('voiceStateUpdate', (oldMember, newMember) => {
	const newUserChannel = newMember.voiceChannel
	const oldUserChannel = oldMember.voiceChannel
	const channel = client.channels.get('797533178243317770');
  
	if(oldUserChannel === undefined && newUserChannel !== undefined) {
	  // if (!client.voiceConnections.bot) return;
	  if (newMember.id === '768978918911770655') {
		// client.channels.get('797533178243317770').send(newMember + 'ברוך הבא מלך הטברנה');
		// let role = newMember.guild.roles.find(role => role.name === "Verified");
		// newMember.addRole(role);
		// const embed = new Discord.RichEmbed()
		// .setAuthor("Verificaiton")
		// .setDescription("You have been verified")
		// .setFooter(newMember.guild.name)
		// .setColor("#98AFC7")
		// newMember.sendMessage(embed);
	  
	  if (!client.voiceConnections.some(conn => conn.channel.id == newUserChannel.id)) {
		newUserChannel.join().then(connection => {
		  const dispatcher = connection.playFile('./img/amit.wav', {volume: 1.5});
		  dispatcher.on('end', function () { 
			 setTimeout(async function () { await newUserChannel.leave() }, 10000);
			 
		   });
	
		  console.log("amit connected.");
		}).catch(e => {
  
		  console.error(e);
		});
	  }}
  	}
  });


  client.on('voiceStateUpdate', (oldMember, newMember) => {
	const newUserChannel = newMember.voiceChannel
	const oldUserChannel = oldMember.voiceChannel
	const channel = client.channels.get('797533178243317770');
  
	if(oldUserChannel === undefined && newUserChannel !== undefined) {
	  // if (!client.voiceConnections.bot) return;
	  if (newMember.id === '429742796052889600') {
		// client.channels.get('797533178243317770').send(newMember + 'ברוך הבא מלך הטברנה');
		// let role = newMember.guild.roles.find(role => role.name === "Verified");
		// newMember.addRole(role);
		// const embed = new Discord.RichEmbed()
		// .setAuthor("Verificaiton")
		// .setDescription("You have been verified")
		// .setFooter(newMember.guild.name)
		// .setColor("#98AFC7")
		// newMember.sendMessage(embed);
	  
	  if (!client.voiceConnections.some(conn => conn.channel.id == newUserChannel.id)) {
		newUserChannel.join().then(async connection => {
		  const dispatcher = await connection.playFile('./img/sharon.mp3', {volume: 1.0});
		  await dispatcher.on('end', function () { 
			 setTimeout(function () { newUserChannel.leave();}, 5000); 
			 
		   });
	
		  console.log("amit connected.");
		}).catch(e => {
  
		  console.error(e);
		});
	  }}
  	}
  }); 



  
client.on('message', message => {
  
	if(message.content.includes('לילה טוב')) {
	  if (message.author.bot) return;
		message.channel.send('לילה טוב גם לך' + message.author);
		
	}
  });
  
  client.on('message', message => {
	
	if(message.content.includes('בוקר טוב')) {
	  if (message.author.bot) return;
		message.channel.send('בוקר טוב גם לך' + message.author);
		
	}
  });
  
  client.on('message', message => {
	if (message.content.startsWith("שלחהודעה")) {
		// Get the channel mention
		if (message.mentions.channels.size == 0) {
			message.reply("please mention a channel first.");
		}
		else {
			let targetChannel = message.mentions.channels.first();
			// Get the message to print
  
			const args = message.content.split(" ").slice(2);
			let saytext = args.join(" ");
			targetChannel.send(saytext);
			message.delete();
		}
  }});
  

  client.on('message', async message => {

	let botlist = ['בוט','bot'] 
  
	let foundInText = false;
	for (var i in botlist) { 
	  if (message.content.includes(botlist[i].toLowerCase())) foundInText = true;
	}
	  if (foundInText) {
		if (message.author.bot) return;
		//message.delete();
  
		let answerlist = [            '**היי**'
			  ,'**כן?**'
			  ,'**שלום**'
			  ,'**מה קורה חיים שייליי**'
			  ,'**מהההההה**'
			  ,'**תגיד...יש מצב ההורים שלך אחים?**'
			  ,'**יכול להיות שאתה חייזר?**'
			  ,'**נו מה יהיה**'
			  ,'**דיי נו**'
			  ,'**גע בי**'
			  ,'**אה**'
			  ,'**שששששששששש**'
			  ,'**אתה חופר**'
			  ,'**סתום תפה**'
			  ,'**מה בעיות**'
			  ,'**מה אתה רוצה*'
  
			]
		
		let ansxd = answerlist[Math.floor(Math.random() * answerlist.length)];
  
		message.channel.send(message.author +'\xa0\xa0'+ ansxd);
	}
  });

  client.on('message', async message => {

	let blacklisted = ['זיין', 'גאבנו', 'סוכה', 'זונה', 'שרמוט', 'קוקסינל', 'תחת', 'חרא', 'בולבול', 'מכוער'
	, 'דפוק', 'אידיוט', 'חמור', 'מנייאק', 'מניאק', 'FUCK', 'fuck', 'מגעיל', 'טיפש',
	 'pussy', 'PUSSY', 'ass', 'ASS', 'כוסרבאק', 'כוס', 'כוסאומו','כוסראבק', 'מנוול' , 'מנוולת' , 'זין','ז י ן','דבע','ינעל','גרוע','ימיזדיין','ז ו נ ה',' ש ר מ ו ט ה','ב י צ י ם'] 
  
	let foundInText = false;
	for (var i in blacklisted) { 
	  if (message.content.toLowerCase().includes(blacklisted[i].toLowerCase())) foundInText = true;
	}
	  if (foundInText) {
		if (message.author.bot) return;
		//message.delete();
  
		let answerlist = [
				'`סליחה!?! רק לי מותר לקלל פה יזיין`'
			  , '`אתה מקלל הרבה לאחרונה... הכל בסדר בבית?`' 
			  ,'**מה יהיה עם הקללות**'
			  ,'**⚠️ תרגיע עם הקללות שלך ⚠️**'
			  ,'**חבל!**'
			  ,'**חלאס לקלל יבור של חרא**'
			  ,'**אני באמת לא מבין למה אתה צריך להשתמש בשפה כה בוטה כל הזמן**'
			  ,'**למה לקלל למה**'
			  ,'**אזהרה אחרונה!**'
			  ,'**ההורים שלך בדוק אחים, צור קשר עם צופית גרנט**'
			  ,'**בחיי עדיף להיות בוט מאשר עומרי עמר**'
			  ,'**מזל שעשה אותי בוט ולא עמית אפללו**'
			  ,'**שמע אין לך חיים שאתה ככה מקלל בוט**'
			  ,'תיהיה גבר כנס לערוץ שיחה ותרשום שקט או שתוק או סתום'
			  ,'**אתה כל כך שמן שאצלך השבת לא נכנסת, אין לה מקום**'
			  ,'**אם תשב בחוץ הרבה זמן תבוא משאית זבל לאסוף אותך**'
			]
		
		let ansxd = answerlist[Math.floor(Math.random() * answerlist.length)];
  
		message.channel.send(message.author +'\xa0\xa0'+ ansxd);
	}
  });

  client.on('message', (message) => {
	if (message.content == 'בטל השתק') {
	  message.delete(5000)
		let channel = message.member.voiceChannel;
		if(!channel) return message.channel.send('כנס קודם לערוץ שיחה יחמור').then(message => message.delete(10000).catch());
		for (let member of channel.members) {
			member[1].setMute(false)
			message.channel.send('🔇').then(message => message.delete(50000).catch());
		}
		if (message.author.bot) return
	 }
  });
  
  client.on('message', message => {
	
	if(message.content.includes('קלל')) {
	  if (message.author.bot) return;
	  const embed = new Discord.RichEmbed()
	  .setTitle('`🔞`')
	  .setColor("#000000")
  
		message.channel.send(embed);
		
	}
  });
  

  client.on('message', message => {
	
	if(message.author.id == '524302700695912506' && message.content.includes('אל')) {
	  if (message.author.bot) return;
	  const embed = new Discord.RichEmbed()
	  .setTitle('``')
	  .setColor("#000000")
  
		message.channel.send(embed);
		
	}
  });
  

  client.on('message', message => {
  
	if(message.content.includes('אללה')) {
	  if (message.author.bot) return;
	  const embed = new Discord.RichEmbed()

	  .setDescription(`${message.author}`)
	  .setColor("#000000")
	  .setImage('https://media.tenor.com/BtXzRpYYj88AAAAC/yalla-yala.gif')

		message.channel.send(embed);
		
	}
  });
  
  client.on('message', message => {
	
	if(message.content.includes('חלע')) {
	  if (message.author.bot) return;
	  const embed = new Discord.RichEmbed()
	  .setTitle('`💣💣💣💣💣💣💣💣💣💣💣💣💣💣💣💣`')
	  .setColor("#D61F1F")
	  .setImage('https://media.tenor.com/BrW62hJ1-Z0AAAAC/rambo-first-blood.gif')
  
		message.channel.send(embed);
		
	}
  });
  

  client.on('message', message => {
	
	if(message.content.includes('שבוע טוב')) {
	  if (message.author.bot) return;
	  const embed = new Discord.RichEmbed()
	  .setTitle('שבוע טוב גם לך נשמה יקרה')
	  .setDescription(`${message.author}`)
	  .setColor("#D61F1F")
	  .setImage('https://img1.picmix.com/output/pic/normal/1/3/9/3/7813931_ccd80.gif')
  
		message.channel.send(embed);
		
	}
  });




  client.on('message', message => {
	
	if(message.content.includes('ניפוח')) {
	  if (message.author.bot) return;
	  const embed = new Discord.RichEmbed()
	  .setDescription(`${message.author}`)
	  .setColor("#D61F1F")
	  .setImage('https://media.tenor.com/LdQQcvM76XkAAAAd/travolta-warzone.gif')
  
		message.channel.send(embed);
		
	}
  });


  client.on('message', message => {
	
	if(message.content.includes('קרחת')) {
	  if (message.author.bot) return;
	  const embed = new Discord.RichEmbed()
	  .setDescription(`${message.author}`)
	  .setColor("#D61F1F")
	  .setImage('https://media3.giphy.com/media/4NgH0qihKwNsWcz6Ku/giphy.gif?cid=ecf05e47ak6779u75xrlfqoqh2ohe06mhgpcsf3cenz586u4&ep=v1_gifs_search&rid=giphy.gif&ct=g')
  
		message.channel.send(embed);
		
	}
  });


  client.on('message', message => {
	
	if(message.content.includes('מלחמה')) {
	  if (message.author.bot) return;
	  const embed = new Discord.RichEmbed()
	  .setDescription(`${message.author}`)
	  .setColor("#D61F1F")
	  .setImage('https://media2.giphy.com/media/7EFCu9NGr4bSXFoXcY/giphy.gif?cid=ecf05e471vhznwqhi2lz87o02pq56cho695zo5erym5bc6ix&ep=v1_gifs_search&rid=giphy.gif&ct=g')
  
		message.channel.send(embed);
		
	}
  });

  client.on('message', message => {
	
	if(message.content.includes('חזק')) {
	  if (message.author.bot) return;
	  const embed = new Discord.RichEmbed()
	  .setTitle('חזק ובניו 💪')
	  .setColor("#F0F0F0")
  
		message.channel.send(embed);
	}
  });

  client.on('message', message => {
	
	if(message.content.includes('כן ו')) {
	  if (message.author.bot) return;
	  const embed = new Discord.RichEmbed()
	  .setTitle('לא וסתום תפה')
	  .setColor("#F0F0F0")
  
		message.channel.send(embed);
	}
  });
  
  client.on('message', message => {
	
	if(message.content.includes('תודה')) {
	  if (message.author.bot) return;
	  const embed = new Discord.RichEmbed()
	  .setTitle('בכיף נשמה יקרה')
	  .setColor("#FFC0CB")
	  .setDescription(`${message.author}`)
  
		message.channel.send(embed);
		
	}
  });


  client.on('message', message => {
  
	if(message.content.includes('מלשין')) {
	  if (message.author.bot) return;
	  const embed = new Discord.RichEmbed()
	  .setTitle('<a:veri:691980334782218240>')
	  .setDescription(`${message.author}`)
	  .setColor("#0000FF")
  
		message.channel.send(embed);
		
	}
  });
  
  
  client.on('message', message => {
	
	if(message.content.includes('חכם')) {
	  if (message.author.bot) return;
		message.channel.send('<a:veri:691980335235334155>');
		
	}
  });
  


  client.on('message', message => {
	
	if(message.content.includes('אמא ואבא')) {
	  if (message.author.bot) return;
		message.channel.send('מי אוהב את השבת?');
		
	}
  });
  
  client.on('message', message => {
	
	if(message.content.includes('סבא וסבתא')) {
	  if (message.author.bot) return;
		message.channel.send('מי אוהב את השבת?');
		
	}
  });
  
  client.on('message', message => {
	
	if(message.content.includes('אני אתה ואת')) {
	  if (message.author.bot) return;
		message.channel.send('מה לי ולשבת אני בוט ימפגר');
		
	}
  });
  
  client.on('message', message => {
	
	if(message.content.includes('סליחה')) {
	  if (message.author.bot) return;
		message.channel.send('אני סולח לך');
		
	}
  });
  
  
  client.on('message', message => {
	
	if(message.content.includes('סעמק')) {
	  if (message.author.bot) return;
		message.channel.send('ערס');
		
	}
  });
  
  client.on('message', message => {
	
	if(message.content.includes('דופק אותך')) {
	  if (message.author.bot) return;
		message.channel.send('איפה לדפוק אותך?');
		
	}
  });
  
  client.on('message', message => {
	
	if(message.content.includes('אמא שלך')) {
	  if (message.author.bot) return;
		message.channel.send(message.author +'\xa0\xa0'+'אמא שלך **אוהבת** את השירותים שלי');
		
	}
  });
  
  client.on('message', message => {
	
	if(message.content.includes('זורם')) {
	  if (message.author.bot) return;
		message.channel.send(message.author +'\xa0\xa0'+ '`אני תמיד זורם`');
		
	}
  });
  
  client.on('message', message => {
	
	if(message.content.includes('אמין')) {
	  if (message.author.bot) return;
		message.channel.send(message.author + '`אני מאמין לך`');
		
	}
  });
  
  client.on('message', message => {
	
	if(message.content.includes('מבין')) {
	  if (message.author.bot) return;
		message.channel.send(message.author + '`אני מבין אותך`');
		
	}
  });
  
  client.on('message', message => {
	
	if(message.content.includes('איפה כולם')) {
	  if (message.author.bot) return;
		message.channel.send(message.author + '`כולם מוצצים לי כרגע, נא לא להפריע`');
		
	}
  });
  
  client.on('message', message => {
	
	if(message.content.includes('שחור')) {
	  if (message.author.bot) return;
		message.channel.send(message.author + '`זה הצבע שאתה אוהב?`');
		
	}
  });
  
  
  
  client.on('message', message => {
	
	if(message.content.includes('מייי')) {
	  if (message.author.bot) return;
		message.channel.send('`🐱 מיאאאההווו חתולההההה 🐱`');
		
	}
  });

  
  
client.on('message', message => {
	if(message.content.includes('מעפן')) {
	  if (message.author.bot) return;
		message.channel.send('`מי מעפן?!`');
	}
  });
  

  client.on('message', message => {
	if(message.content.includes('סבבה')) {
	  if (message.author.bot) return;
		message.channel.send('`סבמבה`');
	}
  });
  
  client.on('message', message => {
	if(message.content.includes('בוטוש')) {
	  if (message.author.bot) return;
		message.channel.send('`קוקסינל שלי!`');
	}
  });
  
  client.on('message', message => {
	if(message.content.includes('חחח')) {
	  if (message.author.bot) return;
		message.channel.send('😂');
	}
  });
  
  client.on('message', message => {
	if(message.content === '?') {
	  if (message.author.bot) return;
		message.channel.send(message.author +'\xa0\xa0'+ '`מה אתה לא מבין?`');
	}
  });
  

  
  client.on('message', message => {
	if(message.content === '??') {
	  if (message.author.bot) return;
		message.channel.send(message.author +'\xa0\xa0'+ '`מה הסיפור שלך?`');
	}
  });
  
  client.on('message', message => {
	if(message.content === '???') {
	  if (message.author.bot) return;
		message.channel.send(message.author +'\xa0\xa0'+ '`יש מצב שאתה גיי?`');
	}
  });
  
  client.on('message', message => {
	if(message.content === '????') {
	  if (message.author.bot) return;
		message.channel.send(message.author +'\xa0\xa0'+ '`טוב מה נסגר איתך?`');
	}
  });
  
  client.on('message', message => {
	if(message.content === '?????') {
	  if (message.author.bot) return;
		message.channel.send(message.author +'\xa0\xa0'+ '`מה אתה רוצה?`');
	}
  });

   client.on('message', message => {
	if(message.content === '?????') {
	  if (message.author.bot) return;
		message.channel.send(message.author +'\xa0\xa0'+ '`מה אתה רוצה?`');
	}
  });

  client.on("error", info => {
	console.log('Error event:\n' + JSON.stringify(info));
	// handle the error here
  });




  client.login(token);
