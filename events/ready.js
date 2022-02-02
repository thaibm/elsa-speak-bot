const CronJob = require('cron').CronJob;
const { Participators, DailyReports } = require('../dbObjects');
const { Op, literal } = require('sequelize');
const { ONE_DAY } = require('../constants');
const { ytdCheck } = require('../helpers/ytdCheck');

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		const reminder = new CronJob('00 13 * * *', async () => {
			const participants = await Participators.findAll({ attributes: ['user_id'], where: { is_active: true } });
			participants.forEach(p => {
				client.users.fetch(p.user_id, false).then((user) => {
					user.send(`Hey Honey, Don't forget learning English! :heart:`);
				});
			});
		});
		reminder.start();

		const ytdReport = new CronJob('00 11 * * *', async () => {
			const { message, participators } = await ytdCheck();
			if (participators.length) {
				await Participators.update(
					{ repayment_amount: literal('repayment_amount + 20000') },
					{
						where: {
							user_id: {
								[Op.in]: participators,
							}
						}
					}
				)
			}
			await client.channels.cache.find(channel => channel.id === '934366653830017087').send(message);
		});
		ytdReport.start();

		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};
