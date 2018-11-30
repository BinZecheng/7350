/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    username: {
      type: 'string',
      unique: true,
      required: true
    },

    password: {
      type: "string"
    },

    saveAmount: {
      type: "string"
    },//余额

    role: {
      type: 'string',
      enum: ['admin', 'human', 'visitor', 'cinema', 'account'],
      defaultsTo: 'visitor'
    },

    isEmp: {
      type: "string"
    },//是否为员工，1：是；0：否

    userInfo: {
      collection: 'Record',
      via: 'recordInfo'
    },//与Record关联

  },

};

