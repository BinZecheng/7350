/**
 * Schedule.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    cinemaCode: {
      type: "string"
    },//影院代码

    cinemaName: {
      type: "string"
    },//影院名称

    address: {
      type: "string"
    },//影院地址

    filmCode: {
      type: "string"
    },//影片代码(唯一标识)

    filmName: {
      type: "string"
    },//影片名称

    ticketPrice: {
      type: "string"
    },//票价

    date: {
      type: "string",
      columnType: "date"
    },//放映日期

    time: {
      type: "string"
    },//放映时间

    dataSign: {
      type: "string"
    },

    scheduleInfo: {
      collection: 'FilmBasic',
      via: 'filmInfo'
    },//与FilmBasic关联

  },

};

