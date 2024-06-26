/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },

  '/dashboard': { view: 'pages/dashboardpage' },
  '/product': { view: 'pages/productpage' },


  // Product 
  'POST /product/upload': { controller: 'ProductController', action: 'uploadFile' },
  'POST /product/delete/file': { controller: 'ProductController', action: 'deleteFile' },
  'POST /product/create': { controller: 'ProductController', action: 'create' },
  'GET /product/find': { controller: 'ProductController', action: 'find' },
  'GET /product/table': { controller: 'ProductController', action: 'dataTable' },
  'GET /product/detail/:id': { controller: 'ProductController', action: 'findOne' },
  'PUT /product/update/:id': { controller: 'ProductController', action: 'update' },
  'DELETE /product/delete/:id': { controller: 'ProductController', action: 'destroy' },




  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
