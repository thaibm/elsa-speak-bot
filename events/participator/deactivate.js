module.exports = {
  deactivateParticipator(message, Participators) {
    message.mentions.users.each(async user => {
      try {
        const participator = await Participators.findOne({ where: { user_id: user.id } });
        if (participator) {
          await Participators.update({ is_active: false, left_date: new Date() }, { where: { user_id: user.id } });
          return message.reply(`<@${user.id}> has left Elsa Speak Challenge!`);
        }
        return message.reply('The Participator has not joined challenge yet! Use *add instead of *deactivate.');
      }
      catch (error) {
        return message.reply('Something went wrong with adding a participator.');
      }
    })
  }
}