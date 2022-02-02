// Listen in daily-report channel

const { Participators } = require('../dbObjects');
const { activateParticipator } = require('./participator/activate');
const { addParticipator } = require('./participator/add');
const { addDailyReport } = require('./participator/dailyReport');
const { deactivateParticipator } = require('./participator/deactivate');

module.exports = {
  name: 'messageCreate',
  once: false,
  execute(message) {
    if (message.author.bot) return;

    // Add User into Challenge
    if (message.member?.roles?.cache?.some(r => r.name === 'ADMIN')) {
      if (message.content.startsWith('*add')) {
        addParticipator(message, Participators);
        return;
      }

      if (message.content.startsWith('*activate')) {
        activateParticipator(message, Participators);
        return;
      }

      if (message.content.startsWith('*deactivate')) {
        deactivateParticipator(message, Participators);
        return;
      }
    }

    // Save Daily report
    if (message.channel.name === 'daily-report' || message.channel.name === 'management' && message.content.startsWith('*daily') && message.attachments) {
      addDailyReport(message, Participators);
    }
  },
};
