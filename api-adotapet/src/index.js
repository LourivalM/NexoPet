const express = require("express");
const path = require("path");
const cors = require("cors")
const fs = require("fs"); // Importar o módulo fs

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "public/img")));
app.use(express.static(path.join(__dirname, "..", "..", "src", "assets", "images", "uploads")));

// Caminho para o arquivo JSON de usuários
const usersFilePath = path.join(__dirname, 'users.json');
const petsFilePath = path.join(__dirname, 'pets.json');
const productsFilePath = path.join(__dirname, 'products.json');
const postsFilePath = path.join(__dirname, 'posts.json');
const ongsFilePath = path.join(__dirname, 'ongs.json');
const partnersFilePath = path.join(__dirname, 'partners.json');
const articlesFilePath = path.join(__dirname, 'articles.json');

let users = []; // Declarar como let para poder reatribuir
let pets = []; // Declarar como let para poder reatribuir
let products = []; // Declarar como let para poder reatribuir
let posts = []; // Declarar como let para poder reatribuir
let ongs = []; // Declarar como let para poder reatribuir
let partners = []; // Declarar como let para poder reatribuir
let articles = []; // Declarar como let para poder reatribuir

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

// Função para carregar pets do arquivo JSON
const loadPets = () => {
    try {
        if (fs.existsSync(petsFilePath)) {
            const data = fs.readFileSync(petsFilePath, 'utf8');
            pets = JSON.parse(data);
            console.log('Pets carregados com sucesso do pets.json');
        } else {
            console.log('Arquivo pets.json não encontrado. Criando arquivo vazio...');
            pets = [];
            savePets(); // Salvar arquivo vazio
        }
    } catch (error) {
        console.error('Erro ao carregar pets do pets.json:', error);
    }
};

// Função para salvar pets no arquivo JSON
const savePets = () => {
    try {
        fs.writeFileSync(petsFilePath, JSON.stringify(pets, null, 2), 'utf8');
        console.log('Pets salvos com sucesso no pets.json');
    } catch (error) {
        console.error('Erro ao salvar pets no pets.json:', error);
    }
};

// Função para carregar produtos do arquivo JSON
const loadProducts = () => {
    try {
        if (fs.existsSync(productsFilePath)) {
            const data = fs.readFileSync(productsFilePath, 'utf8');
            products = JSON.parse(data);
            console.log('Produtos carregados com sucesso do products.json');
        } else {
            console.log('Arquivo products.json não encontrado. Criando arquivo vazio...');
            products = [];
            saveProducts(); // Salvar arquivo vazio
        }
    } catch (error) {
        console.error('Erro ao carregar produtos do products.json:', error);
    }
};

// Função para salvar produtos no arquivo JSON
const saveProducts = () => {
    try {
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2), 'utf8');
        console.log('Produtos salvos com sucesso no products.json');
    } catch (error) {
        console.error('Erro ao salvar produtos no products.json:', error);
    }
};

// Função para carregar posts do arquivo JSON
const loadPosts = () => {
    try {
        if (fs.existsSync(postsFilePath)) {
            const data = fs.readFileSync(postsFilePath, 'utf8');
            posts = JSON.parse(data);
            console.log('Posts carregados com sucesso do posts.json');
        } else {
            console.log('Arquivo posts.json não encontrado. Criando arquivo vazio...');
            posts = [];
            savePosts(); // Salvar arquivo vazio
        }
    } catch (error) {
        console.error('Erro ao carregar posts do posts.json:', error);
    }
};

// Função para salvar posts no arquivo JSON
const savePosts = () => {
    try {
        fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2), 'utf8');
        console.log('Posts salvos com sucesso no posts.json');
    } catch (error) {
        console.error('Erro ao salvar posts no posts.json:', error);
    }
};

