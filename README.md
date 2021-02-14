# README #

### What is this repository for? ###

* Quick summary
    - This repository was created as a solution to the test sent by Fatura.
* Version
    - v1.0.0

### How do I get set up? ###

* Summary of set up
    - Clone the repository.
    - Navigate to the repository's directory.
    - `npm install`.
    - Create a new file and name it `.env`.
    - Add the following lines to it:

            SERVER_PORT={{Express server port}
            DATABASE_HOST={{Your database host eg: localhost}}
            DATABASE_NAME={{Your database name}}
            DATABASE_USERNAME={{Your database username}}
            DATABASE_PASSWORD={{Your database Password}}
            DATABASE_PORT={{Your database port}}
            RECORDS_PER_REQUEST={{Number of records returned in one request (used in junction with *page* in GET requests)}}
            
    - You can choose not to add `RECORDS_PER_REQUEST` env variable. In this case, a default value of *25* will be used.
    - `node server.js` to start the server.

### API Endpoints ###
* Mini Documentation
    - `GET /products?category_id=&page=` to list all products of a given category.
    - `PUT /products/:id/toggle_featured` to toggle featured product.
    - `GET /providers?page=` to list all providers.
    - `GET /categories?page=` to list all categories.

### Who do I talk to? ###

* a.gamal160@gmail.com