const express = require("express");
const cors = require("cors");
const Fipe = require("./models/Fipe");
const CarroZero = require("./models/CarroZero");

const db = require("./db/connection");

const app = express();
const port = 3001;

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(cors());

// ROUTES

// GetByModelo
app.get("/fipe/:codfipe", async (req, res) => {
  const fipes = await Fipe.findAll({
    where: {
      fipe: req.params.codfipe,
    },
    attributes: ["versao"],
    group: ["versao"],
  });
  res.status(200).json(fipes);
});

app.get("/carrozero/desconto", async (req, res) => {
  const carros = await CarroZero.findAll();
  const carroComDesconto = carros.map((carro) => {
    if (carro.valor > 130000) {
      return {
        modelo: carro.modelo,
        fipe: carro.fipe,
        valor: carro.valor,
        novoValorComDesconto: carro.valor * 0.9,
      };
    } else {
      return {
        modelo: carro.modelo,
        fipe: carro.fipe,
        valor: carro.valor,
      };
    }
  });
  res.status(200).json(carroComDesconto);
});

// POST
app.post("/fipe", async (req, res) => {
  try {
    const fipe = req.body;
    await Fipe.create(fipe);
    res.status(201).json(fipe);
  } catch (err) {
    res.status(500).json({ err: "Ocorreu um erro ao criar o obj Fipe" });
  }
});

app.post("/carrozero", async (req, res) => {
  try {
    const carro = req.body;
    await CarroZero.create(carro);
    res.status(201).json(carro);
  } catch (err) {
    res.status(500).json({ err: "Ocorreu um erro ao criar o obj Carro Zero" });
  }
});

// Gets
app.get("/fipe", async (req, res) => {
  try {
    const fipes = await Fipe.findAll();
    res.status(200).json(fipes);
  } catch (err) {
    res.status(500).json({ err: "Ocorreu um erro ao requisitar os Fipes" });
  }
});

app.get("/carrozero", async (req, res) => {
  try {
    const carros = await CarroZero.findAll();
    res.status(200).json(carros);
  } catch (err) {
    res
      .status(500)
      .json({ err: "Ocorreu um erro ao requisitar os Carros Zero" });
  }
});

// DB config e Express config
db.sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`App rodandno na porta ${port}`);
    });
  })
  .catch((err) => console.log(err));
