
module.exports = {
    name: "unmute",
    expectedArgs: "<member>",
    minArgs: 0,
    maxArgs: 0,
    permissions: ['KICK_MEMBERS', 'ADMINISTRATOR'],
    permissionError: "You do not have permission to unmute the member.",

    callback: (message, arguments) => {
        const wUser = message.mentions.users.first();

        const expectedArgs = "<member>"

        if (!wUser) return message.channel.send(`Invalid syntax! Use \`${expectedArgs}\``);

        const wMember = message.guild.members.cache.find(member => member.id === wUser.id);

        if (!wMember) return message.channel.send("That member could not be found.");

        const muteRole = wMember.roles.cache.find(role => role.name === "Muted" || role.name === "muted");

        if (!muteRole) return message.channel.send("That member is not muted.");

        wMember.roles.remove(muteRole)
        .then(() => {
            message.channel.send(`${wMember} has been unmuted.`);
        })
        .catch((err) => {
            message.channel.send(`There was an error with unmuting the member:\n${err}`);
        })
    }
}