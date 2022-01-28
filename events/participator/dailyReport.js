module.exports = {
  async addDailyReport(message, Participators) {
    for (const attachment of message.attachments) {
      const [id] = attachment;
      if (id) {
        try {
          const user = await Participators.findOne({ where: { user_id: message.author.id } });
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
