'user strict';

const logOut = () => {
    axios.post('/logout').then((res) => {
        location.assign('/login');
    })
}

const unAuthorized = () => {
    const pathLogin = window.location.href.split("/")[3] == 'login';
    const pathRegis = window.location.href.split("/")[3] == 'register';
    if (pathLogin || pathRegis) return;
    location.assign('/login');
};

const checkAuth = () => {

    axios.post('/check/auth').then((res) => {
        let userName = document.getElementById('show-username');
        userName.innerText = res.data.username;

    }).catch((err) => {
        if (err.response) {
            if (err.response.status === 401) {
                unAuthorized();
            }
        } else {
            $.notify(err, 'error');
            unAuthorized();
        }
    })
};

const checkMenuActive = () => {
    var menuList = $('.menu-list');
    const page = window.location.href.split("/")[3];
    let menuActive = menuList.find(`a[href="/${page}"]`);

    if (menuActive.length > 0) {
        menuActive.parent().addClass('active');
    }
}

$(document).ready(function () {
    $('#toggle-sidemenu').click(function () {
        $('.sidenav').css({ 'width': '240px' });
        $('.sidenav').toggleClass('open');
    });

    $('#sidemenu-hide').click(function () {
        $('.sidenav').css({ 'width': '0px', });
        $('.sidenav').toggleClass('open');
    });

    $('.sidenav-backdrop').click(function () {
        $('.sidenav').css({ 'width': '0px', });
        $('.sidenav').toggleClass('open');
    });

    $('.users-toggler').click(function (e) {
        $('.users-menu').toggleClass('show');
    });

    checkAuth();
    checkMenuActive();
});

//  1. User management and Access control
//  2. Content Management
//  3. Content Editor
//  4. Media Management
//  7. Search Functionality
//  11. Version Control
//  12. Form Management

//  5.  Template and Customization (skip)
//  6.  Menu Management (skip)
//  9.  SEO Tools   (skip)
//  8.  Plugins and Extensions  (skip)
//  10. Reporting and Analytics   (skip)
//  13. Backup and Restore  (skip)
//  14. Notification and Communication  (skip)
//  15. Language EN - TH (skip)

// fxSR3o1rYoEyEbIv