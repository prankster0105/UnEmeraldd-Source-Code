const fs = require("fs");
const { join } = require("path");
const t = '../userdata/warns.json'
const warn_data = JSON.parse(fs.readFileSync('C:/Users/Acer/Desktop/DiscordBots/Mr. Prankster/userdata/warns.json', 'utf8'));

module.exports = {
    name: "warn",
    expectedArgs: "<member> <reason>",
    description: "Warn a member. After a few warns, they will be either muted or kicked.",
    permissionError: "You do not have permission to use that command.",
    minArgs: 2,
    // maxArgs: 2,
    callback: (message, arguments) => {
        const wUser = message.mentions.users.first(); // the user we are going to warn
        
        let reason = ""
        for (word of arguments) { 
            reason += word + " "
        }
        if (!warn_data[wUser.id]) {
            warn_data[wUser.id] = {
                warns: 0
            }
            console.log(wUser.id);
            console.log(wUser.username);
            warn_data[wUser.id].warns++;
            fs.writeFile('C:/Users/Acer/Desktop/DiscordBots/Mr. Prankster/userdata/warns.json', 
            
            JSON.stringify(warn_data), (err) => { if (err) {return console.warn(err)}});


        } else if (warn_data[wUser.id]) {
            warn_data[wUser.id].warns++;
            fs.writeFile('C:/Users/Acer/Desktop/DiscordBots/Mr. Prankster/userdata/warns.json', 
            JSON.stringify(warn_data), (err) => { if (err) {return console.warn(err)}});
        }
       
        if (warn_data[wUser.id].warns > 5) {
            const kMember = message.guild.member(wUser);

            if (kMember) 
            {
                return kMember.kick('Too many warnings.');
            }
        }
        wUser.createDM()
        .then((dm) => {
            dm.send(`You have been warned in **${message.guild.name}** because of: ${reason}`);
        })
        message.channel.send(`${wUser.username} has been warned for: ${reason}`);
    },
    permissions: ['KICK_MEMBERS', 'ADMINISTRATOR'],
}