


module.exports = {
  name: 'tempmute',
  description: 'A command similar to `mute`, but the effects being temporary.',
  permissionError: 'You do not have permission to temporarily mute that member. (or there was an error doing so)',
  permissions: ['KICK_MEMBERS', 'ADMINISTRATOR'],
  minArgs: 2,
  //maxArgs: 2

  callback: (message, arguments) => {
    createMuteRole = () => {
      message.guild.roles.create({
        data: {
          name: 'Muted',
          color: 'GREY',
          hoist: true,
          permissions: {
            SEND_MESSAGES: false,
            READ_MESSAGES: true,
            ADD_REACTIONS: false
          },
          mentionable: false,
        },
        reason: 'Someone attempted to mute someone, and there was no existing mute role.',
      })
      .then((role) => {
        return role;
      })
      .catch((err) => {
        message.channel.send(`There was a problem with creating a new \"Muted\" role:\n\`${err}\``);
      })
    }



    arguments.shift();
    let duration = arguments.shift();

    if (parseInt(duration) == "NaN") return message.channel.send("You must give a duration (in minutes) for the temporary mute!");

    duration = parseInt(duration);

    const reason = arguments.join(" ");

    const wUser = message.mentions.users.first();
    let muteRole = message.guild.roles.cache.find(role => role.name == "Muted" || role.name == "muted") || createMuteRole();

    if (!wUser) return message.channel.send("You must provide someone to temporarily mute, and then a reason");

    const memberToMute = message.guild.members.cache.find(member => member.id == wUser.id);

    if (!memberToMute) return message.channel.send("That member could not be found in this guild.");
    if (memberToMute.roles.cache.find(role => role.name == "Muted" || role.name == "muted")) return message.channel.send("That member is already muted!");

    const permissions = ['KICK_MEMBERS', 'ADMINISTRATOR'];
    const permissionError = 'You do not have permission to temporarily mute that member. (or there was an error doing so)';

    for (const permission of permissions) {
  //    if (memberToMute.hasPermission(permission)) {
  //      return message.channel.send(permissionError);
  //    } else {
        // add the role to the member
        memberToMute.roles.add(muteRole, reason)
        .then(() => {
          message.channel.send(`${memberToMute} was muted for: \`${reason}\` (lasts for: \`${duration}\`).`);
        })
        .catch((err) => {
          message.channel.send(`There was an error with adding the mute role to the member:\n\`${err}\``);
        })

        // create a dm with them to notify that they have been muted
        memberToMute.createDM()
        .then((dm) => {
          dm.send(`You have been temporarily muted in **${message.guild.name}** for: \`${reason}\` (lasts for ${duration} minutes).`);
        })
        .catch((err) => {
          message.channel.send(`\`NOTE: I was unable to create a DM with the mentioned member. ERROR:\n${err}\``);
        })

        break;
      }

      setTimeout(() => {
        if (memberToMute.roles.cache.find(role => role.name == "Muted" || role.name == "muted")) return;

        memberToMute.roles.remove(muteRole)
        .then(() => {
          console.log(`${memberToMute} has been unmuted.`);
        })
        .catch((err) => {
          console.log(`error unmuting ${memberToMute}: ${err}`);
        });

        memberToMute.createDM()
        .then((dm) => {
          dm.send("You have been unmuted.");
        })
        .catch((err) => {
          console.log(err);
        });
      }, (duration * 1000) * 60);

    }

//  }

}
