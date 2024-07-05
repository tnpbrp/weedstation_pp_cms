
module.exports = async function (req, res, next) {

    if (req.session.authenticated) {
        return next(); // ผู้ใช้เข้าสู่ระบบแล้ว, ดำเนินการต่อไป
    } else {
        return res.status(401).json({ message: 'Unauthorized' }); // ผู้ใช้ยังไม่ได้เข้าสู่ระบบ, ส่งคืนสถานะ 401 (Unauthorized)
    }

}
