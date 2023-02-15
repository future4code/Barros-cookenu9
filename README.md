<h1 align="center" >Cookenu 🍱</h1>

Enunciado Projeto:</br>
Esse produto nada mais é do que uma rede social, na qual os usuários podem dividir informações relevantes sobre comidas e receitas que tenham experimentado. Ela possui todas as funcionalidades mais comuns em redes sociais:

<h3 align="center" >Funcionalidades:</br></h3>
✅ Cadastrar pessoas usuária;</br>
✅ Login;</br>
⬛ Informações do próprio perfil;</br>
✅ Criar receitas;</br>
✅ Seguir usuários;</br>
⬛ Feed</br>

---

<h3 align="center">🛠 Ferramentas:</h3>
- Typescript;</br>
- Node.js;</br>
- MySQL;</br>
- Express;</br>
- Uuid;</br>
- JsonWebToken;</br>
- Knex;</br>
- Bcrypt;</br>

---

<h3 align="center">⚙️ Instruções para rodar o projeto:</h3>

> O arquivo *requests.rest*, presente na pasta raiz do projeto, contém todos os endpoints com url do deploy disponível online (Render)

Caso queira rodar o projeto localmente, as instruções são:

```
git clone https://github.com/future4code/Barros-labook3.git

cd Barros-labook3 -> para entrar na pasta raiz do projeto

npm install -> para instalar as dependências do projeto

criar um arquivo .env com as informações do seus banco de dados

npm run migrations -> para criar as tabelas no seu banco de dados

npm run dev -> para rodar o servidor
Instruções para preencher o arquivo dotenv:
```

criar um arquivo .env na pasta raiz com as seguintes variáveis:

```
    DB_HOST: ,
    DB_USER: ,
    DB_PASSWORD: ,
    DB_DATABASE: ,
```

Preencher as variáveis com as informações do seu banco de dados.

Ainda no .env, preencher também as variáveis:


    JWT_KEY: ,                  (palavra passe)
    BCRYPT_COST: ,              (cost da lib Bcrypt, geralmente 12)
    NODEMAILER_USER :,          (email do qual vai enviar a redefinição de senha)
    NODEMAILER_PASS :,          (senha do email acima)

