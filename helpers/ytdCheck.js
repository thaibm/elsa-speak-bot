const { ONE_DAY } = require('../constants');
const { Op } = require('sequelize');
const { Participators, DailyReports } = require('../dbObjects');

module.exports = {
  async ytdCheck() {
    const today = new Date();
    const yesterday = new Date(today.setHours(0, 0, 0, 0) - ONE_DAY);

    const participators = await Participators.findAll({
      attributes: ['user_id'],
      where: {
        // is_active: true,
        joined_date: {
          [Op.lte]: today,
        },
        left_date: {
          [Op.or]: {
            [Op.eq]: null,
            [Op.gte]: today
          }
        }
      },
      include: [
        {
          model: DailyReports,
          where: {
            created_at: {
              [Op.lte]: today,
              [Op.gte]: yesterday
            }
          },
          required: false,
        }
      ]
    });

    const missedReportParticipators = participators.filter(participator => !participator.daily_reports.length)

    let message = '';
    if (missedReportParticipators?.length) {
      message = `Yesterday, there are ${missedReportParticipators?.length} people who forgot to learn English!\n` +
        missedReportParticipators.map((p, index) => `\n${index + 1}. <@${p.user_id}>`).join(', ');
    } else {
      message = `Yesterday, everyone sent daily report! Congrats!`
    }
    return message;
  }
}