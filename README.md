## Decripcion

Aplicacion para registrar restaurantes, estos pueden tener comidas y comentarios.

Se puede registrar y logear usuarios, estos usuarios pueden generar ordenes (comidas), y comentarios sobre los restaurantes.

## Funciones o datos del proyecto

/api/v1/users

- POST "/signup" Crear usuario (enviar username, email, y password por req.body)
- POST "/login" Iniciar sesión (enviar email y password por req.body)
- PATCH "/:id" Actualizar perfil de usuario (name y email)
- DELETE "/:id" Deshabilitar cuenta de usuario
- GET "/orders" Obtener todas las ordenes hechas por el usuario
- GET "/orders/:id" Obtener detalles de una sola orden dado un ID

/api/v1/restaurants

- POST "/" Crear un nuevo restaurant (enviar name, address, rating (INT) por req.body)
- GET "/" Obtener todos los restaurants activos
- GET "/:id" Obtener restaurant por id
- PATCH "/:id" Actualizar restaurant (name, address)
- DELETE "/:id" Deshabilitar restaurant.
- POST "/reviews/:restaurantId" Crear una nueva reseña en el restaurant, siendo :restaurantId el id del restaurant (enviar comment, rating (INT) en req.body)
- PATCH "/reviews/:id" Actualizar una reseña hecha en un restaurant, siendo :id el id de la reseña (comment, rating)
- DELETE "/reviews/:id" Actualizar una reseña hecha en un restaurant a status deleted, siendo :id el id de la reseña.

/api/v1/meals

- POST "/:id" Crear una nueva comida en el restaurant, siendo :id el id del restaurant (enviar name, price (INT) en req.body)
- GET "/" Obtener todas las comidas activas
- GET "/:id" Obtener por id una comida activas
- PATCH "/:id" Actualizar comida (name, price)
- DELETE "/:id" Deshabilitar comida

/api/v1/orders

- POST "/" Crear una nueva orden (enviar quantity y mealId por req.body)
- GET "/me" Obtener todas las ordenes del usuario
- PATCH "/:id" Marcar una orden con status completed
- DELETE "/:id" Marcar una orden con status cancelled

## Lenguajes o Herramientas

- Express-validator
- MongoDB
- Mongoose
- Bcryptjs
- Express
- Postman
- Dotenv
- NodeJs
- JWT

## Autor

** Diego Nieves **

- [LinkedIn](https://www.linkedin.com/in/diego-nieves-04b409242/)
- [Portafolio web](https://nvs-dlc.netlify.app)

## Contratación

Si quieres contratarme puedes escribirme a nieves.diego0426@gmail.com 👍.
