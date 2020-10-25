

module.exports = {
    name: "pog",
    description: "pog pog pogu",
    expectedArgs: "<fuck you (sorry eathanrocs420)>",
    minArgs: 1,
    maxArgs: 999999999999999,

    callback: (message, arguments) => {
        const pogEmoji = message.guild.emojis.cache.find(emoji => emoji.name === "oldpog");

        if (!pogEmoji) return console.log("can't find pogemoji sad!");

        arguments.join(" ");

        message.delete();
        message.reply(`pog pog pogu ${pogEmoji} ${pogEmoji} ${arguments} ${pogEmoji}`);

    }
}