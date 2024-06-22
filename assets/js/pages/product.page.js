parasails.registerPage("productpage", {
    name: "productpage",
    props: {

    },
    data: {
        newProduct: {
            name: '',
            image: '',
            price: '',
            description: ''
        }
    },
    computed: {},
    methods: {
        findProducts() {
            axios.get(`/product/find`).then(res => {
                console.log(res)
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

        openAddProductModal() {
            $('#addProductModal').modal('toggle');
        },

        saveAddProduct() {
            console.log(this.newProduct)
            //api create
            var forms = document.getElementsByClassName('add-product-validation');

            // Array.prototype.filter.call(forms, function (form) {
            //     if (form.checkValidity() === false) {
            //         return form.classList.add('was-validated');
            //     }

            //     form.classList.remove('was-validated');
            // });

            Array.prototype.forEach.call(forms, function (form) {
                // Add event listener to 'submit' event of each form
                form.addEventListener('submit', function (event) {
                    // Check validity of the form
                    if (!form.checkValidity()) {
                        // If form is invalid, add 'was-validated' class to show validation feedback
                        form.classList.add('was-validated');
                        // Prevent form submission
                        event.preventDefault();
                        event.stopPropagation();
                    } else {
                        // If form is valid, remove 'was-validated' class
                        form.classList.remove('was-validated');
            
                        // Example of what to do when form is valid (uncomment your axios code or do other actions)
                        // axios.post(`/product/create`, this.newProduct).then(res => {
                        //     $('#addProductModal').modal('hide');
                        //     $.notify('Create customer successfully.', 'success');
                        // }).catch(err => console.log(err));
                    }
                }, false);
            });

            // axios.post(`/product/create`, this.newProduct).then(res => {
            //     $('#addProductModal').modal('hide');
            //     $.notify('Create customer successfully.', 'success');
            //     // load refresh data before save succuss
            //   }).catch(err => console.log(err));

            $('#addProductModal').modal('hide');

        }


    },
    beforeMount: function () { },
    mounted: function () {
        this.findProducts();

    },
    watch: {},

});