// Função para carregar ONGs do arquivo JSON
const loadOngs = () => {
    try {
        if (fs.existsSync(ongsFilePath)) {
            const data = fs.readFileSync(ongsFilePath, 'utf8');
            ongs = JSON.parse(data);
            console.log('ONGs carregadas com sucesso do ongs.json');
        } else {
            console.log('Arquivo ongs.json não encontrado. Criando arquivo vazio...');
            ongs = [];
            // Opcional: Adicionar ONGs iniciais aqui se desejar
            saveOngs();
        }
    } catch (error) {
        console.error('Erro ao carregar ONGs do ongs.json:', error);
    }
};

// Função para salvar ONGs no arquivo JSON
const saveOngs = () => {
    try {
        fs.writeFileSync(ongsFilePath, JSON.stringify(ongs, null, 2), 'utf8');
        console.log('ONGs salvas com sucesso no ongs.json');
    } catch (error) {
        console.error('Erro ao salvar ONGs no ongs.json:', error);
    }
};

// Função para carregar Parceiros do arquivo JSON
const loadPartners = () => {
    try {
        if (fs.existsSync(partnersFilePath)) {
            const data = fs.readFileSync(partnersFilePath, 'utf8');
            partners = JSON.parse(data);
            console.log('Parceiros carregados com sucesso do partners.json');
        } else {
            console.log('Arquivo partners.json não encontrado. Criando arquivo vazio...');
            partners = [];
            // Opcional: Adicionar Parceiros iniciais aqui se desejar
            savePartners();
        }
    } catch (error) {
        console.error('Erro ao carregar Parceiros do partners.json:', error);
    }
};

// Função para salvar Parceiros no arquivo JSON
const savePartners = () => {
    try {
        fs.writeFileSync(partnersFilePath, JSON.stringify(partners, null, 2), 'utf8');
        console.log('Parceiros salvos com sucesso no partners.json');
    } catch (error) {
        console.error('Erro ao salvar Parceiros no partners.json:', error);
    }
};

// Função para carregar Artigos do arquivo JSON
const loadArticles = () => {
    try {
        if (fs.existsSync(articlesFilePath)) {
            const data = fs.readFileSync(articlesFilePath, 'utf8');
            articles = JSON.parse(data);
            console.log('Artigos carregados com sucesso do articles.json');
        } else {
            console.log('Arquivo articles.json não encontrado. Criando arquivo vazio...');
            articles = [];
            saveArticles();
        }
    } catch (error) {
        console.error('Erro ao carregar Artigos do articles.json:', error);
    }
};

// Função para salvar Artigos no arquivo JSON
const saveArticles = () => {
    try {
        fs.writeFileSync(articlesFilePath, JSON.stringify(articles, null, 2), 'utf8');
        console.log('Artigos salvos com sucesso no articles.json');
    } catch (error) {
        console.error('Erro ao salvar Artigos no articles.json:', error);
    }
};

// Carregar usuários e pets ao iniciar a aplicação
loadUsers();
loadPets();
loadProducts();
loadPosts();
loadOngs();
loadPartners();
loadArticles();

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


app.get("/users", (req, res) => {
    try {
        return res.status(200).json(users);
    } catch (error) {
        console.error("Erro no endpoint /users:", error);
        return res.status(500).json({
            message: "Falha na comunicação com o servidor!"
        });
    }
});

app.get("/users/:id", (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const user = users.find(u => u.id === userId);

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error("Erro no endpoint /users/:id:", error);
        return res.status(500).json({
            message: "Falha na comunicação com o servidor!"
        });
    }
});

app.patch("/users/:id", (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const updatedData = req.body;

        const userIndex = users.findIndex(u => u.id === userId);

        if (userIndex === -1) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }

        // Atualiza apenas as propriedades fornecidas no corpo da requisição
        users[userIndex] = { ...users[userIndex], ...updatedData };
        saveUsers();

        console.log('Usuário atualizado:', users[userIndex]);
        return res.status(200).json(users[userIndex]);

    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        return res.status(500).json({
            message: "Falha ao atualizar usuário."
        });
    }
});


