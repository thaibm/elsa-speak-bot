const { SlashCommandBuilder } = require('@discordjs/builders');
const { ytdCheck } = require('../helpers/ytdCheck');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('yesterday-check')
    .setDescription('Check participator yesterday reports!'),
  async execute(interaction) {
    const message = await ytdCheck();

    await interaction.client.channels.cache.find(channel => channel.id === '934366653830017087').send(message);
    await interaction.reply(message);
  },
};
