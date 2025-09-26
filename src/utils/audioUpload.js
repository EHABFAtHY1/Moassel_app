const multer = require('multer');

// إعداد Multer لتحميل الصوتيات
const audioStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/problem_audio');  // مجلد تخزين الصوتيات
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);  // تسميه الملف باستخدام timestamp
    }
});

// تخصيص multer لتحميل الصوتيات
const audioUpload = multer({ storage: audioStorage })  // يسمح بتحميل حتى 5 ملفات صوتية
