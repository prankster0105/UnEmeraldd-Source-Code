let search = require("youtube-search");

let opts = {
    maxResults: 1,
    key: "AIzaSyDXgmJwtBTd4fV3l2O9tychqZb8_eJYolg",
}


module.exports = {
    name: "youtube",
    description: "Search for YouTube videos! (broken, not functional)",
    expectedArgs: "<name of video, or link>",
    permissionError: "You cannot use that command in this channel.",
    minArgs: 1,
    maxArgs: 100,

    callback: async (message, arguments) => {
        const { channel, content } = message;

        

        const newArgs = arguments.join(" ");

        
        search(newArgs, opts, function(err, results) {
            if (err) return channel.send("error:\n" + err);

            channel.send(result);
        })
    }
}