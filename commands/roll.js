
module.exports = {
    name: "roll",
    description: "Roll into her DMs",
    expectedArgs: "<member> <member>",
    minArgs: 0,
    maxArgs: 0,
    permissions: null, //none

    callback: (message, arguments) => {
        const num = Math.floor(Math.random() * 100);

        message.channel.send(`**\`Rolling . . .\`**`);
        setTimeout(() => {
            message.channel.send(`You got a roll of **\`${num}\`**!`);
        }, 3000);
    }
}
