module.exports = {
  addParticipator(message, Participators) {
    message.mentions.users.each(async user => {
      try {
        await Participators.create({
          user_id: user.id,
          is_active: true,
          joined_date: new Date()
        })
        message.reply(`User <@${user.id}> joined Elsa Speak Challenge!`);
      }
      catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
          await Participators.update({ is_active: true }, { where: { user_id: user.id } });
          return message.reply('That participator already exists.');
        }

        return message.reply('Something went wrong with adding a participator.');
      }
    })
  }
}