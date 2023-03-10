# Restricted CPF API

## Descrição

O projeto Restricted CPF API surgiu da necessidade do time de análise de antifraude do e-commerce de armazenar os CPFs em uma lista restrita.
Para isso essa API foi criada, nela é possível adicionar e deletar um CPF na lista de restritos, visualizar cada cpf de maneira independente e também listar todos os CPFs da lista.
Para realizar alterações de adição e remoção de CPF, é necessário que um usuário autorizado esteja logado, como por exemplo o Product Owner.

<br>

# Instalação e comandos

<br>

## Dependencias

-   Rode o comando `npm install` na raiz do projeto

<br>

## Docker

Para rodar com o docker, basta definir as variáveis de ambiente e as portas de acordo com a escolha do usuário dentro do docker-compose e digitar o comando `docker-compose up -d` no terminal.

-   Lembre-se de parar o `mysql` se estiver usando localmente na porta padrão (`3306`), ou adapte, caso queria fazer uso da aplicação em containers
-   Para parar o mysql digite: `systemctl stop mysql`

-   Esses serviços irão inicializar um container chamado `Restricted_CPF_API` e outro chamado `Restricted_CPF_API_db`.

Use o comando `docker exec -it Restricted_CPF_API bash`.

-   Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.

-   Dentro do container rode os comandos abaixo de acordo com a sua necessidade.

<br>

# Comandos

Comando para rodar a API

-   `npm run db:init`

Para que a aplicação funcione corretamente, é essencial que rode esse comando. Com esse comando a DB é dropada, reinicializada e alimentada de acordo com as migrations e seeds que estão em src/database. Na seed contém o dado de um usuario 'root', que vai dar permissão para execução de todos os endpoint.

-   `npm start`

Com esse comando a DB é criada e alimentada de acordo com as migrations e seeds que estão em src/database. Na seed contém o dado de um usuario 'root', que vai dar permissão para execução de todos os endpoint.

-   `npm run db:reset`

Com esse comando o servidor é iniciado com o nodemon, que é uma ferramenta que permite que seja feito alterações em tempo real, sem a necessidade de resetar a API para checar as mudanças.

-   `npm run dev`

Para compilar a aplicação

-   `npm run build`

<br>

# Testes

Essa aplicação conta com testes unitarios automatizados para verificar o funcionamento da das camadas..

Para rodar os testes dos arquivos, basta executar o comando

-   `npm run test`

Para ver a cobertura de testes em relação ao código execute.

-   `npm run test:coverage`

<br>

# Bibliotecas.

## SwagerUI

Para facilitar o entendimento do funcionamento de todos os endpoints e a dinâmica entre eles, essa API conta com um painel do SwagerUI, que demonstra cada endpoint e expõe a sua funcionalidade.

<a href="https://swagger.io/">Swagger</a>

Endpoints:

-   POST: /user
-   POST: /login
-   POST: /cpf
-   GET: /cpf
-   GET: /cpf/{cpf}
-   DELETE: /cpf/{CPF}

Para ter acesso a descrição detalhada de cada um, após rodar o projeto acesse:
<br>

### localhost+`PORTA`+/documentation/.

Por padrão o projeto esta rodando na porta 3000.

### http://localhost:3000/documentation/

 <br>

## CPF Check

Para validar os CPF que são inseridos, foi usado a biblioteca CPF Check, que gera, valida e formata o CPF, nessa aplicação foi usada apenas a função de validação.

<a href="https://www.npmjs.com/package/cpf-check">cpf-check</a>

## JsonWebToken

Para fazer a validação de login dos usuários que têm autorização foi utilizado a biblioteca JWT, que retorna um token de acordo o login que é realizado.

<a href="https://www.npmjs.com/package/jsonwebtoken">JWT</a>

## BCRYPT

Para fazer a criptografia das senhas, foi usado a biblioteca node.bcrypt.js, que faz a codificação da senha de entrada e o modo reverso no middleware de verificação de login.

<a href="https://www.npmjs.com/package/bcrypt">bcrypt</a>
