# Order API Spec

## Create Order API

Endpoint : POST /orders

Headers :

- Authorization : Token

Request Body :

```json
{
  "addressId": 1
}
```

Response Body Success :

```json
{
  "data": {
    "id": 5,
    "status": "PROCESS",
    "createdAt": "2024-01-21T18:18:17.033Z",
    "completedAt": null,
    "totalAmount": 460000,
    "addressId": 9,
    "cartId": 1
  }
}
```

Response body Error :

```json
{
  "errors": "name is not valid"
}
```

## Update order Spec

Endpoint : PATCH /orders/:orderId

Headers :

- Authorization : Token

Request Body Success :

```json
{
  "status": "SHIPPED"
}
```

Response Body :

```json
{
  "data": {
    "id": 5,
    "status": "PROCESS",
    "createdAt": "2024-01-21T18:18:17.033Z",
    "completedAt": null,
    "totalAmount": 460000,
    "addressId": 9,
    "cartId": 1
  }
}
```

Response body Error :

```json
{
  "errors": "price be as number"
}
```

## Get Order API

Endpoint : GET /orders/:orderId

Response Body Success :

```json
{
  "data": {
    "id": 5,
    "status": "PROCESS",
    "createdAt": "2024-01-21T18:18:17.033Z",
    "completedAt": null,
    "totalAmount": 460000,
    "addressId": 9,
    "cartId": 1
  }
}
```

Response body Error :

```json
{
  "errors": "order is not found"
}
```

## List order API

Endpoint : GET /orders

Headers :

- Authorization : Token

Response Body Success :

```json
{
  "data": [
    {
      "id": 5,
      "status": "PROCESS",
      "createdAt": "2024-01-21T18:18:17.033Z",
      "completedAt": null,
      "totalAmount": 460000,
      "addressId": 9,
      "cartId": 1
    },
    {
      "id": 5,
      "status": "PROCESS",
      "createdAt": "2024-01-21T18:18:17.033Z",
      "completedAt": null,
      "totalAmount": 460000,
      "addressId": 9,
      "cartId": 1
    }
  ]
}
```

Response body Error :

```json
{
  "errors": "product is not found"
}
```

## Remove order API

Endpoint : DELETE /orders/:orderId

Headers :

- Authorization : Token

Response Body Success :

```json
{
  "data": "success"
}
```

Response body Error :

```json
{
  "errors": "order is not found"
}
```
