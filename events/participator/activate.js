module.exports = {
  activateParticipator(message, Participators) {
    message.mentions.users.each(async user => {
      try {
        const participator = await Participators.findOne({ where: { user_id: user.id } });
        if (participator) {
          await Participators.update({ is_active: true, joined_date: new Date() }, { where: { user_id: user.id } });
          message.client.channels.cache.find(channel => channel.id === '934366653830017087').send(`<@${user.id}> has joined Elsa Speak Challenge!`);
          return message.reply(`User <@${user.id}> has joined Elsa Speak Challenge!`);
        }
        return message.reply('The Participator has not joined challenge yet! Use *add instead of *activate.');
      }
      catch (error) {
        return message.reply('Something went wrong with adding a participator.');
      }
    })
  }
}
