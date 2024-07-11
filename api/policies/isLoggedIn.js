module.exports = async function (req, res, proceed) {
    'user strict';
    if (req.isAuthenticated()) {
        return proceed();
    } else {
        return res.forbidden('You are not permitted to perform this action.');
    }

}
