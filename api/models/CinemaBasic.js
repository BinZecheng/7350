/**
 * CinemaBasic.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    cinemaCode: {
      type: "string"
    },//影院代码(唯一标识号)

    cinemaName: {
      type: "string"
    },//影院名称

    level: {
      type: "string"
    },//影院评级

    address: {
      type: "string"
    },//影院地址

    phoneNumber: {
      type: "string"
    },//影院电话号码

    mobilePhone: {
      type: "string"
    },//联系人手机号

  },

};

