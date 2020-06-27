/**
 * Created by Sukitha on 8/23/2016.
 */

var request = require("request");
var format = require("stringformat");
var validator = require("validator");
var config = require("config");
var logger = require("dvp-common-lite/LogHandler/CommonLogHandler.js").logger;

function InitiateNotification(id, tenant, company, message, iss, cb) {
  if (
    config.Services &&
    config.Services.notificationServiceHost &&
    config.Services.notificationServicePort &&
    config.Services.notificationServiceVersion
  ) {
    var nData = {
      From: "Appointment Reminder",
      To: iss,
      Message: message,
      Direction: "STATELESS",
      CallbackURL: "",
      Ref: "",
      isPersist: true,
    };

    var notificationURL = format(
      "http://{0}/DVP/API/{1}/NotificationService/Notification/initiate",
      config.Services.notificationServiceHost,
      config.Services.notificationServiceVersion
    );
    if (
      config.Services.dynamicPort ||
      validator.isIP(config.Services.notificationServiceHost)
    )
      notificationURL = format(
        "http://{0}:{1}/DVP/API/{2}/NotificationService/Notification/initiate",
        config.Services.notificationServiceHost,
        config.Services.notificationServicePort,
        config.Services.notificationServiceVersion
      );

    logger.debug("Calling cron registration service URL %s", notificationURL);
    request(
      {
        method: "POST",
        url: notificationURL,
        headers: {
          eventname: "todo_reminder",
          eventuuid: id,
          authorization: "bearer " + config.Services.accessToken,
          companyinfo: format("{0}:{1}", tenant, company),
        },
        json: nData,
      },
      function (_error, _response, datax) {
        try {
          if (!_error && _response && _response.statusCode == 200) {
            return cb(true, _response.body);
          } else {
            logger.error("There is an error in  cron registration for this");
            return cb(false, {});
          }
        } catch (excep) {
          return cb(false, {});
        }
      }
    );
  }
}

module.exports.InitiateNotification = InitiateNotification;
