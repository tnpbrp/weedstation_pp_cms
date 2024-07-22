/**
 * ProductController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const path = require('path');
const fs = require('fs');

module.exports = {


    // uploadFile: function (req, res) {
    //     const { filename } = req.headers;

    //     req.file('file').upload({
    //         // adapter: require('skipper-gridfs'),
    //         // uri: 'mongodb://localhost:27017/Test.files'
    //         dirname: '../../assets/images/upload',
    //         maxBytes: sails.config.maxBytes,
    //         saveAs: filename
    //     }, function (err, filesUploaded) {
    //         if (err) return res.serverError(err);

    //         return res.json({
    //             message: filesUploaded.length + 'file(s) uploaded successfully!',
    //             files: filesUploaded
    //         });
    //     });
    // },

    // deleteFile: function (req, res) {
    //     const { filename } = req.headers;
    //     const filePath = path.resolve(__dirname, '../../assets/images/upload', filename);

    //     if (!fs.existsSync(filePath)) {
    //         return res.notFound(`File '${filename}' not found`);
    //     }

    //     // ลบไฟล์
    //     fs.unlink(filePath, (err) => {
    //         if (err) {
    //             return res.serverError(err);
    //         }
    //         return res.json({ message: `File '${filename}' deleted successfully` });
    //     });

    // },

    // create: async function (req, res) {
    //     try {
    //         let newData = await Product.create(req.body).fetch();
    //         return res.json(newData);
    //     } catch (err) {
    //         return res.serverError(err);
    //     }
    // },

    // find: async function (req, res) {

    //     try {
    //         let allData = await Product.find();
    //         return res.json(allData);
    //     } catch (err) {
    //         return res.serverError(err);
    //     }
    // },

    // findOne: async function (req, res) {
    //     try {
    //         let allData = await Product.findOne({
    //             id: req.param('id')
    //         });
    //         return res.json(allData);
    //     } catch (err) {
    //         return res.serverError(err);
    //     }
    // },

    // update: async function (req, res) {
    //     try {
    //         let updatedData = await Product.updateOne({ id: req.body.id }).set(req.body);
    //         return res.json(updatedData);
    //     } catch (err) {
    //         return res.serverError(err);
    //     }
    // },

    // destroy: async function (req, res) {
    //     try {
    //         let deletedData = await Product.destroyOne({ id: req.params.id });
    //         return res.json(deletedData);
    //     } catch (err) {
    //         return res.serverError(err);
    //     }
    // },

    // dataTable: async function (req, res) {
    //     try {
    //         let limit = parseInt(req.query.limit) || 10;  // จำนวนรายการต่อหน้า (default: 10)
    //         let offset = parseInt(req.query.offset) || 0;  // ตำแหน่งเริ่มต้นของข้อมูล
    //         let search = req.query.search || '';  // ค่าที่ใช้ในการค้นหา
    //         let sortBy = req.query.orderBy || 'name';  // คอลัมน์ที่ใช้เรียงลำดับ (default: name)
    //         let sortDir = req.query.orderDir || 'asc';  // ทิศทางการเรียงลำดับ (default: asc)
    //         let conditions = {};

    //         if (search) {
    //             conditions.or = [
    //                 { name: { contains: search } },
    //                 { price: { contains: search } },
    //                 { cate: { contains: search } }
    //             ];
    //         }

    //         let sortOrder = {};
    //         sortOrder[sortBy] = sortDir === 'asc' ? 1 : -1;

    //         let products = await Product.find(conditions)
    //             .sort(sortOrder)
    //             .limit(limit)
    //             .skip(offset);

    //         let count = await Product.count(conditions);

    //         return res.json({
    //             draw: parseInt(req.query.draw),
    //             recordsTotal: count,
    //             recordsFiltered: count,
    //             data: products
    //         });

    //     } catch (error) {
    //         return res.serverError(error.message);
    //     }
    // },

    // dataTable2: async function (req, res) {
    //     try {

    //         let limit = req.query.limit || 10;  // จำนวนรายการต่อหน้า (default: 10)
    //         let offset = req.query.offset || 0;  // ตำแหน่งเริ่มต้นของข้อมูล
    //         let search = req.query.search || '';  // ค่าที่ใช้ในการค้นหา

    //         // สามารถทำการคิวรีข้อมูลจากฐานข้อมูล MongoDB หรืออื่น ๆ ได้ตามที่คุณต้องการ

    //         // ตัวอย่างการส่งกลับข้อมูลเป็น JSON
    //         let products = await Product.find({
    //             or: [
    //                 { name: { contains: search } },
    //                 { price: { contains: search } },
    //                 { cate: { contains: search } }

    //             ]
    //         })
    //             .limit(limit)
    //             .skip(offset);

    //         let count = await Product.count({
    //             or: [
    //                 { name: { contains: search } },
    //                 { price: { contains: search } },
    //                 { cate: { contains: search } }

    //                 // Add more search criteria as needed
    //             ]
    //         });
    //         return res.json({
    //             draw: parseInt(req.query.draw),
    //             recordsTotal: count,
    //             recordsFiltered: count,
    //             data: products
    //         });

    //     } catch (error) {
    //         return res.serverError(error.message);
    //     }
    // },


};

