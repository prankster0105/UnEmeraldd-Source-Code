


module.exports = {
    name: "kick",
    description: "Waraenai, egao miseta.",
    expectedArgs: "kick <member> <reason>",
    permissionError: "You do not have permission to kick that member.",
    minArgs: 2,
    //maxArgs: 2
    callback: (message, arguments) =>  {
        const wUser = message.mentions.users.first();
        
        const reason = arguments.join(" ");
        const member = message.guild.members.cache.find(member => member.id === wUser.id);
        console.log(member);
        if (member && !member.hasPermission('KICK_MEMBERS') || 
            !member.hasPermission('BAN_MEMBERS') ||
            !member.hasPermission('ADMINISTRATOR')) {
            member.createDM()
            .then((dm) => {
                dm.send(`You have been kicked from **${message.guild.name}** because of: ${reason}`);
                member.kick(reason);
                message.channel.send(`${member} has been kicked for: ${reason}`);
            })
            .catch((err) => {
                console.error(err);
            });
        } else {
            message.reply('You do not have permission to kick that member.');
        }
    },
    permissions: ['KICK_MEMBERS', 'ADMINISTRATOR']
}