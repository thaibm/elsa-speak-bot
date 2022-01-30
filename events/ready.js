const CronJob = require('cron').CronJob;
const { Participators, DailyReports } = require('../dbObjects');
const { Op } = require('sequelize');
const { ONE_DAY } = require('../constants');
const { ytdCheck } = require('../helpers/ytdCheck');

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		// const reminder = new CronJob('00 20 * * *', async () => {
		// 	const participants = await Participators.findAll({ attributes: ['user_id'], where: { is_active: true } });
		// 	participants.forEach(p => {
		// 		client.users.fetch(p.user_id, false).then((user) => {
		// 			user.send(`Don't forget sending Elsa daily report!`);
		// 		});
		// 	});
		// });
		// reminder.start();

		const ytdReport = new CronJob('00 11 * * *', async () => {
			const message = await ytdCheck();

			await client.channels.cache.find(channel => channel.id === '934366653830017087').send(message);
		});
		ytdReport.start();

		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};
