<h1 align="center">
    👨🏻‍🎥 IMDB api<br>
    <img  alt="IMDb api" src="https://github.com/AlvaroIsrael/teste-backend/blob/master/src/img/swagger-api.png"/>
</h1>

## 📌 Sobre esse projeto

- Este projeto foi parte de um desafio de programação aplicado pela empresa ioasys como parte de seu processo seletivo para um candidato a desenvolvedor backend.
- Esse repositório foi originalmente disponibilizado no [bitbucket](https://bitbucket.org/ioasys/teste-backend/src/master/) e em seguida clonado para o github porque é o sistema de versão que prefiro utilizar, não havia necessidade de Pull requests, e também porque não houve nenhuma restrição no README original quanto a isso.
- O arquivo README original contendo a descrição do desafio foi renomeado para CHALLENGE.md e encontra-se disponível na raíz desse projeto.
- Busquei atender todas as exigências do teste da melhor forma sendo que buscando maximizar meu tempo não fiquei preucupado com listar TODAS as possibilidades de falha de uma api considerando um cenário real de produção. Procurei focar mais nas regras de negócio solicitadas, na segurança da autenticação por JWT.
- Se um end point ele não foi solicitado de modo explicíto ele não foi criado. Exemplos: Edição e Exclusão dos filmes.
- Entendo que o que não foi explicitamente descrito no teste pode ser interpretado pelo cadidato. Diante disso assumi algumas coisas, como por exemplo: que os papéis dos usuários informados poderiam ser "admin" ou "default", não sendo necessário criar endpoints separados para criar, editar e desativar os usuários distintos. Foi necessário apenas diferenciar seus papéis (roles) durante a criação. Sendo isso descrito na documentação do swagger da aplicação.
- Apenas um arquivo de teste foi criado, e apenas para fins didáticos para contar como extra e para demonstar o básico do funcionamento de um teste com coverage. Como a aplicação requisitou migrations e conta com acesso a banco de dados o setup para testes unitários iria exigir um cuidado a mais que procurei evitar, já que os testes eram extras e não requisitos funcionais.
- Esse projeto foi documentado com swagger e a documentação pode ser acessada através do endpoint http://localhost:3333/api/v1/docs/, assumindo que a aplicação está rodando na porta 3333.
- OBS.: Não se esqueça de informar o token JWT utilizando o botão de Authorize do swagger caso pretenda testar os endpoints que necessitam de autenticacao.

## 🏆 Tecnologias utlizadas

- [Node](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [ExpressJs](https://expressjs.com/)
- [JestJs](https://jestjs.io/)
- [PostgreSql](https://www.postgresql.org/)

## 💻 Como rodar?

Após clonar projeto navegue até a pasta e baixe as dependências:

```
cd teste-backend
yarn install
```

Após isso o programa pode ser iniciado através do seguinte comando no terminal:

```
yarn dev:server
```

O comando acima é apenas um script do node, se quiser pode rodar o comando do script manualmente:

```
ts-node-dev --inspect --transpile-only --ignore-watch node_modules src/server.ts
```

OBS.: A aplicação está configurada para rodar por padrão em localhost:3333.
Se por algum motivo a porta 3333 não estiver disponível no seu sistema a execução irá falhar.

## 🛠 Como testar?

A aplicação utiliza o JestJs como biblioteca para testes com relatórios de cobertura.
Como já mencionado acima apenas 1 arquivo de teste com 2 testes foi criado. Eles podem ser excecutados através de:

```
yarn test
```

O comando acima é também é apenas um script do node, se quiser pode rodar o comando do script manualmente:

```
jest --coverage --watchAll=false
```

## 💎 Sobre o banco de dados

Esse projeto utilizou o postgresql como banco de dados. Para mais detalhes vide arquivo ormconfig.json. Lembrando que as migrations estão disponiveis dentro de src/database/migrations porém o banco "imdb" precisa ser criado manualmente no seu servidor de ambiente local antes de rodar as migrations.

Como criar um banco de dados no postgresql?

```
create database imdb;
```

Em seguida é necessário rodar as migrations para que as tabelas sejam criadas dentro do banco imdb:

```
yarn typeorm migration:run
```

Essee projeto nao depende de nenhum dado previamente cadastrado então não é necessário nenhum processo de seed. Lembre-se que você é o responsável pelo usuario e senha de acesso ao seu banco.

## 📝 Licença

Esse projeto está licenciado sob as condições do MIT. Veja [LICENSE](LICENSE.md) para mais detalhes.

Made with ❤️ by Alvaro Israel 👏🏻 [Get in touch!](https://www.linkedin.com/in/alvaroisraeldesenvolvedor/)
