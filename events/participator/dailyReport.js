module.exports = {
  async addDailyReport(message, Participators) {
    for (const attachment of message.attachments) {
      const [id] = attachment;
      if (id) {
        try {
          let user = await Participators.findOne({ where: { user_id: message.author.id } });

          if (!user) {
            await Participators.create({
              user_id: message.author.id,
              username: message.author.username,
              is_active: true,
              joined_date: new Date()
            });
            user = await Participators.findOne({ where: { user_id: message.author.id } });
            message.client.channels.cache.find(channel => channel.id === '934366653830017087').send(`<@${user.id}> has joined Elsa Speak Challenge!`);
          }

          await user.addDailyReport(id);
          return message.reply(`Saved <@${message.author.id}>'s daily report`);
        } catch (error) {
          return message.reply('Something went wrong with saving daily report.');
        }
      }
      return message.reply('Your report is invalid, plz upload your evidence!');
    }
  }
}
