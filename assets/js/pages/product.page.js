parasails.registerPage("productpage", {
    name: "productpage",
    props: {

    },
    data: {
        newProduct: {},
        editProduct: {},
        productDetail: {},
        rows: [],
        columns: [
            {
                label: 'ID',
                field: 'id',
                // width:'50'
            },
            {
                label: 'Name',
                field: 'name',
                width: '100'

            },
            {
                label: 'Price',
                field: 'price',
                width: '80'
            },
            {
                label: 'Category',
                field: 'cate',
                width: '50'
            },
            {
                label: 'Image',
                field: 'img',
                width: '50'
            },
            {
                label: 'Actions',
                field: 'action',
                width: '100'
            }
        ],
        selectField: [],
        selectProduct: {},

    },
    computed: {},
    methods: {
        convertDate(timestamp) {
            // สร้างวัตถุ Date จาก timestamp
            const date = new Date(timestamp);

            // ใช้ method ของ Date เพื่อดึงข้อมูลวันที่
            const day = date.getDate(); // วันที่
            const month = date.getMonth() + 1; // เดือน (เพิ่ม 1 เพราะเดือนเริ่มที่ 0)
            const year = date.getFullYear(); // ปี

            // สร้างข้อความวันที่ในรูปแบบที่ต้องการ (เช่น วันที่/เดือน/ปี)
            const formattedDate = `${day}/${month}/${year}`;

            console.log(formattedDate); // แสดงผลวันที่ในรูปแบบที่ต้องการ
            return formattedDate;
        },
        setColumn() {
            let selectedField = [];
            this.columns.forEach((el) => {
                selectedField.push(el.field);
            })
            // console.log(selectedField)

            this.selectField = selectedField;
        },
        // getProducts() {
        //     var vm = this;
        //     let filteredData = {};

        //     axios.get(`/product/find`).then(res => {

        //         res.data.map((object, index) => {
        //             object.number = index + 1;
        //             object.img = '';
        //         })

        //         vm.selectField.forEach(key => {
        //             if (res.data[0].hasOwnProperty(key)) {
        //                 filteredData[key] = res.data[0][key];
        //             }
        //         });

        //         // console.log(filteredData)
        //         vm.rows.push(filteredData);

        //     }).catch(err => console.log(err));
        // },

        addProductModal() {
            $('#addProductModal').modal('toggle');
        },

        updateProductModal(productId) {
            axios.get(`/product/detail/${productId}`).then(res => {
                this.editProduct = res.data;
                $('#viewProductModal').modal('hide');
                $('#updateProductModal').modal('toggle');
            }).catch((err) => {
                console.log(err)
            })
        },

        saveAddProduct() {
            var vm = this;
            var forms = document.getElementsByClassName('add-product-validation');

            Array.prototype.filter.call(forms, function (form) {
                if (form.checkValidity() === false) {
                    return form.classList.add('was-validated');
                }

                form.classList.remove('was-validated');

                axios.post(`/product/create`, vm.newProduct).then(res => {

                    $('#addProductModal').modal('hide');
                    $.notify('Create product successfully.', 'success');

                    // after save success  reload data new
                    // Clear the form fields and reset the newProduct object
                    vm.newProduct = {};

                    // Reload data using DataTables API
                    vm.reloadDataTable();
                    // vm.getProducts();

                }).catch(err => console.log(err));
            });

        },

        saveUpdateProduct() {
            var vm = this;
            var forms = document.getElementsByClassName('update-product-validation');

            Array.prototype.filter.call(forms, function (form) {
                if (form.checkValidity() === false) {
                    return form.classList.add('was-validated');
                }

                form.classList.remove('was-validated');

                axios.put(`/product/update/`, vm.editProduct).then((res) => {
                    $('#updateProductModal').modal('hide');
                    $.notify('Update product successfully.', 'success');
                    vm.editProduct = {};
                    vm.reloadDataTable();

                })
            });


        },

        viewProduct(productId) {
            let vm = this;
            //previos set id to view
            axios.get(`/product/detail/${productId}`).then(res => {
                vm.productDetail = res.data;
                vm.productDetail.createdAt = vm.convertDate(res.data.createdAt);
                vm.productDetail.updatedAt = vm.convertDate(res.data.updatedAt);
                $('#viewProductModal').modal('toggle');
            }).catch((err) => {
                console.log(err)
            })
        },

        deleteProduct(productId, productName) {
            let vm = this;
            vm.selectProduct = {
                id: productId,
                name: productName
            };

            $('#deleteProductModalLabel').text(`Delete product ${productName}`)
            $('#deleteProductModal').modal('toggle');

            // $.confirm({
            //     animation: 'zoom',
            //     closeAnimation: 'zoom',
            //     title: 'Delete\xa0' + productName,
            //     content: '<div class="text-center">' +
            //         '<i class="far fa-trash-alt fa-4x mb-4 animated rotateIn"></i>' +
            //         '<p class="heading">Are you sure?, Do you want to delete.</p>' +
            //         '</div>',
            //     buttons: {
            //         delete: {
            //             btnClass: 'btn btn-sm btn-danger',
            //             action: function () {
            //                 axios.delete(`/product/delete/${productId}`).then((res) => {
            //                     // after save success  reload data new
            //                     // vm.getProducts();
            //                     vm.reloadDataTable();
            //                     $.notify('Deleted\xa0' + productName, 'success');
            //                 })

            //             }
            //         },
            //         cancel: {
            //             btnClass: 'btn btn-sm btn-link',
            //         }
            //     }
            // });

        },

        confirmDelete() {
            let vm = this;
            let productId = vm.selectProduct.id;
            let productName = vm.selectProduct.name;

            axios.delete(`/product/delete/${productId}`).then((res) => {
                // after save success  reload data new
                // vm.getProducts();
                vm.selectProduct = {};
                vm.reloadDataTable();
                $('#deleteProductModal').modal('hide');
                $.notify('Deleted\xa0' + productName, 'success');
            })
        },


        setDataTable() {

            let vm = this;
            $('#products-table').DataTable({
                processing: true,
                serverSide: true,
                // responsive:true,
                ajax: {
                    url: '/product/table',  // เปลี่ยนเป็น URL ของ API ของคุณ
                    dataSrc: 'data',
                    type: 'GET',
                    data: function (d) {
                        // ส่งค่า pagination และค้นหาไปยัง API
                        d.limit = d.length;  // จำนวนข้อมูลที่ต้องการในหน้าเดียว
                        d.offset = d.start;  // ตำแหน่งเริ่มต้นของข้อมูล
                        d.search = d.search.value;  // ค่าที่ใช้ในการค้นหา
                    }
                },
                columnDefs: [
                    { className: 'text-center', targets: [4, 5] } // ให้ทุกคอลัมน์ใน DataTables เป็น text-center
                ],
                columns: [
                    { data: 'id', visible: false },
                    { data: 'name' },
                    { data: 'price' },
                    { data: 'cate' },
                    { data: 'img', orderable: false },
                    {
                        data: 'action', orderable: false,
                        render: function (data, type, row) { // สร้างปุ่มในเซลล์ "Actions"
                            return '<button id="view-btn" class="btn btn-info btn-sm">View</button> ' +
                                '<button id="delete-btn" class="btn btn-danger btn-sm ml-2">Delete</button>';
                        }
                    }
                ],
                paging: true,
                searching: true,
                lengthChange: true,
                pageLength: 10,  // จำนวนรายการต่อหน้า
                order: [[0, 'asc']],  // เรียงลำดับตามคอลัมน์แรก
                // language: {
                //     emptyTable: 'ไม่พบข้อมูล',
                //     info: 'แสดง _START_ ถึง _END_ จากทั้งหมด _TOTAL_ รายการ',
                //     infoEmpty: 'ไม่มีรายการที่จะแสดง',
                //     lengthMenu: 'แสดง _MENU_ รายการต่อหน้า',
                //     paginate: {
                //         first: 'หน้าแรก',
                //         last: 'หน้าสุดท้าย',
                //         next: 'ถัดไป',
                //         previous: 'ก่อนหน้า'
                //     },
                //     search: 'ค้นหา:'
                // }
                createdRow: function (row, data, dataIndex) {
                    $(row).find('#view-btn').on('click', function () {
                        vm.viewProduct(data.id);
                    });

                    $(row).find('#delete-btn').on('click', function () {
                        vm.deleteProduct(data.id, data.name);
                    });

                    // $(row).find('#edit-btn').on('click', function () {
                    //     vm.updateProductModal(data.id);
                    // });


                }

            });

        },

        reloadDataTable() {
            $('#products-table').DataTable().ajax.reload();
        }

    },
    beforeMount: function () { },
    mounted: function () {
        this.setColumn();
        // this.getProducts();
        this.setDataTable();


    },
    watch: {},

});
