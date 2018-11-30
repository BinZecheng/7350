/**
 * ScheduleController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    // action - create
    create: async function (req, res) {

        if (req.method == "GET")
            return res.view('schedule/create');

        if (typeof req.body.Schedule === "undefined")
            return res.badRequest("Form-data not received.");

        //随机生成唯一标识
        var dataSign = getRandomCode(2);
        //将数据的唯一标识赋值
        req.body.Schedule.dataSign = dataSign;
        //保存schedule数据
        await Schedule.create(req.body.Schedule);
        //通过页面传来的数据的filmCode查询电影基础数据
        var filmBasic = await FilmBasic.findOne({filmCode: req.body.Schedule.filmCode});
        //通过dataSign获取新保存的档期数据
        var schedule = await Schedule.findOne({dataSign: dataSign});   

        await FilmBasic.addToCollection(filmBasic.id, 'filmInfo').members(schedule.id);
        
        return res.redirect('/');
    },

    //通过影院代码查询影院信息
    findCinemaInfo: async function (req, res) {

        const message = sails.getInvalidIdMsg(req.params);
    
        if (message) return res.badRequest(message);

        console.log(req.params.cinemaCode);

        var model = await CinemaBasic.findOne({cinemaCode: req.params.cinemaCode});

        if (!model) return res.notFound();

        console.log(model);

        return res.send(model);
    },

    //通过影院代码查询影院信息
    findFilmInfo: async function (req, res) {

        const message = sails.getInvalidIdMsg(req.params);
    
        if (message) return res.badRequest(message);

        console.log(req.params.filmCode);

        var model = await FilmBasic.findOne({filmCode: req.params.filmCode});

        if (!model) return res.notFound();

        console.log(model);

        return res.send(model);
    },

};

//随机生成唯一标识
function getRandomCode(length) {
    if (length > 0) {
        var data = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9","A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
        var nums = "";
        for (var i = 0; i < length; i++) {
            var r = parseInt(Math.random() * 61);
            nums += data[r];
        }
        var date = new Date().valueOf();
        return date+nums;
    } else {
        return false;
    }
}
