# Coodesh Frontend Challenge 🏅 2022 - Covid Daily Cases

Site: https://coodesh.com/

## Desafio proposto

Nesse desafio era necessário desenvolver em 5 dias uma REST API que utilizaria o histórico de casos de Covid, disponível em https://www.kaggle.com/datasets/yamqwe/omicron-covid19-variant-daily-cases.
No desafio também foi proposto desenvolver um projeto front-end para consumir as informações uma API gerada.
O projeto a ser desenvolvido tem como objetivo exibir o número de casos por país, dia e variante. Para isso será necessário gerar um gráfico que mostre o mapa mundi.

### Frameworks e tecnologias usadas:
- HTML, CSS E JAVASCRIPT
- React JS
- Material UI


### Veja o projeto funcionando em:




### Imagem do layout final do projeto:

![aparencia final do projeto](src/assets/img/Example.png)


### Como configurar e utilizar o projeto em 4 passos:

##### 1- Clonar o repositório

##### 2 - Instalar as dependencias usando NPM ou Yarn:

- npm install

## ATENÇÃO!
### Por questões de performance, por default default o projeto vai configurado para consumir os dados através de um servidor local, por isso será necessário subir o servidor JSONSERVER através do comando abaixo:

#### 3- json-server --watch db.json --port 5000

A porta utilizada tem que ser especificada para não conflitar com a porta usada para subir a aplicação React. Nesse caso a escolhida foi a 5000.

#### OBS* O projeto também já vem pronto para usar a database fornecida Online pela Supabase. Basta mundar as rotas internas no arquivo URL.js.

##### 4 - Iniciar o projeto
  - npm start

