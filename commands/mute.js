

module.exports = {
    name: "mute",
    expectedArgs: "<member> <reason>",
    description: "Mute a member if they're being too dirty.",
    permissionError: "You do not have permission to mute that member, or my role in the hierarchy is too low.",
    permissions: ['KICK_MEMBERS', 'ADMINISTRATOR'],
    minArgs: 2,
    //maxArgs: 2,

    callback: (message, arguments) => {
        const wUser = message.mentions.users.first(); //the user we will be going to mute
        let muteRole = message.guild.roles.cache.find(role => role.name === "Muted" || role.name === "muted");

        arguments.shift();

        let reason = arguments.join(" ");

        
        if (!muteRole) {
            guild.roles.create({
                data: {
                    name: 'Muted',
                    color: 'GREY',
                    hoist: true,
                    permissions: {
                        SEND_MESSAGES: false,
                        READ_MESSAGES: true,
                        ADD_REACTIONS: false,
                    },
                    mentionable: true,
                },
                reason: "There was no existing muted role.",
            })
            .then((role) => {
                muteRole = role;
            })
            .catch((err) => {
                message.channel.send("There was an error with creating the role:\n " + err);
            })
        }


        if (!wUser) return message.channel.send("You must specify someone to mute!");

        // look for the member of the user earlier
        const wMember = message.guild.members.cache.find(member => member.id === wUser.id);

        if (!wMember) return message.channel.send("That member could not be found in this guild.");

        if (wMember.roles.cache.find(role => role.name === muteRole.name)) return message.channel.send("That member is already muted.");

        const permissions = ['KICK_MEMBERS', 'ADMINISTRATOR']
        const permissionError = "You do not have permission to mute that member, or my role in the hierarchy is too low."

        for (permission of permissions) {
            if (wMember.hasPermission(permission)) {
                message.channel.send(permissionError);
                break;
            } else {
                wMember.roles.add(muteRole, reason)
                .then(() => {
                    message.channel.send(`${wUser.username} was muted for: **${reason}**`);
                })
                .catch((err) => {
                    message.channel.send(`There was a problem with adding the role to the member:\n${err}`);
                    
                })
        
                wMember.createDM()
                .then((dm) => {
                    dm.send(`You have been muted in ${message.guild.name} because of: **${reason}**`);
                    
                })
                .catch((err) => {
                    message.channel.send("There was a problem with creating a DM with the user: \n" + err);
                })
                break
            }
        }

       
    }
}