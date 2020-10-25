const discord = require("discord.js");

module.exports = {
    name: "help",
    minArgs: 0,
    maxArgs: 0,
    
    callback: (message, clientcommands) =>{
    
        const helpEmbed = new discord.MessageEmbed();
        helpEmbed.setTitle("My commands!");
        helpEmbed.setDescription("Here are my commands!");
        for (const command of clientcommands) {
           const clientcommand = clientcommands.get(command);
           
           
            for (const commandprops of command) {
                if (!commandprops.name || !commandprops.description) {
                    //nothing
                } else {
                    helpEmbed.addField(
                        commandprops.name,
                        commandprops.description,
                        true,
                    );
                }
                
            }
        }

        message.channel.send(helpEmbed);

    }
}