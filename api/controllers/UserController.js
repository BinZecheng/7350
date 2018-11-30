/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    login: async function (req, res) {

        if (req.method == "GET") return res.view('user/login');

        if (!req.body.username) return res.badRequest();
        if (!req.body.password) return res.badRequest();

        var user = await User.findOne({ username: req.body.username });

        if (!user) {
            res.status(401);
            return res.send("User not found");
        }

        const match = await sails.bcrypt.compare(req.body.password, user.password);

        if (!match) {
            res.status(401);
            return res.send("Wrong Password");
        }
        req.session.regenerate(function (err) {

            if (err) return res.serverError(err);

            req.session.username = req.body.username;
            req.session.role = user.role;
            req.session.userid = user.id;
            sails.log("Session: " + JSON.stringify(req.session));

            if (req.wantsJSON) {
                return res.redirect('/');
            } else {
                return res.ok("Login successfully");
            }

        });

    },

    logout: async function (req, res) {

        req.session.destroy(function (err) {

            if (err) return res.serverError(err);

            return res.redirect('/');

        });
    },

    //查询用户的购买记录
    populate: async function (req, res) {

        if (!['userInfo'].includes(req.params.association)) return res.notFound();

        const message = sails.getInvalidIdMsg(req.params);

        if (message) return res.badRequest(message);

        var models = await User.findOne(req.params.id).populate(req.params.association);

        if (!models) return res.notFound();

        return res.view('user/myRecord', { user: models });

    },

    //取消订单
    remove: async function (req, res) {

        if (!['userInfo'].includes(req.params.association)) return res.notFound();

        const message = sails.getInvalidIdMsg(req.params);

        if (message) return res.badRequest(message);

        if (!await User.findOne(req.params.id)) return res.notFound();

        if (req.params.association == "userInfo") {

            var record = await Record.findOne(req.params.fk);

            if (!record) return res.notFound();
        }

        await User.removeFromCollection(req.params.id, req.params.association).members(req.params.fk);

        return res.ok('Operation completed!!');

    },

    // action - admin
    admin: async function (req, res) {

        if(req.params.sign=="emp"){
            var models = await User.find({where: { isEmp: {contains: "1"}}});
        }else if(req.params.sign=="vis"){
            var models = await User.find({where: { isEmp: {contains: "0"}}});
        }
        
        return res.view('user/admin', { user: models });

    },

};

