# Elsa Speak Challenge Bot

## Requirement

1. user gửi ảnh daily, bot save
2. user/admin gọi command report để xem report:

- report của bản thân
- report cả đội
Gồm những lần quên nộp trong tháng (ngày, đã nộp phạt cho ngày đó chưa)

3. Admin gọi command để đánh dấu user đã nộp phạt, đã chuyển thưởng

4. Bot tổng kết vào mùng 1 hàng tháng và gửi report lên group:

- Những user phải nộp phạt, số lần và số tiền
- Những user được thưởng
- Tổng quỹ

5. Admin gọi command add/activate/deactivate user tham gia challenge
6. Admin reject nếu bài daily ko hợp lệ
7. User nộp phạt, admin approve

## How to run project on local

1. `npm install`
2. Add .env file contain DISCORD_TOKEN 
3. Add config file contain token, clientId, guildId
4. Init db on local: `npm run init-db`
5. Deploy command to discord app `npm run deploy-command`
6. Start bot on local `npm start`
