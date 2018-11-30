/**
 * CinemaBasicController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    //影院信息管理页面
    admin: async function (req, res) {

        //查询影院基础信息表信息
        var cinemaBasic = await CinemaBasic.find();

        return res.view('cinemaBasic/admin', { models: cinemaBasic });

    },

};

