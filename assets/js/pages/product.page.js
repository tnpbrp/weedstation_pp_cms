parasails.registerPage("productpage", {
    name: "productpage",
    props: {},
    data: {
        newProduct: {},
        editProduct: {},
        productDetail: {},
        // rows: [],
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

            // console.log(formattedDate); // 
            return formattedDate;
        },
        setColumn() {
            let selectedField = [];
            this.columns.forEach((el) => {
                selectedField.push(el.field);
            })

            this.selectField = selectedField;
        },

        addProductModal() {
            $('#addProductModal').modal('toggle');
        },

        updateProductModal(productId) {
            axios.get(`/product/detail/${productId}`).then(res => {
                this.editProduct = res.data;
                const images = '../../images/upload/' + res.data.thumbnail;

                $('#thumbnail-edit').attr('src', images);
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

                // check image 
                if (document.getElementById('file-input').files[0]) {
                    var filename = (new Date()).getTime() + '.png';
                    var formData = new FormData();
                    formData.append('file', document.getElementById('file-input').files[0], filename);
                    vm.newProduct['thumbnail'] = filename;

                    axios.post(`/file/upload`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            "filename": filename
                        },
                        onUploadProgress: function (progressEvent) {
                            var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                            // console.log(`อัปโหลด ${percentCompleted}% เสร็จแล้ว`);
                            // แสดงเปอร์เซ็นต์ของการอัปโหลดได้ที่นี่
                        }
                    }).then(res => {
                        document.getElementById('file-input').value = null;
                        // console.log(res);
                    }).catch(err => {
                        console.error(err);
                    });

                    axios.post(`/product/create`, vm.newProduct).then(res => {

                        $('#addProductModal').modal('hide');
                        $('#modal-loading').modal('show');

                        setTimeout(function () {
                            $('#modal-loading').modal('hide');
                            $.notify('Create product successfully.', 'success');
                            vm.newProduct = {};
                            vm.reloadDataTable();
                        }, 3000);

                    }).catch(err => console.log(err));




                } else {
                    return alert("Please select images file");
                }


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

                const existImg = vm.editProduct.thumbnail;
                if (document.getElementById('file-input-edit').files[0]) {
                    var filename = (new Date()).getTime() + '.png';
                    var formData = new FormData();
                    formData.append('file', document.getElementById('file-input-edit').files[0], filename);
                    vm.editProduct['thumbnail'] = filename;

                    axios.post(`/file/upload`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            "filename": filename
                        },
                        onUploadProgress: function (progressEvent) {
                            var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                            // console.log(`อัปโหลด ${percentCompleted}% เสร็จแล้ว`);
                        }
                    }).then(res => {
                        // Delete image not use !
                        vm.deleteImages(existImg);
                        document.getElementById('file-input-edit').value = null;
                    }).catch(err => {
                        console.error(err);
                    });
                }

                axios.put(`/product/update/`, vm.editProduct).then((res) => {
                    $('#updateProductModal').modal('hide');

                    $('#modal-loading').modal('show');
                    setTimeout(function () {
                        $('#modal-loading').modal('hide');
                        $.notify('Update product successfully.', 'success');
                        vm.editProduct = {};
                        vm.reloadDataTable();
                    }, 3000);


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

                const images = '../../images/upload/' + vm.productDetail.thumbnail;

                $('#thumbnail-view').attr('src', images);
                $('#viewProductModal').modal('toggle');
            }).catch((err) => {
                console.log(err)
            })
        },

        deleteProduct(productId, productName, fileName) {
            let vm = this;
            vm.selectProduct = {
                id: productId,
                name: productName,
                filename: fileName
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
            let fileName = vm.selectProduct.filename;

            axios.delete(`/product/delete/${productId}`).then((res) => {

                // console.log(vm.selectProduct.fileName)
                vm.deleteImages(fileName);
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

                        if (d.order.length > 0) {
                            d.orderBy = d.columns[d.order[0].column].data;  // คอลัมน์ที่ใช้เรียงลำดับ
                            d.orderDir = d.order[0].dir;  // ทิศทางการเรียงลำดับ (asc หรือ desc)
                        }
                    }
                },
                columnDefs: [
                    { className: 'text-center', targets: [2, 3, 4, 5] } // ให้ทุกคอลัมน์ใน DataTables เป็น text-center
                ],
                columns: [
                    { data: 'id', visible: false },
                    { data: 'name', width: '25%' },
                    { data: 'price', width: '25%' },
                    { data: 'cate', width: '10%' },
                    {
                        data: 'thumbnail', orderable: false,
                        render: function (data, type, row) {
                            return `<figure class="sixteen-nine-img cursor-pointer" id="view-img-btn">
                                        <img class="img-thumb" 
                                        src="../../images/upload/${data}" alt="image"
                                        onerror="this.onerror=null;this.src='../../images/default_image.png'" 
                                        loading="lazy" />
                                        <div class="play-overlay"><i class="fas fa-search"></i></div>
                                    </figure>`;
                        },
                        width: '20%'
                    },
                    {
                        data: 'action', orderable: false,
                        render: function (data, type, row) { // สร้างปุ่มในเซลล์ "Actions"
                            return `
                                <button id="view-btn" class="btn btn-info btn-sm">
                                <i class='fas fa-eye'></i></button> 
                                <button id="delete-btn" class="btn btn-danger btn-sm ml-2"> 
                                <i class='fas fa-trash-alt'></i></button>
                                `;
                        },
                        width: '20%'
                    }
                ],
                paging: true,
                searching: true,
                lengthChange: true,
                pageLength: 10,
                order: [[0, 'asc']],
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
                        vm.deleteProduct(data.id, data.name, data.thumbnail);
                    });

                    $(row).find('#view-img-btn').on('click', function () {
                        vm.viewImage(data.thumbnail);
                    });




                }

            });

        },

        reloadDataTable() {
            $('#products-table').DataTable().ajax.reload();
        },

        onChangeFileUpload(e) {
            var file = e.target.files[0];
            var preview = document.getElementById('thumbnail');
            var reader = new FileReader();
            reader.addEventListener("load", function () {
                preview.src = reader.result;
            }, false);
            reader.readAsDataURL(file);
        },

        onChangeFileUploadEdit(e) {
            var file = e.target.files[0];
            var preview = document.getElementById('thumbnail-edit');
            var reader = new FileReader();
            reader.addEventListener("load", function () {
                preview.src = reader.result;
            }, false);
            reader.readAsDataURL(file);
        },

        viewImage(filename) {
            // var image = config.imgproxy + '/unsafe/426x0/' + encodeURIComponent(config.backend_img + img);
            var image = '../../images/upload/' + filename;

            $('#modalpreview').modal('toggle');
            $('.images-title').text(filename);
            $('#imgpreview').attr('src', image);
        },

        deleteImages(filename) {
            axios.post('/file/delete', {}, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "filename": filename
                },
            }).then(res => {
                console.log('delete old file', res);
            }).catch(err => {
                console.error(err);
            });
        },

    },
    beforeMount: function () { },
    mounted: function () {
        // let vm = this;
        this.setColumn();
        this.setDataTable();

        // window.addEventListener('resize', function (event) {
        //     console.log('Window has been resized!');
        //     // ทำสิ่งที่ต้องการเมื่อมีการ resize เกิดขึ้น
        // });

    },
    watch: {},

});
