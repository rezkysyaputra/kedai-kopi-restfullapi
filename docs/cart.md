# Cart API Spec

## Create cart API

Endpoint : POST /products/:productId/carts

Headers :

- Authorization : Token

Request Body :

```json
{
  "productId": 1,
  "quantity": 4
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "name": "Ice coffee",
    "price": 10000,
    "stock": 10,
    "quantity": 4
  }
}
```

Response body Error :

```json
{
  "errors": "quantity is must the number"
}
```

## Update Cart Spec

Endpoint : PATCH /carts

Headers :

- Authorization : Token

Request Body Success :

```json
{
  "cartItemId": 1,
  "quantity": 4
}
```

Response Body :

```json
{
  "data": {
    "id": 1,
    "name": "Ice coffee",
    "price": 10000,
    "stock": 10,
    "quantity": 4
  }
}
```

Response body Error :

```json
{
  "errors": "price be must as number"
}
```

## List cart API

Endpoint : GET /carts

Headers :

- Authorization : Token

Response Body Success :

```json
{
  "data": {
    "products": [
      {
        "id": 4,
        "name": "Ice Coffe",
        "price": 10000,
        "totalPrice": 230000,
        "quantity": 23
      },
      {
        "id": 5,
        "name": "Coffe Lattte",
        "price": 12000,
        "totalPrice": 48000,
        "quantity": 4
      }
    ],
    "totalAmount": 278000
  }
}
```

Response body Error :

```json
{
  "errors": "cart item is not found"
}
```

## Remove cart API

Endpoint : DELETE /carts

Headers :

- Authorization : Token

Request Body :

```json
{
  "cartItemId": 1
}
```

Response Body Success :

```json
{
  "data": "success"
}
```

Response body Error :

```json
{
  "errors": "cart item is not found"
}
```
