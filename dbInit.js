const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const Participator = require('./models/Participators')(sequelize, Sequelize.DataTypes);
require('./models/DailyReports')(sequelize, Sequelize.DataTypes);
require('./models/Expenses')(sequelize, Sequelize.DataTypes);

const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({ force }).then(async () => {
	// const shop = [
	// 	CurrencyShop.upsert({ name: 'Tea', cost: 1 }),
	// ];

	// await Promise.all(shop);
	console.log('Database synced');

	sequelize.close();
}).catch(console.error);
