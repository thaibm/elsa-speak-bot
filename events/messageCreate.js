// Listen in daily-report channel

const { Participators } = require('../dbObjects');
const { addParticipator } = require('./participator/add');
const { addDailyReport } = require('./participator/dailyReport');

module.exports = {
  name: 'messageCreate',
  once: false,
  execute(message) {
    if (message.author.bot) return;

    // Add User into Challenge
    if (message.member.roles.cache.some(r => r.name === 'ADMIN')) {
      if (message.content.startsWith('*add')) {
        addParticipator(message, Participators);
        return;
      }

      // TODO break to new event handling
      if (message.content.startsWith('*deactivate')) {
        message.mentions.users.each(async user => {
          try {

          }
          catch (error) {

          }
        })
      }

      // TODO break to new event handling
      if (message.content.startsWith('*activate')) {
        message.mentions.users.each(async user => {
          try {

          }
          catch (error) {

          }
        })
      }
    }

    // Save Daily report
    if (message.channel.name === 'daily-report' && message.content.startsWith('*daily') && message.attachments) {
      addDailyReport(message, Participators);
    }
  },
};
