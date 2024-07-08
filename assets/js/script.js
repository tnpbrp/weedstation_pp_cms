'user strict';

const logOut = () => {
    axios.post('/logout').then((res) => {
        console.log(res)
        location.assign('/login');
    })
}

const checkAuth = () => {
    const pathLogin = window.location.href.split("/")[3] == 'login';
    const pathRegis = window.location.href.split("/")[3] == 'register';
    // // const pathRepass = window.location.href.split("/")[3] == 'resetpassword';

    axios.post('/check/auth').then((res) => {
        // console.log(res.data.username)
        let userName = document.getElementById('show-username');
        userName.innerText = res.data.username;

    }).catch((err) => {
        if (err.response.status == 401) {
            // Unauthorized
            if (pathLogin || pathRegis) return;
            // alert(err.response.data.message)
            location.assign('/login');
        } else {
            $.notify(err, 'error');
        }

    })

}

const checkMenuActive = () => {
    var menuList = $('.menu-list');
    const page = window.location.href.split("/")[3];
    let menuActive = menuList.find(`a[href="/${page}"]`); // ใช้ `a[href="${page}"]` เพื่อให้หา element <a> ที่มี href ตรงกับ path ปัจจุบัน

    if (menuActive.length > 0) {
        menuActive.parent().addClass('active');
    }
    // console.log(menuActive);
}

$(document).ready(function () {
    $('#toggle-sidemenu').click(function () {
        $('.sidenav').css({ 'width': '240px' });
        $('.sidenav').toggleClass('open');
        // $('.sidenav').addClass('open');


    });

    $('#sidemenu-hide').click(function () {
        $('.sidenav').css({ 'width': '0px', });
        $('.sidenav').toggleClass('open');
    });

    $('.sidenav-backdrop').click(function () {
        console.log("cclick");
        $('.sidenav').css({ 'width': '0px', });
        $('.sidenav').toggleClass('open');
    });

    



    checkAuth();
    checkMenuActive();
});