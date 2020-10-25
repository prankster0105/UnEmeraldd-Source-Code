const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const path = require("path");
const YTModule = require("discord-youtube-api");

const youtube = new YTModule("AIzaSyDXgmJwtBTd4fV3l2O9tychqZb8_eJYolg");



const config = require("./config.json");


client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for (const file of commandFiles)
{
    const command = require(`./commands/${file}`);
    console.log(command.name);

    client.commands.set(command.name, command);
}

client.on("ready", () => {
    console.log("Bot is ready.");
})

client.on("message", (message) => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    const clientcommand = client.commands.get(command);

    if (clientcommand && clientcommand.name != "help")
    {
        clientcommand.maxArgs = clientcommand.maxArgs || 100;
        clientcommand.permissions = clientcommand.permissions || null;
        clientcommand.permissionError = clientcommand.permissionError || "You do not have permission to use that.";

        if (clientcommand.minArgs === null) return console.error("You did not provide a minArg for " + clientcommand.name);

        if (clientcommand.permissions != null) {
            for (const perm of clientcommand.permissions) {
                if (message.member.hasPermission(perm)) {
                    if (args.length > clientcommand.maxArgs ||
                        args.length < clientcommand.minArgs) {
                        
                        message.channel.send(`Invalid syntax! Use ${clientcommand.expectedArgs}`); 
                        break; 
                    }
                    // but if syntax is correct:

                    clientcommand.callback(message, args);
                    break;

                } else {
                    message.channel.send(clientcommand.permissionError);
                    break; 
                }
            }
        } else {
            // but if permissions is null, then
            if (args.length > clientcommand.maxArgs ||
                args.length < clientcommand.minArgs) {
                    return message.channel.send(`Invalid syntax! Use ${clientcommand.expectedArgs}`);
            }
            clientcommand.callback(message, args);
        }
    } else if (clientcommand && clientcommand.name === "help") {
        clientcommand.callback(message, client.commands);
    } else {
        const embed = new Discord.MessageEmbed()
        .setTitle("Hello!")
        .setDescription(`	I'm ${client.user.username}, the unofficial bot for this server!
If you don't know how to use me, my prefix is \`${config.prefix}\`. You can say \`${config.prefix}help\` for more information on other commands.`)
        .setAuthor(message.author.username);

        message.channel.send(embed);
    }
    
})

client.login(config.token);