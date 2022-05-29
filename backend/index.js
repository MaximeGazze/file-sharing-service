const express = require('express');
const multer = require('multer');
const cors = require('cors')
const fs = require('fs');
const path = require('path');

const app = express();
const port = 60000;

const separator = '$';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = path.basename(file.originalname, ext);
    const date = new Date();
    cb(null, `${filename}${separator}${date.getTime()}${separator}${ext}`);
  },
});

const upload = multer({ storage });

app.use(cors('*'));

app.get('/files', (req, res) => {
  const files = fs.readdirSync('./public');
  const filesWithStats = files.map(item => {
    return {
      id: item,
      name: `${item.split(separator)[0]}${item.split(separator)[2]}`,
      uploadDate: item.split(separator)[1],
      ...fs.statSync(`./public/${item}`)
    };
  });
  res.status(201).json(filesWithStats);
});

app.get('/download', (req, res) => {
  const { file } = req.query;
  res.download(`./public/${file}`);
});

app.get('/upload', (req, res) => {
  res.send('<form action="/upload" method="post" enctype="multipart/form-data"><input type="file" name="file" /><button type="submit">submit</button></form>');
});

app.post('/upload', upload.single('file'), (req, res) => {
  res.status(201).json({ 'message': 'success' });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
