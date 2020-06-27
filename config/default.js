module.exports = {
  DB: {
    Type: "postgres",
    User: "",
    Password: "",
    Port: 5432,
    Host: "",
    Database: "",
  },

  Redis: {
    mode: "instance", //instance, cluster, sentinel
    ip: "",
    port: 6389,
    user: "",
    password: "",
    redisDB: 8,
    sentinels: {
      hosts: "",
      port: 16389,
      name: "redis-cluster",
    },
  },

  Security: {
    ip: "",
    port: 6389,
    user: "",
    password: "",
    mode: "instance", //instance, cluster, sentinel
    sentinels: {
      hosts: "",
      port: 16389,
      name: "redis-cluster",
    },
  },

  Host: {
    resource: "cluster",
    vdomain: "127.0.0.1",
    domain: "127.0.0.1",
    port: "3636",
    version: "1.0",
  },

  LBServer: {
    ip: "127.0.0.1",
    port: "3636",
  },

  Mongo: {
    ip: "",
    port: "27017",
    dbname: "",
    password: "",
    user: "",
    type: "mongodb+srv",
  },

  RabbitMQ: {
    ip: "",
    port: 5672,
    user: "",
    password: "",
  },

  Services: {
    accessToken: "",
    resourceServiceHost: "",
    resourceServicePort: "8831",
    resourceServiceVersion: "1.0.0.0",

    sipuserendpointserviceHost: "",
    sipuserendpointservicePort: "8831",
    sipuserendpointserviceVersion: "1.0.0.0",

    clusterconfigserviceHost: "",
    clusterconfigservicePort: "8831",
    clusterconfigserviceVersion: "1.0.0.0",

    ardsServiceHost: "127.0.0.1",
    ardsServicePort: "8828",
    ardsServiceVersion: "1.0.0.0",

    notificationServiceHost: "127.0.0.1",
    notificationServicePort: "8089",
    notificationServiceVersion: "1.0.0.0",

    cronurl: "127.0.0.1:8080",

    cronport: "8080",
    cronversion: "1.0.0.0",

    scheduleWorkerHost: "",
    scheduleWorkerPort: "8080",
    scheduleWorkerVersion: "1.0.0.0",
  },
};
