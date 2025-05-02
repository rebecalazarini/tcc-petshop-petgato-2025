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
- Crie o arquivo . env na raiz do projeto com a seguintes variaveis de a,mbiente:
````bash
EMAIL_USER=seu-email@gmail.com
EMAIL_PASS=sua-senha
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_NAME=cadastro

DATABASE_URL="mysql://root@localhost:3306/cadastro"
````
- Instale as dependencias nessa ordem
```bash
npm i
npx prisma migrate dev --name init
npx nodemon server.js

```

## Teste no insomnia 
- http://localhost:3000/u
- exemplo:
{
  "email": "teste@exemplo.com",
  "senha": "123456"
}

