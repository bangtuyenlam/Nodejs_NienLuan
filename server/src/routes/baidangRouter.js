const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const baidangController = require('../controllers/BaidangController');

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../', 'image'),
    filename: (req, file, cb) => {
        return cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({
    storage: storage
})

router.put("/capnhat", upload.single('avatar'), baidangController.postUpdate);
router.post("/them",upload.single('hinhanh'),baidangController.createPost);
router.post("/:id", baidangController.postId);
router.delete("/xoa/:id", baidangController.deletePost);
router.get("/", baidangController.listPost);

module.exports = router;