app.get("/pets", (req, res) => {
    try {
        return res.status(200).json(pets);

    } catch (error) {
        console.error("Erro no endpoint /pets:", error);
        return res.status(500).json({
            message: "Falha na comunicação com o servidor!"
        });
    }
});

app.post("/pets", (req, res) => {
    try {
        const newPet = req.body;
        newPet.id = pets.length > 0 ? Math.max(...pets.map(p => p.id)) + 1 : 1;
        pets.push(newPet);
        savePets();
        console.log('Novo pet cadastrado:', newPet);
        return res.status(201).json(newPet);
    } catch (error) {
        console.error("Erro ao cadastrar pet:", error);
        return res.status(500).json({
            message: "Falha ao cadastrar pet."
        });
    }
});

app.delete("/pets/:id", (req, res) => {
    try {
        const petId = parseInt(req.params.id);
        const initialLength = pets.length;
        pets = pets.filter(pet => pet.id !== petId);

        if (pets.length === initialLength) {
            return res.status(404).json({ message: "Pet não encontrado." });
        }

        savePets();
        console.log(`Pet com ID ${petId} removido.`);
        return res.status(204).send(); // 204 No Content para sucesso sem retorno
    } catch (error) {
        console.error("Erro ao deletar pet:", error);
        return res.status(500).json({
            message: "Falha ao deletar pet."
        });
    }
});

app.patch("/pets/:id", (req, res) => {
    try {
        const petId = parseInt(req.params.id);
        const updatedData = req.body;

        const petIndex = pets.findIndex(p => p.id === petId);

        if (petIndex === -1) {
            return res.status(404).json({ message: "Pet não encontrado." });
        }

        // Atualiza apenas as propriedades fornecidas no corpo da requisição
        pets[petIndex] = { ...pets[petIndex], ...updatedData };
        savePets();

        console.log('Pet atualizado:', pets[petIndex]);
        return res.status(200).json(pets[petIndex]);

    } catch (error) {
        console.error("Erro ao atualizar pet:", error);
        return res.status(500).json({
            message: "Falha ao atualizar pet."
        });
    }
});

app.get("/products", (req, res) => {
    try {
        return res.status(200).json(products);
    } catch (error) {
        console.error("Erro no endpoint /products:", error);
        return res.status(500).json({
            message: "Falha na comunicação com o servidor!"
        });
    }
});

app.post("/products", (req, res) => {
    try {
        const newProduct = req.body;
        newProduct.id = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
        products.push(newProduct);
        saveProducts();
        console.log('Novo produto cadastrado:', newProduct);
        return res.status(201).json(newProduct);
    } catch (error) {
        console.error("Erro ao cadastrar produto:", error);
        return res.status(500).json({
            message: "Falha ao cadastrar produto."
        });
    }
});

app.delete("/products/:id", (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const initialLength = products.length;
        products = products.filter(product => product.id !== productId);

        if (products.length === initialLength) {
            return res.status(404).json({ message: "Produto não encontrado." });
        }

        saveProducts();
        console.log(`Produto com ID ${productId} removido.`);
        return res.status(204).send();
    } catch (error) {
        console.error("Erro ao deletar produto:", error);
        return res.status(500).json({
            message: "Falha ao deletar produto."
        });
    }
});

app.patch("/products/:id", (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const updatedData = req.body;

        const productIndex = products.findIndex(p => p.id === productId);

        if (productIndex === -1) {
            return res.status(404).json({ message: "Produto não encontrado." });
        }

        // Atualiza apenas as propriedades fornecidas
        products[productIndex] = { ...products[productIndex], ...updatedData };
        saveProducts();

        console.log('Produto atualizado:', products[productIndex]);
        return res.status(200).json(products[productIndex]);

    } catch (error) {
        console.error("Erro ao atualizar produto:", error);
        return res.status(500).json({
            message: "Falha ao atualizar produto."
        });
    }
});

