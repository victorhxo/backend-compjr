import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/images');
  },
  filename: (req, file, cb) => {
    const [filename, extensao] = file.originalname.split('.');
    cb(null, `${filename}`);
  },
});

export default multer({ storage });
