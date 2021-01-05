module.exports = {
  Redis: {
    mode: "SYS_REDIS_MODE",
    ip: "SYS_REDIS_HOST",
    port: "SYS_REDIS_PORT",
    user: "SYS_REDIS_USER",
    password: "SYS_REDIS_PASSWORD",
    redisDB: "SYS_REDIS_DB_CONFIG",
    sentinels: {
      hosts: "SYS_REDIS_SENTINEL_HOSTS",
      port: "SYS_REDIS_SENTINEL_PORT",
      name: "SYS_REDIS_SENTINEL_NAME",
    },
  },

  Security: {
    ip: "SYS_REDIS_HOST",
    port: "SYS_REDIS_PORT",
    user: "SYS_REDIS_USER",
    password: "SYS_REDIS_PASSWORD",
    mode: "SYS_REDIS_MODE",
    sentinels: {
      hosts: "SYS_REDIS_SENTINEL_HOSTS",
      port: "SYS_REDIS_SENTINEL_PORT",
      name: "SYS_REDIS_SENTINEL_NAME",
    },
  },
  RabbitMQ: {
    ip: "SYS_RABBITMQ_HOST",
    port: "SYS_RABBITMQ_PORT",
    user: "SYS_RABBITMQ_USER",
    password: "SYS_RABBITMQ_PASSWORD"
  },
    Mongo: {
    ip: "SYS_MONGO_HOST",
    port: "SYS_MONGO_PORT",
    dbname: "SYS_MONGO_DB",
    password: "SYS_MONGO_PASSWORD",
    user: "SYS_MONGO_USER",
    type: "SYS_MONGO_TYPE",
    replicaset: "SYS_MONGO_REPLICASETNAME",
  },

  Host: {
    vdomain: "LB_FRONTEND",
    domain: "HOST_NAME",
    port: "HOST_TODOLISTSERVICE_PORT",
    version: "HOST_VERSION",
  },

  LBServer: {
    ip: "LB_FRONTEND",
    port: "LB_PORT",
  },
  Services: {
    accessToken: "HOST_TOKEN",
    notificationServiceHost: "SYS_NOTIFICATIONSERVICE_HOST",
    notificationServicePort: "SYS_NOTIFICATIONSERVICE_PORT",
    notificationServiceVersion: "SYS_NOTIFICATIONSERVICE_VERSION",
    cronurl: "SYS_SCHEDULEWORKER_HOST",
    cronport: "SYS_SCHEDULEWORKER_PORT",
    cronversion: "SYS_SCHEDULEWORKER_VERSION",
    ScheduleWorkerHost:"SYS_SCHEDULEWORKER_HOST",
    ScheduleWorkerPort: "HOST_SCHEDULEWORKER_PORT",
    ScheduleWorkerVersion: "HOST_SCHEDULEWORKER_VERSION"
  },
};

//NODE_CONFIG_DIR
