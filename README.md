# tcc 

## Como executar
- Clone este repositório
- Abra com VsCode
- - Abra o terminal ctrl + '
- Execute esse comando
```bash
cd back-end
cd api
```
- Instale as dependencias nessa ordem
```bash
npm init -y
npm i express cors mysql 
npm install dotenv
npm install body-parser
npm install --save-dev nodemon
npm install bcrypt
npm install express-validator
npm install @prisma/client
npx prisma generate
npx prisma init --datasource-provider mysql
npx prisma migrate dev --name init
npx nodemon server.js

```

## Teste no insomnia 
- http://localhost:3000/cadastrar
- exemplo:
{
  "email": "teste@exemplo.com",
  "senha": "123456"
}

