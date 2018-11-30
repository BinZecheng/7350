/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also do this by creating a hook.
 *
 * For more information on bootstrapping your app, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function(done) {

  sails.getInvalidIdMsg = function (opts) {

    if (opts.id && isNaN(parseInt(opts.id))) {
      return "Primary key specfied is invalid (incorrect type).";
    }

    if (opts.fk && isNaN(parseInt(opts.fk))) {
      return "Foreign key specfied is invalid (incorrect type).";
    }

    return null;        // falsy
  }

  sails.bcrypt = require('bcrypt');
  const saltRounds = 10;

  const hash = await sails.bcrypt.hash('123456', saltRounds);

  if (await CinemaBasic.count() > 0) {
    return done();
  }
  
  //创建影院基础信息
  await CinemaBasic.createEach([
    { "cinemaCode": "0001", "cinemaName": "Broadway Cinematheque", "level": "5", "address": "3 Public Square St, Yau Ma Tei", "phoneNumber": "23880002", "mobilePhone": ""},
    { "cinemaCode": "0002", "cinemaName": "UA iSQUARE", "level": "4", "address": "Tsim Sha Tsui, Nathan Rd, 63", "phoneNumber": "39185888", "mobilePhone": ""}
  ]);

  //创建影片基础信息
  await FilmBasic.createEach([
    { "filmCode": "f0001", "imgUrl": "http://cdn1.mmia.com/o_1asgi8qhd1ukrp4hptef3frho1b.jpg?watermark/1/image/aHR0cDovL2NkbjEubW1pYS5jb20vbW1pYV9tYXJrLnBuZw==/dissolve/50/gravity/SouthEast/dx/25/dy/25/auto-orient", "filmName": "Goodfellas", "director": "Martin Scorsese", "country": "USA", "proCompany": "Warner Bros. Entertainment. Inc.", "cast": "Robert De Niro, Ray Liotta, Joe Pesci"},
    { "filmCode": "f0002", "imgUrl": "http://img31.mtime.cn/pi/2014/03/06/081855.37880010_1000X1000.jpg", "filmName": "Lock, Stock and Two Smoking Barrels", "director": "Guy Ritchie", "country": "UK", "proCompany": "Gramercy Pictures", "cast": "Jason Statham, Nick Moran, Jason Flemyng, Dexter Fletcher"}
  ]);

  //创建用户信息
  await User.createEach([
    { "username": "admin", "password": hash, "saveAmount":"",  role:"admin", "isEmp":"1"},//超级管理员
    { "username": "lee", "password": hash, "saveAmount":"1000",  role:"visitor", "isEmp":"0"},//用户1
    { "username": "bob", "password": hash, "saveAmount":"800",  role:"visitor", "isEmp":"0"},//用户2
    { "username": "human", "password": hash, "saveAmount":"",  role:"human", "isEmp":"1"},//人力资源
    { "username": "cinema", "password": hash, "saveAmount":"",  role:"cinema", "isEmp":"1"},//影院管理
    { "username": "account", "password": hash, "saveAmount":"",  role:"account", "isEmp":"1"}//财务
    // etc.
  ]);

  //创建用户购买记录信息

  //查询影院基础信息
  // const cinemaOne = await CinemaBasic.findOne({cinemaCode: "0001"});
  // const cinemaTwo = await CinemaBasic.findOne({cinemaCode: "0002"});

  //查询影片信息
  // const filmOne = await FilmBasic.findOne({filmCode: "f0001"});
  // const filmTwo = await FilmBasic.findOne({filmCode: "f0002"});

  //查询用户信息
  // const userOne = await User.findOne({username: "lee"});
  // const userTwo = await User.findOne({username: "bob"});

  //查询购买记录信息
  // const recordOne = await Record.findOne({contractNo: "2018112801"});
  // const recordTwo = await Record.findOne({contractNo: "2018112802"});
  // const recordThree = await Record.findOne({contractNo: "2018112803"});
  // const recordFour = await Record.findOne({contractNo: "2018112804"});

  //建立用户与购买记录的关联关系
  // await User.addToCollection(userOne.id, 'userInfo').members(recordOne.id);
  // await User.addToCollection(userOne.id, 'userInfo').members(recordTwo.id);
  // await User.addToCollection(userTwo.id, 'userInfo').members(recordThree.id);
  // await User.addToCollection(userTwo.id, 'userInfo').members(recordFour.id);

  return done();

};
