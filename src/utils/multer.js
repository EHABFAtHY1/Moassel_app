const multer = require('multer');
const path = require('path');
const fs = require('fs');

// 
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         // النوع (images, pdfs, videos)
//         const fileType = req.body.type || 'others';

//         // لو صور كتب، ناخد الـ bookId من body
//         let uploadPath = path.join(__dirname, '../uploads', fileType);

//         if (fileType === 'images' && req.body.bookId) {
//             uploadPath = path.join(uploadPath, 'books', req.body.bookId);
//         }

//         // لو PDF كتب
//         if (fileType === 'pdfs' && req.body.bookId) {
//             uploadPath = path.join(uploadPath, 'books');
//         }
//         // لو mp3 , mp4
//         if ((fileType === 'mp3' || fileType === 'mp4') && req.body.bookId) {
//             uploadPath = path.join(uploadPath, 'books', req.body.bookId);
//         }
//         // إنشاء المسار لو مش موجود
//         fs.mkdirSync(uploadPath, { recursive: true });

//         cb(null, uploadPath);
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//         cb(null, uniqueSuffix + path.extname(file.originalname));
//     }
// });

// // فلتر لقبول أنواع معينة
// const fileFilter = (req, file, cb) => {
//     const fileType = req.body.type;

//     if (fileType === 'images' && !file.mimetype.startsWith('image/')) {
//         return cb(new Error('Only image files are allowed'), false);
//     }
//     if (fileType === 'pdfs' && file.mimetype !== 'application/pdf') {
//         return cb(new Error('Only PDF files are allowed'), false);
//     }
//     if ((fileType === 'mp3' || fileType === 'mp4') && file.mimetype !== 'audio/mpeg') {
//         return cb(new Error('Only MP3 files are allowed'), false);
//     }
//     cb(null, true);
// };

// // Multer config
// const upload = multer({
//     storage,
//     fileFilter,
// });

// module.exports = upload;
const upload = ({ folder }) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            // النوع (images, pdfs, videos)
            const fileType = req.body.type || 'others';

            // لو صور كتب، ناخد الـ bookId من body
            let uploadPath = path.join(__dirname, '../uploads', fileType);

            if (fileType === 'images' && req.body.bookId) {
                uploadPath = path.join(uploadPath, 'books', req.body.bookId);
            }

            // لو PDF كتب
            if (fileType === 'pdfs' && req.body.bookId) {
                uploadPath = path.join(uploadPath, 'books');
            }
            // لو mp3 , mp4
            if ((fileType === 'mp3' || fileType === 'mp4') && req.body.bookId) {
                uploadPath = path.join(uploadPath, 'books', req.body.bookId);
            }
            // إنشاء المسار لو مش موجود
            fs.mkdirSync(uploadPath, { recursive: true });

            cb(null, uploadPath);
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, uniqueSuffix + path.extname(file.originalname));
        }
    });

    // فلتر لقبول أنواع معينة
    const fileFilter = (req, file, cb) => {


        if (file.mimetype.startsWith('image/')) {
            return cb(new Error('Only image files are allowed'), false);
        }
        if (file.mimetype == 'application/pdf') {
            return cb(new Error('Only PDF files are allowed'), false);
        }
        if (file.mimetype == 'audio/') {
            return cb(new Error('Only MP3 files are allowed'), false);
        }
        cb(null, true);
    };
    const multerUpload = multer({ storage });
};
module.exports = {
    upload
}; 