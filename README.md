# VUE_Restaurants
The project need to be run in two differents shell, one for the client and one for the server.

# Client
```
cd Client
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


# Server
```
cd Server
```

## Project setup
Install mongoDB, you can refer to this link: [official website](https://docs.mongodb.org/manual/installation/).
Then download this file: [primer-dataset.json](https://raw.githubusercontent.com/mongodb/docs-assets/primer-dataset/primer-dataset.json).
Now create a data base with the json file:
```
mongoimport --db test --collection restaurants --drop --file primer-dataset.json
```
Go to the server path and install all npm depedency:
```
cd server
npm install
```

## Run the server
```
npm run dev-server
```
