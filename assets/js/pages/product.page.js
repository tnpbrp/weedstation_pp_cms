parasails.registerPage("productpage", {
    name: "productpage",
    props: {

    },
    data: {
        newProduct: {},
        editProduct:{},
        rows:[],
        columns: [],

    },
    computed: {},
    methods: {
        findProducts() {
            var vm =  this;
            axios.get(`/product/find`).then(res => {
                vm.rows = res.data

                console.log(res.data)
            }).catch(err => console.log(err));
        },

        createProduct() {
            axios.post(`/product/create`, {}).then((res) => {
                console.log(res)
            })
        },

        updateProduct() {
            axios.put(`/product/update/`, {}).then((res) => {
                console.log(res)
            })
        },

        deleteProduct() {
            axios.delete(`/product/delete/${id}`).then((res) => {
                console.log(res)
            })
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
                }).catch(err => console.log(err));
            });

        }


    },
    beforeMount: function () { },
    mounted: function () {
        this.findProducts();

    },
    watch: {},

});
