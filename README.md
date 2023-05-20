## Sobre o projeto

Projeto criado para um desafio proposto no processo seletivo de uma empresa, onde consistia na criação de uma API Restful NestJS e banco de dados MongoDB para fazer downloads de imagens de uma url pública e salva-la no sistema e gerar uma versão reduzida, se necessário, de acordo com o tamanho da imagem. Além disso salvar também todos os metadados contidos no exif da imagem original.

## Instalação

Execute o comando abaxio para instalar todas as dependências do projeto.

```bash
$ npm install
```

## Iniciando o projeto

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Banco de dados

Utilizei o banco de dados mongodb localhost na porta 27017

```bash
# url
mongodb://localhost:27017
```

## Baixando a imagem

Para baixar a imagem pode ser utilizado um API client como o Imsomnia ou o Postman com o localhost na porta 3000 para /image/save.
Aqui está um exemplo de como deve ser a url no Postman ou Imsmonia:

```bash
# URL
http://localhost:3000/image/save
```

Aqui está um exemplo de como deve ser o objeto JSON:

```bash
# JSON
{
    "image": "https://assets.storage.trakto.io/AkpvCuxXGMf3npYXajyEZ8A2APn2/0e406885-9d03-4c72-bd92-c6411fbe5c49.jpeg",
    "compress": 0.9
}
```
## Imagens salvas
As imagens serão salvas em uma pasta com o nome Downloadedimages, tanto a original quanto a _thumb.



