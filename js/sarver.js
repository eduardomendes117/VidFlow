const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Configurar CORS
app.use(cors());

// Configurar armazenamento com Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Adicionar timestamp ao nome do arquivo
    }
});

const upload = multer({ storage: storage });

// Rota para upload de vídeo
app.post('/upload', upload.single('video'), (req, res) => {
    res.json({ message: 'Vídeo enviado com sucesso!', file: req.file });
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});