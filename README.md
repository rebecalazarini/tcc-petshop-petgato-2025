# tcc 
## Tecnologias
- IDE (VsCode)
- JavaScript
- Prisma 
- Mysql
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
- Users
```bash
 http://localhost:3000/u
 exemplo:
{
  "email": "teste@exemplo.com",
  "senha": "123456"
}
```

- Cadastro do Pet
```bash
 http://localhost:3000/c
 exemplo:
{
		"id": 1,
		"nomepet": "Rex",
		"especie": "cachorro",
		"raca": "Labrador",
		"nomeproprietario": "João Silva",
		"datanascpet": "2022-04-25T00:00:00.000Z",
		"email": "joao.silva@example.com",
		"alergia": "Nenhuma"
	}
```


## Sprint inicial
- Metodologia: KANBAN
- Papéis e responsabilidades: Rebeca Lazarini: Front-end, Larissa Santos: Back-end, Evelyn Fernandes: Banco de dados, Larissa Rocha: Teste e Crislaine Leopoldo: Documentação
- O objetivo do nosso site de pet shop é oferecer uma experiência online de fácil acesso e navegação, com uma interface intuitiva e dinâmica. As telas serão funcionais e bem organizadas, permitindo que os clientes encontrem rapidamente os produtos e serviços que procuram, além de possibilitar um processo de compra simples e eficiente.



## Gráfico gant
 [Gráfico aqui](https://wellifabio.github.io/gantt/) anual (260 dias)
