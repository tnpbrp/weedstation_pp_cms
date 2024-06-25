parasails.registerPage("productpage", {
    name: "productpage",
    props: {

    },
    data: {
        newProduct: {},
        productDetail: {},
        editProduct: {},
        rows: [],
        columns: [],

    },
    computed: {},
    methods: {
        findProducts() {
            var vm = this;
            let desiredKeys = ['id', 'number', 'name', 'price', 'action'];
            let filteredData = {};

            axios.get(`/product/find`).then(res => {

                res.data.map((object, index) => {
                    object.number = index + 1;
                })

                desiredKeys.forEach(key => {
                    if (res.data[0].hasOwnProperty(key)) {
                        filteredData[key] = res.data[0][key];
                    }
                });

                console.log(filteredData)
                vm.rows.push(filteredData)

            }).catch(err => console.log(err));
        },

        createProduct() {
            axios.post(`/product/create`, {}).then((res) => {
                console.log(res)
            })
        },

        viewProduct(productId) {
            let vm = this;
            console.log(productId)
            //previos set id to view
            axios.get(`/product/detail/${productId}`).then(res => {
                console.log(res.data)
                vm.productDetail = res.data;
                $('#viewProductModal').modal('toggle');
            }).catch((err) => {
                console.log(err)
            })


        },

        updateProduct() {
            axios.put(`/product/update/`, {}).then((res) => {
                console.log(res)
            })
        },

        deleteProduct(productId, productName) {
            let vm = this;

            $.confirm({
                animation: 'zoom',
                closeAnimation: 'zoom',
                title: 'Delete\xa0' + productName,
                content: '<div class="text-center">' +
                    '<i class="far fa-trash-alt fa-4x mb-4 animated rotateIn"></i>' +
                    '<p class="heading">Are you sure?, Do you want to delete.</p>' +
                    '</div>',
                buttons: {
                    delete: {
                        btnClass: 'btn btn-sm btn-danger',
                        action: function () {
                            axios.delete(`/product/delete/${productId}`).then((res) => {
                                // after save success  reload data new
                                vm.findProducts();
                                $.notify('Deleted\xa0' + productName, 'success');
                            })

                        }
                    },
                    cancel: {
                        btnClass: 'btn btn-sm btn-link',
                    }
                }
            });


        },

        addProductModal() {
            $('#addProductModal').modal('toggle');
        },

        updateProductModal() {
            $('#updateProductModal').modal('toggle');
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
                    vm.findProducts();

                }).catch(err => console.log(err));
            });

        }


    },
    beforeMount: function () { },
    mounted: function () {
        this.columns = [
            {
                label: 'ID',
                field: 'id',
                // width:'50'
            },
            {
                label: 'No',
                field: 'number',
                width: '40'
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
            // {
            //     label: 'Image',
            //     field: 'img',
            //     width:'50'
            // },
            {
                label: 'Actions',
                field: 'action',
                width: '100'
            }
        ];

        this.findProducts();

    },
    watch: {},

});
