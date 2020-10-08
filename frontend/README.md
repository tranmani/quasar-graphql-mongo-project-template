# Frontend using Quasar Framework with Apollo client

server.js file is for Heroku deployment

## Install the dependencies
```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).


# Example GraphQL calls

## Simple Querry

```js
const ALL_XML = gql`
  {
    allXML {
      name
      xmin
      ymin
      xmax
      ymax
    }
  }
`;

data() {
  return {
    data: [],
  };
},

this.$apollo
  .query({
    query: ALL_XML,
  })
  .then((data) => {
    data.data.allXML.forEach((element) => {
      this.data.push(element);
    });
  });
```

## Simple Subscription (Websocket)

```js
const REAL_TIME_XML = gql`
  subscription {
    newXML {
      name
      xmin
      ymin
      xmax
      ymax
    }
  }
`;

data() {
  return {
    data: [],
  };
},

apollo: {
  $subscribe: {
    data: {
      query: REAL_TIME_XML,
      result({ data }) {
        this.data.push(data.newXML);
      },
    },
  },
},
```
OR
```js
const this_ = this;
this.$apollo
  .subscribe({
    query: REAL_TIME_XML,
  })
  .subscribe({
    next(data) {
      this_.data.push(data.data.newXML);
    },
    error(err) {
      console.error("err", err);
    },
  });
```

## Simple Subscription To More (Websocket)

```js
const ALL_XML = gql`
  {
    allXML {
      name
      xmin
      ymin
      xmax
      ymax
    }
  }
`;

const REAL_TIME_XML = gql`
  subscription {
    newXML {
      name
      xmin
      ymin
      xmax
      ymax
    }
  }
`;

data() {
  return {
    data: [],
  };
},

apollo: {
  data: {
    query: ALL_XML,
    update(data) {
      return data.allXML;
    },
    subscribeToMore: {
      document: REAL_TIME_XML,
      updateQuery: (previousResult, { subscriptionData }) => {
        if (previousResult) {
          return {
            data: previousResult.allXML.push(subscriptionData.data.newXML),
          };
        }
      },
    },
  },
},
```