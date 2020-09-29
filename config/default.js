module.exports = {
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
    port: "8879",
    version: "1.0",
  },

  LBServer: {
    ip: "127.0.0.1",
    port: "3636",
  },

  Mongo: {
    ip: "",
    port: "",
    dbname: "",
    password: "",
    user: "",
    type: "mongodb",
  },

  RabbitMQ: {
    ip: "",
    port: 5672,
    user: "",
    password: "",
  },

  Services: {
    accessToken: "",

    cronurl: "127.0.0.1:8080",
    cronport: "8080",
    cronversion: "1.0.0.0",

    scheduleWorkerHost: "",
    scheduleWorkerPort: "8080",
    scheduleWorkerVersion: "1.0.0.0",
  },
};
