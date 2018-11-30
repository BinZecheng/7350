/**
 * Record.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    contractNo: {
      type: "string"
    },//订单号

    filmName: {
      type: "string"
    },//所购电影名

    cinemaName: {
      type: "string"
    },//所属影院

    roomNumber: {
      type: "string"
    },//所属影厅

    seatNumber: {
      type:"string"
    },//座位号

    date: {
      type: "string",
      columnType: "date"
    },//放映日期

    time: {
      type: "string"
    },//放映时间

    address: {
      type: "string"
    },//影院地址

    payments: {
      type: "string"
    },//所付金额

    recordInfo: {
      collection: 'User',
      via: 'userInfo'
    },//与User关联

  },

};

