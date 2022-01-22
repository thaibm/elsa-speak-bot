module.exports = {
  name: 'messageCreate',
  once: false,
  execute(message) {
    if (message.author.bot) return;
    console.log('🚀 ~ file: messageCreate.js ~ line 5 ~ execute ~ message', message);
    message.reply(`User ${message.author} type '${message}'`);
  },
};
