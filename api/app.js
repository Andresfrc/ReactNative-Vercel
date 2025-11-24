const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect(
  'mongodb+srv://andres:andres123@cluster0.luu70lk.mongodb.net/miapp?retryWrites=true&w=majority'
);

const conect = mongoose.connection;
conect.once('open', () => {
  console.log('Conectado a MongoDB Atlas');
});
conect.on('error', (e) => {
  console.log('Error en MongoDB:', e);
});


const Usuario = mongoose.model('Usuario', {
  email: String,
  password: String,
  membresia: String,
},'Usuario');


app.post('/register', async (req, res) => {
  try {
    const { email, password, membresia } = req.body;

    
    if (!email || !password || !membresia) {
      return res.json({
        ok: false,
        message: 'Todos los campos son obligatorios',
      });
    }


    const existe = await Usuario.findOne({ email });
    if (existe) {
      return res.json({
        ok: false,
        message: 'El correo ya está registrado',
      });
    }

 
    const nuevo = new Usuario({
      email,
      password,
      membresia
    });

    await nuevo.save();

    return res.json({
      ok: true,
      message: 'Usuario registrado correctamente',
    });
  } catch (err) {
    console.log('Error en /register:', err);
    return res.json({
      ok: false,
      message: 'Error en el servidor',
    });
  }
});


app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        ok: false,
        message: 'Todos los campos son obligatorios',
      });
    }

    console.log("Login recibido:", email, password);
    const user = await Usuario.findOne({ email });
    if (user && user.password === password) {
      return res.json({
        ok: true,
        user,
        message: 'Bienvenido',
      });
    } else {
      return res.json({
        ok: false,
        message: 'Usuario o contraseña incorrecta',
      });
    }
  } catch (err) {
    console.log('Error en /login:', err);
    return res.json({
      ok: false,
      message: 'Error en el servidor',
    });
  }
});


app.listen(5000, () => {
  console.log('Servidor corriendo en puerto 5000');
});
