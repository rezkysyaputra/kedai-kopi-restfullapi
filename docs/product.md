# Product API Spec

## List Product API

Endpoint : GET /products

Response body success :

```json
{
  "data": [
    {
      "id": 1,
      "name": "Ice coffee",
      "price": 10000,
      "stock": 10
    },
    {
      "id": 2,
      "name": "Coffee milk",
      "price": 15000,
      "stock": 19
    }
  ],
  "paging": {
    "page": 1,
    "totalPage": 3,
    "totalItem": 30
  }
}
```

Response body Error :

```json
{
  "errors": "product is not found"
}
```

## Get Product API

Endpoint : GET /products/:productId

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "name": "Ice coffee",
    "price": 10000,
    "stock": 10
  }
}
```

Response body Error :

```json
{
  "errors": "product is not found"
}
```
