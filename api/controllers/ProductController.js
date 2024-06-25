/**
 * ProductController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    create: async function (req, res) {
        try {
            let newData = await Product.create(req.body).fetch();
            return res.json(newData);
        } catch (err) {
            return res.serverError(err);
        }
    },

    find: async function (req, res) {
        
        try {
            let allData = await Product.find();
            return res.json(allData);
        } catch (err) {
            return res.serverError(err);
        }
    },

    findOne: async function (req, res) {
        try {
            let allData = await Product.findOne({
                id: req.param('id')
            });
            return res.json(allData);
        } catch (err) {
            return res.serverError(err);
        }
    },

    update: async function (req, res) {
        try {
            let updatedData = await Product.updateOne({ id: req.params.id }).set(req.body);
            return res.json(updatedData);
        } catch (err) {
            return res.serverError(err);
        }
    },

    destroy: async function (req, res) {
        try {
            let deletedData = await Product.destroyOne({ id: req.params.id });
            return res.json(deletedData);
        } catch (err) {
            return res.serverError(err);
        }
    },



};

