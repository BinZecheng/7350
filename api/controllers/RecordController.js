/**
 * RecordController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    //购买电影票
    buyTicket: async function (req, res) {

        if (!await User.findOne(req.params.id)) return res.notFound();

        var schedule = await Schedule.findOne(req.params.fk);

        if (!schedule) return res.notFound();
        //随机生成合同号
        var contractNo = getContractNo(4);
        //随机生成影厅号
        var roomNumber = getNumber(1);;
        //随机生成座位号
        var seatNumber = getNumber(2);
        //创建影片基础信息
        await Record.createEach([            
           {"contractNo":contractNo,
           "filmName":schedule.filmName,
           "cinemaName": schedule.cinemaName,
           "roomNumber": roomNumber,
           "seatNumber": seatNumber,
           "date": schedule.date,
           "time": schedule.time,
           "address": schedule.address,
           "payments": schedule.ticketPrice} 
        ]);
        //通过合同号查询新创建的订单信息
        var record = await Record.findOne({contractNo: contractNo});
        //用户与订单表建立关联
        await User.addToCollection(req.params.id, 'userInfo').members(record.id);

        return res.ok("Operation completed !!");

    },

    // action - admin
    admin: async function (req, res) {

        var models = await Record.find();

        return res.view('record/admin', { record: models });

    },

};

//随机生成合同号
function getContractNo(length) {
    if (length > 0) {
        var data = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
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

//随机生成合同号
function getNumber(length) {
    if (length > 0) {
        var data = ["0","1", "2", "3", "4", "5", "6", "7", "8", "9"];
        var nums = "";
        for (var i = 0; i < length; i++) {
            var r = parseInt(Math.random() * 10);
            nums += data[r];
        }
        return nums;
    } else {
        return false;
    }
}