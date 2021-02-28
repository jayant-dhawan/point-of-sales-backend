# Backend for Point of Sales Assignment

This is an Assignment for Codinova Job Interview Process.


## Endpoints:

For routes which require authentication send jwt token in header like below 
{
    headers: {
        Authorization: `Bearer ${jwt}`
}

For routes ehich require a user role, roles are mentioned.

### Registration:

`POST /register`

Example request body:
```JSON
{
  "name": "Jacob",
  "email": "jake@jake.jake",
  "password": "jakejake"
}
```

No authentication required

Required fields: `email`, `name`, `password

### Login

`POST /login`

Example request body:
```JSON
{
  "email": "jake@jake.jake",
  "password": "jakejake"
}
```

No authentication required

Required fields: `email`, `password`

### Add Product

`POST /product`

Example request body:
```JSON
{
    "productName": "Monitor",
    "category": "computer",
    "price": "5000",
    "available": "500",
    "vat": "15",
    "discount": "10"
}
```
Authentication required

Role Required: `admin`

Required fields: `productName`, `category`, `price`, `available`, `vat`

### Get Product

`GET /product`

Example request body:
```JSON
{}
```
Authentication required

Required fields: ``

### Update Product

`PUT /product`

Example request body:
```JSON
{   
    "_id": "603a362ca31b9d061cce4b98",
    "productName": "Sweater",
    "category": "clothing",
    "price": "350",
    "available": "1000",
    "vat": "15",
    "discount": "10"
}
```
Authentication required

Role Required: `admin`

Required fields: `_id`

### Delete Product

`Delete /product?id=${id}`

Example request body:
```JSON
{}
```
Authentication required

Role Required: `admin`

Required fields: `id`

### Create Sale

`POST /sale`

Example request body:
```JSON
{
    "employeeId": "6039595fce03fc130861385f",
    "dateOfSale": "1614432981038",
    "products": [
        {
            "productName": "Sweater",
            "productId": "603a362ca31b9d061cce4b98",
            "price": 350,
            "discount": 10,
            "count": "2"
        }
    ],
    "totalDiscount": "35",
    "vat": "105",
    "total": "770"
}
```
Authentication required

Required fields: `employeeId`, `dateOfSale`, `products`, `totalDiscount`, `vat`, `total`


## Configuration

### Sample .env file to configure API

```
#Server Port
PORT = 8000

#MongoDB Database URL
DBURL = mongodb://localhost:27017/pos

#JWT Secret to verify JWT tokens
JWT_SECRET = YOUR_SECRET
```

