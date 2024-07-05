parasails.registerPage("registerpage", {
    // name: '#registerpage',
    data: {
        username: '',
        email: '',
        password: '',
        repassword: ''
    },
    methods: {
        register() {
            // ตรวจสอบว่า password และ repassword ตรงกันหรือไม่
            if (this.password !== this.repassword) {
                alert('Passwords do not match!');
                return;
            }

            // ตรวจสอบข้อมูลที่กรอกและส่งไปยัง API หรือการจัดการลงทะเบียนที่คุณต้องการ
            // console.log('Registering...');
            const body = {
                username: username.value,
                password: password.value
            };

            axios.post('/register', body).then(response => {

                $.notify('Register successfully.', 'success');
                setTimeout(() => {
                    window.location.href = '/login';
                }, 3000)

            }).catch(error => {
                if (error.response.data.message) {
                    $.notify(error.response.data.message, 'error');
                } else {
                    $.notify(error, 'error');
                }
            });

        }
    }
});