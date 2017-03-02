/**
 * Created by Sukitha on 8/23/2016.
 */

var request = require("request");
var format = require("stringformat");
var validator = require('validator');
var config = require('config');
var logger = require('dvp-common/LogHandler/CommonLogHandler.js').logger;


function RegisterCronJob(company, tenant, date, id, cburl, cbdata, cb){

    if((config.Services && config.Services.cronurl && config.Services.cronport && config.Services.cronversion)) {


        var cronURL = format("http://{0}/DVP/API/{1}/Cron", config.Services.cronurl, config.Services.cronversion);
        if (validator.isIP(config.Services.cronurl))
            cronURL = format("http://{0}:{1}/DVP/API/{2}/Cron", config.Services.cronurl, config.Services.cronport, config.Services.cronversion);

        var cronData =  {

            Reference: id,
            Description: "ToDo Reminder",
            CronePattern: date,
            CallbackURL: cburl,
            CallbackData: cbdata

        };

        logger.debug("Calling cron registration service URL %s", cronURL);
        request({
            method: "POST",
            url: cronURL,
            headers: {
                authorization: "bearer "+config.Services.accessToken,
                companyinfo: format("{0}:{1}", tenant, company)
            },
            json: cronData
        }, function (_error, _response, datax) {

            try {

                if (!_error && _response && _response.statusCode == 200&& _response.body && _response.body.IsSuccess) {

                    return cb(true,_response.body.Result);

                }else{

                    logger.error("There is an error in  cron registration for this");
                    return cb(false,{});


                }
            }
            catch (excep) {

                return cb(false,{});

            }
        });
    }

}

function DestroyCronJob(company, tenant, id, cb){

    if((config.Services && config.Services.cronurl && config.Services.cronport && config.Services.cronversion)) {


        var cronURL = format("http://{0}/DVP/API/{1}/Cron/Reference/{2}/Action/{3}", config.Services.cronurl, config.Services.cronversion,id,"destroy");
        if (validator.isIP(config.Services.cronurl))
            cronURL = format("http://{0}:{1}/DVP/API/{2}/Cron/Reference/{3}/Action/{4}", config.Services.cronurl, config.Services.cronport, config.Services.cronversion,id,"destroy");


        logger.debug("Calling cron destroy service URL %s", cronURL);
        request({
            method: "POST",
            url: cronURL,
            headers: {
                authorization: "bearer "+config.Services.accessToken,
                companyinfo: format("{0}:{1}", tenant, company)
            },
            json: {}

        }, function (_error, _response, datax) {

            try {

                if (!_error && _response && _response.statusCode == 200&& _response.body && _response.body.IsSuccess) {

                    return cb(true,_response.body.Result);

                }else{

                    logger.error("There is an error in  cron destroy for this");
                    return cb(false,{});
                }
            }
            catch (excep) {

                return cb(false,{});

            }
        });
    }

}

module.exports.RegisterCronJob = RegisterCronJob;
module.exports.DestroyCronJob = DestroyCronJob;