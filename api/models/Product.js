/**
 * Product.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    // username: { type: 'string', required: true },
    // email: { type: 'string', required: true, unique: true }
    name: { type: 'string' },
    price: { type: 'number' },
    // img:{},
    // cate:{type: 'string' , required: true},

    // sativa: { type: 'number' },
    // indica: { type: 'number' },
    // thc: { type: 'float' },
    // cbd: { type: 'json' }, // หรือ { type: 'null' } ตามความเหมาะสม
    // strain_flavors: { type: 'string' }, // หรือ { type: 'json' } ตามความเหมาะสม
    // effect: { type: 'string' } // หรือ { type: 'json' } ตามความเหมาะสม


    // desc:{},
    //   desc: {
    //     title: { type: 'string' },
    //     sativa: { type: 'number' },
    //     indica: { type: 'number' },
    //     thc: { type: 'float' },
    //     cbd: { type: 'json' }, // หรือ { type: 'null' } ตามความเหมาะสม
    //     strain_flavors: { type: 'string' }, // หรือ { type: 'json' } ตามความเหมาะสม
    //     effect: { type: 'string' } // หรือ { type: 'json' } ตามความเหมาะสม
    // },

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

