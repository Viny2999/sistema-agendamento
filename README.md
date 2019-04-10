# Backend Assistant

A API encontra-se atualmente no [Heroku](https://backend-assistant.herokuapp.com)

## Executar a API localmente

Execute `npm i` e `npm start` para iniciar a API em `http://localhost:3000`.

## Endpoints

`GET /reservas` - Recebe um JSON contendo todas as reservas  
`GET /reservas/:id` - Recebe um JSON contendo uma reserva única  
`POST /reservas` - Criar uma nova reserva  
`PUT /reservas:id` - Atualizar uma reserva  
`DELETE /reservas` - Cancelar uma reserva

`POST /disponibilidade` - Checa disponibilidade de horario, caso não houver, retorna JSON contendo horários similares

## Testes

Há alguns testes criados.  
Execute `npm test` para iniciar os testes em `http://localhost:3000`.
