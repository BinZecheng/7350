/**
 * FilmBasic.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    filmCode: {
      type: "string"
    },//影片代码(唯一标识)

    imgUrl: {
      type: "string"
    },//影片图片

    filmName: {
      type: "string"
    },//影片名称

    director: {
      type: "string"
    },//导演

    country: {
      type: "string"
    },//国家

    proCompany: {
      type:"string"
    },//制作公司

    cast: {
      type:"string"
    },//主演

    filmInfo: {
      collection: 'Schedule',
      via: 'scheduleInfo'
    },//与Schedule关联

  },

  getInvalidIdMsg: function (opts) {

    if (typeof opts.id === "undefined" || isNaN(parseInt(opts.id)))
      return "FilmBasic id not specified or with incorrect type.";

    return null;        // falsy

  },

};

