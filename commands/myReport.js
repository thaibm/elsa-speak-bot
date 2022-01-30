const { SlashCommandBuilder } = require('@discordjs/builders');
const { Participators } = require('../dbObjects');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('my-report')
		.setDescription('Show my report!'),
	async execute(interaction) {
		const participator = await Participators.findOne({ where: { user_id: interaction.user.id } });

		await interaction.reply(`\`\`\`- Your repayment amount: ${participator.repayment_amount} VND,\n- Your paid amount: ${participator.paid_amount} VND,\n- Your prize amount: ${participator.prize_amount} VND.\`\`\``);
	},
};
