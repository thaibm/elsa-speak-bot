const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const Participators = require('./models/Participators.js')(sequelize, Sequelize.DataTypes);
const DailyReports = require('./models/DailyReports')(sequelize, Sequelize.DataTypes);
const Expenses = require('./models/Expenses')(sequelize, Sequelize.DataTypes);

DailyReports.belongsTo(Participators, { foreignKey: 'user_id', as: 'participator' });

Reflect.defineProperty(Participators.prototype, 'addDailyReport', {
	value: async function addDailyReport(attachmentId) {
		return DailyReports.create({ user_id: this.user_id, is_rejected: false, attachment_id: attachmentId });
	},
});

Reflect.defineProperty(Participators.prototype, 'getAllDailyReports', {
	value: function getAllDailyReports() {
		return DailyReports.findAll({
			where: { user_id: this.user_id },
		});
	},
});

module.exports = { Participators, DailyReports, Expenses };
