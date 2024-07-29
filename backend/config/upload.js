const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = require('./awsConfig');

// File type validation
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type, only JPEG and PNG is allowed!'), false);
    }
};

// Multer configuration with file filter and size limit
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            cb(null, `${Date.now().toString()}-${file.originalname}`);
        },
    }),
    limits: {
        fileSize: 1024 * 1024 * 2 // 2 MB file size limit
    },
    fileFilter: fileFilter
});

module.exports = upload;
