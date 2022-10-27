import multer from 'multer';

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'public/books');
    },
    filename(req, file, cb) {
        cb(null, `${new Date().toISOString().replace(/:/g, '-')}-${file.originalname}`)
    }
})

const allowedTypes = ['text/html', 'application/pdf', 'application/epub+zip', 'application/epub', 'image/png', 'image/jpg', 'image/jpeg'];

const fileFilter = (req: any, file: any, cb: any) => {
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(null, false)
      console.log(file.mimetype)
    }
};

export = multer({
    storage, fileFilter
});