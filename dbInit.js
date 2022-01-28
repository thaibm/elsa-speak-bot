const Sequelize = require('sequelize');
const { ONE_DAY } = require('./constants');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const Participators = require('./models/Participators')(sequelize, Sequelize.DataTypes);
const DailyReports = require('./models/DailyReports')(sequelize, Sequelize.DataTypes);
require('./models/Expenses')(sequelize, Sequelize.DataTypes);

const force = process.argv.includes('--force') || process.argv.includes('-f');
const now = new Date();

sequelize.sync({ force }).then(async () => {
	// const participators = [
	// 	Participators.upsert({
	// 		user_id: '921261168088190997',
	// 		is_active: 1,
	// 		joined_date: now,
	// 		username: 'thai.buiminh'
	// 	}),
	// 	Participators.upsert({
	// 		user_id: '702711279223177296',
	// 		is_active: 0,
	// 		joined_date: new Date(now.getTime() - ONE_DAY),
	// 		username: 'huong.dophu'
	// 	}),
	// 	Participators.upsert({
	// 		user_id: '921593841784590379',
	// 		is_active: 1,
	// 		joined_date: new Date(now.getTime() - 2 * ONE_DAY),
	// 		username: 'linh.vuduc'
	// 	}),
	// ];
	// const dailyReports = [
	// 	DailyReports.upsert(
	// 		{
	// 			user_id: '921261168088190997',
	// 			attachment_id: '936223136389681182',
	// 			created_at: now
	// 		}
	// 	),
	// 	DailyReports.upsert(
	// 		{
	// 			user_id: '921261168088190997',
	// 			attachment_id: '921261168088190997',
	// 			created_at: new Date(now.getTime() - ONE_DAY)
	// 		}
	// 	),
	// 	DailyReports.upsert(
	// 		{
	// 			user_id: '921261168088190997',
	// 			attachment_id: '936223136389681182',
	// 			created_at: new Date(now.getTime() - 2 * ONE_DAY)
	// 		}
	// 	),
	// ]

	// await Promise.all([...participators, ...dailyReports]);

	console.log('Database synced');

	sequelize.close();
}).catch(console.error);
