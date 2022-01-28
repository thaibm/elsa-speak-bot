const CronJob = require('cron').CronJob;
const { Participators, DailyReports } = require('../dbObjects');
const { Op } = require('sequelize');
const { ONE_DAY } = require('../constants');

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		const reminder = new CronJob('00 20 * * *', async () => {
			const participants = await Participators.findAll({ attributes: ['user_id'], where: { is_active: true } });
			participants.forEach(p => {
				client.users.fetch(p.user_id, false).then((user) => {
					user.send(`Don't forget sending Elsa daily report!`);
				});
			});
		});
		reminder.start();

		const today = new Date();
		const yesterday = new Date(today.setHours(0, 0, 0, 0) - ONE_DAY);

		// const ytdReport = new CronJob('* * * * *', async () => {

		// const participators = await Participators.findAll({
		// 	attributes: ['user_id'],
		// 	include: [
		// 		{
		// 			model: DailyReports,
		// 			where: {
		// 				created_at: {
		// 					[Op.lte]: today,
		// 					[Op.gte]: yesterday
		// 				}
		// 			},
		// 			required: false,
		// 		}
		// 	]
		// });

		// const missedReportParticipators = participators.filter(participator => !participator.daily_reports.length)
		// if (missedReportParticipators?.length) {
		// 	missedReportParticipators.forEach(p => {
		// 		console.log('🚀 ~ file: ready.js ~ line 46 ~ //ytdReport ~ p', p.user_id)
		// 	})
		// }
		
		// });

		// ytdReport.start();

		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};
