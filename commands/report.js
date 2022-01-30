const { SlashCommandBuilder } = require('@discordjs/builders');
const { Participators } = require('../dbObjects');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('report')
		.setDescription('Show all participators report!'),
	async execute(interaction) {
		const participators = await Participators.findAll({ where: { is_active: true } });
		
		await interaction.reply(`There are ${participators.length} participators: ${participators.map(p => p.username).join(', ')} in Challenge!`);
	},
};
