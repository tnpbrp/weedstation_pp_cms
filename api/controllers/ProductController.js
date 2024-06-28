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
            let updatedData = await Product.updateOne({ id: req.body.id }).set(req.body);
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

    dataTable: async function (req, res) {
        try {
            console.log('req limit',req.query.limit)
            console.log('req offset',req.query.offset)
            console.log('req search',req.query.search)

            let limit = req.query.limit || 10;  // จำนวนรายการต่อหน้า (default: 10)
            let offset = req.query.offset || 0;  // ตำแหน่งเริ่มต้นของข้อมูล
            let search = req.query.search || '';  // ค่าที่ใช้ในการค้นหา

            // สามารถทำการคิวรีข้อมูลจากฐานข้อมูล MongoDB หรืออื่น ๆ ได้ตามที่คุณต้องการ

            // ตัวอย่างการส่งกลับข้อมูลเป็น JSON
            let products = await Product.find({
                or: [
                    { name: { contains: search } },
                    // { price: { contains: search } },

                ]
            })
                .limit(limit)
                .skip(offset);

            let count = await Product.count({
                or: [
                    { name: { contains: search } },
                    // { price: { contains: search } },

                    // Add more search criteria as needed
                ]
            });
            return res.json({
                draw: parseInt(req.query.draw),
                recordsTotal: count,
                recordsFiltered: count,
                data: products
            });

        } catch (error) {
            return res.serverError(error.message);
        }
    },



};

