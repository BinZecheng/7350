/**
 * FilmBasicController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    // action - index
    index: async function (req, res) {

        var models = await FilmBasic.find();

        return res.view('filmBasic/index', { film: models });

    },

    // action - create
    create: async function (req, res) {

        if (req.method == "GET")
            return res.view('filmBasic/create');

        if (typeof req.body.FilmBasic === "undefined")
            return res.badRequest("Form-data not received.");

        await FilmBasic.create(req.body.FilmBasic);

        return res.redirect('filmBasic/admin');
    },

    // action - admin
    admin: async function (req, res) {

        var models = await FilmBasic.find();

        return res.view('filmBasic/admin', { filmBasic: models });

    },

    // action - view
    view: async function (req, res) {

        var message = FilmBasic.getInvalidIdMsg(req.params);

        if (message) return res.badRequest(message);

        var model = await FilmBasic.findOne(req.params.id);

        var schedule = await FilmBasic.findOne(req.params.id).populate('filmInfo');

        if (!model) return res.notFound();
        return res.view('filmBasic/view', {
            filmBasic: model,
            scInfo: schedule
        });

    },

};