app.get("/posts", (req, res) => {
    try {
        return res.status(200).json(posts);
    } catch (error) {
        console.error("Erro no endpoint /posts:", error);
        return res.status(500).json({
            message: "Falha na comunicação com o servidor!"
        });
    }
});

app.post("/posts", (req, res) => {
    try {
        const newPost = req.body;
        newPost.id = posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1;
        newPost.createdAt = new Date();
        newPost.likes = 0; // Inicializa likes
        newPost.likedByUsers = []; // Inicializa array de usuários que curtiram
        posts.push(newPost);
        savePosts();
        console.log('Novo post cadastrado:', newPost);
        return res.status(201).json(newPost);
    } catch (error) {
        console.error("Erro ao cadastrar post:", error);
        return res.status(500).json({
            message: "Falha ao cadastrar post."
        });
    }
});

app.delete("/posts/:id", (req, res) => {
    try {
        const postId = parseInt(req.params.id);
        const initialLength = posts.length;
        posts = posts.filter(post => post.id !== postId);

        if (posts.length === initialLength) {
            return res.status(404).json({ message: "Post não encontrado." });
        }

        savePosts();
        console.log(`Post com ID ${postId} removido.`);
        return res.status(204).send();
    } catch (error) {
        console.error("Erro ao deletar post:", error);
        return res.status(500).json({
            message: "Falha ao deletar post."
        });
    }
});

app.get("/ongs", (req, res) => {
    try {
        return res.status(200).json(ongs);
    } catch (error) {
        console.error("Erro no endpoint /ongs:", error);
        return res.status(500).json({
            message: "Falha na comunicação com o servidor!"
        });
    }
});

app.get("/partners", (req, res) => {
    try {
        return res.status(200).json(partners);
    } catch (error) {
        console.error("Erro no endpoint /partners:", error);
        return res.status(500).json({
            message: "Falha na comunicação com o servidor!"
        });
    }
});

app.get("/articles", (req, res) => {
    try {
        return res.status(200).json(articles);
    } catch (error) {
        console.error("Erro no endpoint /articles:", error);
        return res.status(500).json({
            message: "Falha na comunicação com o servidor!"
        });
    }
});

app.get("/articles/:id", (req, res) => {
    try {
        const articleId = parseInt(req.params.id);
        const article = articles.find(a => a.id === articleId);

        if (!article) {
            return res.status(404).json({ message: "Artigo não encontrado." });
        }

        return res.status(200).json(article);
    } catch (error) {
        console.error("Erro ao buscar artigo por ID:", error);
        return res.status(500).json({
            message: "Falha na comunicação com o servidor!"
        });
    }
});

app.get("/posts/:id", (req, res) => {
    try {
        const postId = parseInt(req.params.id);
        const post = posts.find(p => p.id === postId);

        if (!post) {
            return res.status(404).json({ message: "Post não encontrado." });
        }

        return res.status(200).json(post);
    } catch (error) {
        console.error("Erro ao buscar post por ID:", error);
        return res.status(500).json({
            message: "Falha na comunicação com o servidor!"
        });
    }
});

app.patch("/posts/:id", (req, res) => {
    try {
        const postId = parseInt(req.params.id);
        const updatedData = req.body;

        const postIndex = posts.findIndex(p => p.id === postId);

        if (postIndex === -1) {
            return res.status(404).json({ message: "Post não encontrado." });
        }

        // Atualiza apenas as propriedades fornecidas
        posts[postIndex] = { ...posts[postIndex], ...updatedData };
        savePosts();

        console.log('Post atualizado:', posts[postIndex]);
        return res.status(200).json(posts[postIndex]);

    } catch (error) {
        console.error("Erro ao atualizar post:", error);
        return res.status(500).json({
            message: "Falha ao atualizar post."
        });
    }
});

app.listen(3001, () => {
    console.log("http://localhost:3001/");
});