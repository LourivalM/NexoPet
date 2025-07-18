const express = require("express");
const path = require("path");
const cors = require("cors")
const fs = require("fs"); // Importar o módulo fs

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "public/img")));

// Caminho para o arquivo JSON de usuários
const usersFilePath = path.join(__dirname, 'users.json');

let users = []; // Declarar como let para poder reatribuir

// Função para carregar usuários do arquivo JSON
const loadUsers = () => {
    try {
        if (fs.existsSync(usersFilePath)) {
            const data = fs.readFileSync(usersFilePath, 'utf8');
            users = JSON.parse(data);
            console.log('Usuários carregados com sucesso do users.json');
        } else {
            console.log('Arquivo users.json não encontrado. Criando usuários iniciais...');
            // Usuários iniciais se o arquivo não existir
            users = [
                { id: 1, nickname: "admin", senha: "123", email: "admin@ong.com", tipo: "ong" },
                { id: 2, nickname: "user", senha: "123", email: "user@email.com", tipo: "pessoa" },
                { id: 3, nickname: "parceiro", senha: "123", email: "parceiro@email.com", tipo: "parceiro" }
            ];
            saveUsers(); // Salvar usuários iniciais no arquivo
        }
    } catch (error) {
        console.error('Erro ao carregar usuários do users.json:', error);
    }
};

// Função para salvar usuários no arquivo JSON
const saveUsers = () => {
    try {
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
        console.log('Usuários salvos com sucesso no users.json');
    } catch (error) {
        console.error('Erro ao salvar usuários no users.json:', error);
    }
};

// Carregar usuários ao iniciar a aplicação
loadUsers();

app.post("/login", (req, res) => {
    try {
        const { login, senha } = req.body; // 'login' pode ser nickname ou email

        if (!login || !senha) {
            return res.status(400).json({
                message: "O campo de usuário/email ou senha não foi preenchido!"
            });
        }

        const user = users.find(u => (u.nickname === login || u.email === login) && u.senha === senha);

        if (user) {
            return res.status(200).json({
                id: user.id,
                nickname: user.nickname,
                email: user.email,
                tipo: user.tipo
            });
        }

        return res.status(401).json({
            message: "O nome de usuário/email ou senha está incorreto ou não foi cadastrado!"
        });

    } catch (error) {
        console.error("Erro no endpoint /login:", error); // Adicionado log de erro
        return res.status(500).json({
            message: "Falha na comunicação com o servidor!"
        });
    }
});

// Endpoint de registro para Pessoa Física
app.post("/register/pessoa", (req, res) => {
    try {
        const { nickname, nome, senha, email, nomeSocial, telefone, cidade, estado, pais } = req.body;

        if (!nickname || !nome || !senha || !email || !telefone || !cidade || !estado || !pais) {
            return res.status(400).json({ message: "Todos os campos obrigatórios devem ser preenchidos." });
        }

        if (users.some(u => u.nickname === nickname || u.email === email)) {
            return res.status(409).json({ message: "Nickname ou e-mail já cadastrado." });
        }

        const newUser = {
            id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
            nickname,
            nome,
            nomeSocial: nomeSocial || null,
            senha,
            email,
            telefone,
            cidade,
            estado,
            pais,
            tipo: "pessoa"
        };
        users.push(newUser);
        saveUsers(); // Salvar usuários após o cadastro
        console.log('Novo usuário pessoa física cadastrado:', newUser); // Log de sucesso
        return res.status(201).json({ message: "Pessoa física cadastrada com sucesso!", user: newUser });
    } catch (error) {
        console.error("Erro ao cadastrar pessoa física:", error);
        return res.status(500).json({ message: "Falha ao cadastrar pessoa física." });
    }
});

// Endpoint de registro para ONGs
app.post("/register/ong", (req, res) => {
    try {
        const { nickname, nomeInstituicao, email, senha, cnpj, telefone, rua, numero, bairro, cidade, estado, pais, cargoRepresentante, areaAtuacao } = req.body;

        if (!nickname || !nomeInstituicao || !email || !senha || !cnpj || !telefone || !rua || !numero || !bairro || !cidade || !estado || !pais || !cargoRepresentante || !areaAtuacao) {
            return res.status(400).json({ message: "Todos os campos obrigatórios devem ser preenchidos." });
        }

        if (users.some(u => u.nickname === nickname || u.email === email || (u.cnpj && u.cnpj === cnpj))) {
            return res.status(409).json({ message: "Nickname, e-mail ou CNPJ já cadastrado." });
        }

        const newUser = {
            id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
            nickname,
            nomeInstituicao,
            email,
            senha,
            cnpj,
            telefone,
            rua,
            numero,
            bairro,
            cidade,
            estado,
            pais,
            cargoRepresentante,
            areaAtuacao,
            tipo: "ong"
        };
        users.push(newUser);
        saveUsers(); // Salvar usuários após o cadastro
        console.log('Novo usuário ONG cadastrado:', newUser); // Log de sucesso
        return res.status(201).json({ message: "ONG cadastrada com sucesso!", user: newUser });
    } catch (error) {
        console.error("Erro ao cadastrar ONG:", error);
        return res.status(500).json({ message: "Falha ao cadastrar ONG." });
    }
});

// Endpoint de registro para Parceiros
app.post("/register/parceiro", (req, res) => {
    try {
        const { nickname, nomeInstituicao, email, senha, cnpj, telefone, rua, numero, bairro, cidade, estado, pais, cargoRepresentante, areaAtuacao } = req.body;

        if (!nickname || !nomeInstituicao || !email || !senha || !cnpj || !telefone || !rua || !numero || !bairro || !cidade || !estado || !pais || !cargoRepresentante || !areaAtuacao) {
            return res.status(400).json({ message: "Todos os campos obrigatórios devem ser preenchidos." });
        }

        if (users.some(u => u.nickname === nickname || u.email === email || (u.cnpj && u.cnpj === cnpj))) {
            return res.status(409).json({ message: "Nickname, e-mail ou CNPJ já cadastrado." });
        }

        const newUser = {
            id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
            nickname,
            nomeInstituicao,
            email,
            senha,
            cnpj,
            telefone,
            rua,
            numero,
            bairro,
            cidade,
            estado,
            pais,
            cargoRepresentante,
            areaAtuacao,
            tipo: "parceiro"
        };
        users.push(newUser);
        saveUsers(); // Salvar usuários após o cadastro
        console.log('Novo usuário Parceiro cadastrado:', newUser); // Log de sucesso
        return res.status(201).json({ message: "Parceiro cadastrado com sucesso!", user: newUser });
    } catch (error) {
        console.error("Erro ao cadastrar parceiro:", error);
        return res.status(500).json({ message: "Falha ao cadastrar parceiro." });
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