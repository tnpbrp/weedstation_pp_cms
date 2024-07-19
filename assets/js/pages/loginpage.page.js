parasails.registerPage("loginpage", {
    // name: 'loginpage',
    data: {
        username: '',
        // email: '',
        password: '',
    },
    methods: {
        login() {
            var forms = document.getElementsByClassName('login-validation');

            Array.prototype.filter.call(forms, function (form) {
                if (form.checkValidity() === false) {
                    return form.classList.add('was-validated');
                }

                form.classList.remove('was-validated');

                const body = {
                    username: username.value,
                    password: password.value
                }

                axios.post('/login', body).then((res) => {
                    window.location.href = '/';
                }).catch((err) => {
                    if (err.response.status === 500) {
                        $.notify(err.response.statusText, 'error');
                    } else {
                        $.notify(err.response.data.message, 'error');
                    }
                })

            });
        }
    }
});