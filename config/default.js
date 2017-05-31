module.exports = {
  "DB": {
    "Type":"postgres",
    "User":"duo",
    "Password":"DuoS123",
    "Port":5432,
    "Host":"localhost",
    "Database":"dvpdb"
  },


  "Redis":
  {
    "ip": "45.55.142.207",
    "port": 6389,
    "user": "duo",
    "password": "DuoS123"

  },


  "Security":
  {
    "ip" : "45.55.142.207",
    "port": 6389,
    "user": "duo",
    "password": "DuoS123"
  },


  "Host":
  {
    "resource": "cluster",
    "vdomain": "127.0.0.1",
    "domain": "127.0.0.1",
    "port": "3636",
    "version": "1.0"
  },

  "LBServer" : {

    "ip": "127.0.0.1",
    "port": "3636"

  },


  "Mongo":
  {
      "ip":"104.236.231.11",
      "port":"27017",
      "dbname":"dvpdb",
      "password":"DuoS123",
      "user":"duo"
  },


  "RabbitMQ":
  {
    "ip": "45.55.142.207",
    "port": 5672,
    "user": "guest",
    "password": "guest"
  },

    "Services" : {
      "accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJkdW9kaWxhbmkiLCJqdGkiOiJkODhiYWNjMy1mMzllLTQzNGItODRmMi1kZTJiYjEwMDU5MTUiLCJzdWIiOiJBY2Nlc3MgY2xpZW50IiwiZXhwIjoxNDk2NzMxMjIyLCJ0ZW5hbnQiOjEsImNvbXBhbnkiOjEwMywiY29udGV4dCI6eyJyZXNvdXJjZWlkIjoiNTAiLCJ2ZWVyeWFjY291bnQiOnsidHlwZSI6InNpcCIsInZlcmlmaWVkIjp0cnVlLCJkaXNwbGF5IjoiOTUwMCIsImNvbnRhY3QiOiI5NTAwQGR1by5tZWRpYTEudmVlcnkuY2xvdWQifX0sInNjb3BlIjpbeyJyZXNvdXJjZSI6Im15TmF2aWdhdGlvbiIsImFjdGlvbnMiOlsicmVhZCJdfSx7InJlc291cmNlIjoibXlVc2VyUHJvZmlsZSIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJhcmRzcmVzb3VyY2UiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoibm90aWZpY2F0aW9uIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InNpcHVzZXIiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoiZXZlbnRzIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6ImV4dGVybmFsVXNlciIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJ1c2VyR3JvdXAiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoidXNlciIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJlbmdhZ2VtZW50IiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6ImluYm94IiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InRpY2tldCIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJ0YWciLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoidGltZXIiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoidGlja2V0dmlldyIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJmb3JtcyIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJyZXF1ZXN0bWV0YSIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJzeXNtb25pdG9yaW5nIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6ImZpbGVzZXJ2aWNlIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InByb2R1Y3Rpdml0eSIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJkYXNoYm9hcmRldmVudCIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJkYXNoYm9hcmRncmFwaCIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJzb2NpYWwiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoidG9kbyIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJyZW1pbmQiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoiaW50ZWdyYXRpb24iLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoiY29udGFjdCIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJleHRlbnNpb24iLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoiYnJlYWt0eXBlIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InF1YWxpdHlhc3N1cmFuY2UiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoidGlja2V0dHlwZXMiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoidGlja2V0c3RhdHVzZmxvdyIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJub3RpY2UiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoiRGlzcGF0Y2giLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoiZGlhbGVyIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InRlbXBsYXRlIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX1dLCJpYXQiOjE0OTYxMjY0MjJ9.gMJYdhsAXvxpr_lSX1vEUdBN7V4NiJHLBRSaywHPCgg",
      "resourceServiceHost": "resourceservice.104.131.67.21.xip.io",
      "resourceServicePort": "8831",
      "resourceServiceVersion": "1.0.0.0",

      "sipuserendpointserviceHost": "sipuserendpointservice.104.131.67.21.xip.io",
      "sipuserendpointservicePort": "8831",
      "sipuserendpointserviceVersion": "1.0.0.0",

      "clusterconfigserviceHost": "clusterconfig.104.131.67.21.xip.io",
      "clusterconfigservicePort": "8831",
      "clusterconfigserviceVersion": "1.0.0.0",

      "ardsServiceHost": "127.0.0.1",
      "ardsServicePort": "8828",
      "ardsServiceVersion": "1.0.0.0",

      "notificationServiceHost": "notificationservice.app.veery.cloud",
      "notificationServicePort": "8089",
      "notificationServiceVersion": "1.0.0.0",

      "cronurl": "scheduleworker.app.veery.cloud",
          //"scheduleworker.app.veery.cloud",
      "cronport": '8080',
      "cronversion":"1.0.0.0",

      "scheduleWorkerHost": "192.168.0.67",
      "scheduleWorkerPort": "8080",
      "scheduleWorkerVersion": "1.0.0.0"
    }



};
