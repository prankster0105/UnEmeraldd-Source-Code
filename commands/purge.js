

module.exports = {
    name: "purge",
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: "<no. messages to delete>",
    permissionError: "You do not have permission to clear messages in this channel.",
    permissions: ["MANAGE_CHANNELS", "ADMINISTRATOR"],

    callback: (message, arguments) => {
        const { channel } = message;

        channel.bulkDelete(arguments[0])
        .then(() => {
            channel.send(`Deleted ${arguments[0]} messages from this channel.`);
            message.delete();
        })
        .catch((err) => {
            return channel.send(`There was unfortunately an error purging:\n${err}`);
        })
    }
}