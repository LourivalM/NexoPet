const express = require("express");
const path = require("path");
const cors = require("cors")

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "public/img")));

app.post("/login", (req, res) => {
    try {
        const { nome, senha } = req.body

        if (!nome || !senha) {
            return res.status(400).json({
                message: "O campo de usuário ou senha não foi preenchido!"
            });
        }

        if (nome === "admin" && senha === "123") {
            return res.status(200).json({
                id: 1,
                nome: "Admin ONG",
                email: "admin@ong.com",
                tipo: "ong"
            });
        }

        if (nome === "user" && senha === "123") {
            return res.status(200).json({
                id: 2,
                nome: "Usuário Comum",
                email: "user@email.com",
                tipo: "pessoa"
            });
        }

        return res.status(401).json({
            message: "O nome de usuário ou senha está incorreto ou não foi cadastrado!"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Falha na comunicação com o servidor!"
        });
    }
});

app.get("/pets", (req, res) => {
    try {
        const pets = [
            {
                id: 1,
                nome: "Max",
                especie: "Cachorro",
                raca: "Golden Retriever",
                idade: "2 anos",
                ong: "Amigos dos Animais",
                img: "http://placekitten.com/g/200/300"
            },
            {
                id: 2,
                nome: "Mimi",
                especie: "Gato",
                raca: "Siamês",
                idade: "1 ano",
                ong: "Patas amigas",
                img: "http://placekitten.com/g/200/300"
            },
            {
                id: 3,
                nome: "Buddy",
                especie: "Cachorro",
                raca: "Labrador",
                idade: "3 anos",
                ong: "Amigos dos Animais",
                img: "http://placekitten.com/g/200/300"
            },
            {
                id: 4,
                nome: "Lucy",
                especie: "Gato",
                raca: "Persa",
                idade: "4 anos",
                ong: "Patas amigas",
                img: "http://placekitten.com/g/200/300"
            }
        ];

        return res.status(200).json(pets);

    } catch (error) {
        return res.status(500).json({
            message: "Falha na comunicação com o servidor!"
        });
    }
});

app.listen(3001, () => {
    console.log("http://localhost:3001/");
});
