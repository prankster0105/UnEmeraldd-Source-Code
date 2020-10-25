

module.exports = {
    name: "ban",
    expectedArgs: "<member> <reason>",
    description: "ban hammer",
    permissionError: "The member either cannot be banned, my role is too low in the role hierarchy, or you do not have permission.",
    minArgs: 2,
    //maxArgs: 2
    permissions:  ['BAN_MEMBERS', 'MANAGE_MEMBERS', 'ADMINISTRATOR'],
    callback: (message, arguments) => {
        const wUser = message.mentions.users.first(); // the user we are going to be banning

        const reason = arguments.join(" ");

        const wMember = message.guild.members.cache.find(member => member.id === wUser.id);

        if (!wMember) return message.channel.send("That user could not be found.");


        const permissions =  ['BAN_MEMBERS', 'MANAGE_MEMBERS', 'ADMINISTRATOR']

        for (permission of  permissions) {
            if (wMember.hasPermission(permission)) {
                message.channel.send("I cannot ban a moderator/administrator.");
                break;
            } else {
                wMember.createDM()
                .then((dm) => {
                    dm.send(`You have been banned from **${message.guild.name}** by ${message.author.username} because of: ${reason}`);
                })
                .catch((err) => {
                    message.channel.send("There was an error with banning the user:\n\n " + err);
                    return console.log(err);
                })

                wMember.ban()
                .then(() => {
                    message.channel.send(`${wUser.username} was banned because of: ${reason}`);
                })
                .catch((err) => {
                    message.channel.send("There was an error with banning the user\n\n " + err);
                })

                break;
            }
        }
        
    }
    
}