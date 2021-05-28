/**
 * Created by Sukitha on 8/22/2016.
 */
var moment = require("moment");
var logger = require("dvp-common-lite/LogHandler/CommonLogHandler.js").logger;
var ToDo = require("dvp-mongomodels/model/ToDo").ToDo;
var User = require("dvp-mongomodels/model/UserAccount");
var messageFormatter = require("dvp-common-lite/CommonMessageGenerator/ClientMessageJsonFormatter.js");
var cronservice = require("../Workers/cron");
var config = require("config");
var notification = require("../Workers/notification");
var format = require("stringformat");
var validator = require("validator");

function CreateToDo(req, res) {
  logger.debug("DVP-ToDoListService.CreateToDo Internal method ");

  var company = parseInt(req.user.company);
  var tenant = parseInt(req.user.tenant);
  var time = new Date().toISOString();
  var due;
  var external_user;
  if (req.body.due_at) due = new Date(req.body.due_at).toISOString();
  var jsonString;

  if (req.body.external_user) {
    external_user = req.body.external_user;
  }
  console.log(`Params ${req.user.iss} ${company} ${tenant}`);
  User.findOne(
    { user: req.user.iss, company: company, tenant: tenant },
    function (err, user) {
      if (err) {
        jsonString = messageFormatter.FormatMessage(
          err,
          "Failed to load users",
          false,
          undefined
        );
        res.end(jsonString);
      } else {
        if (user) {
          var todo = ToDo({
            title: req.body.title,
            company: company,
            tenant: tenant,
            check: false,
            priority: req.body.priority,
            created_at: time,
            updated_at: time,
            note: req.body.note,
            due_at: due,
            owner: user.id,
            external_user: external_user,
          });

          todo.save(function (err, obj) {
            if (err) {
              jsonString = messageFormatter.FormatMessage(
                err,
                "Error in saving new Todo",
                false,
                undefined
              );
              res.end(jsonString);
            } else {
              if (due) {
                var mainServer = format(
                  "http://{0}/DVP/API/{1}/ToDo/{2}/Reminder",
                  config.LBServer.ip,
                  config.Host.version,
                  obj.id
                );

                if (
                  config.Services.dynamicPort ||
                  validator.isIP(config.LBServer.ip)
                )
                  mainServer = format(
                    "http://{0}:{1}/DVP/API/{2}/ToDo/{3}/Reminder",
                    config.LBServer.ip,
                    config.LBServer.port,
                    config.Host.version,
                    obj.id
                  );

                cronservice.RegisterCronJob(
                  company,
                  tenant,
                  due,
                  obj._id,
                  mainServer,
                  JSON.stringify({ iss: req.user.iss }),
                  function (isSuccess) {
                    if (isSuccess) {
                      jsonString = messageFormatter.FormatMessage(
                        undefined,
                        "ToDo and cron saved successfully",
                        true,
                        obj
                      );
                    } else {
                      jsonString = messageFormatter.FormatMessage(
                        undefined,
                        "ToDo saved but cron failed to save",
                        false,
                        obj
                      );
                    }
                    res.end(jsonString);
                  }
                );
              } else {
                jsonString = messageFormatter.FormatMessage(
                  undefined,
                  "To Do creation succeeded",
                  true,
                  obj
                );
                res.end(jsonString);
              }
            }
          });
        } else {
          jsonString = messageFormatter.FormatMessage(
            err,
            "Error in loading users",
            false,
            undefined
          );
          res.end(jsonString);
        }
      }
    }
  );
}

function RemindToDo(req, res) {
  logger.debug("DVP-ToDoListService.RemindToDo Internal method ");

  var company = parseInt(req.user.company);
  var tenant = parseInt(req.user.tenant);
  var jsonString;

  ToDo.findOne(
    { _id: req.params.id, check: false, company: company, tenant: tenant },
    function (err, obj) {
      if (err) {
        jsonString = messageFormatter.FormatMessage(
          err,
          "Searching Todo failed",
          false,
          undefined
        );
        res.end(jsonString);
      } else {
        console.log(obj);
        console.log(req.body);

        if (obj && req.body && req.body) {
          var cbdata = req.body;
          console.log(cbdata);

          if (cbdata && cbdata.iss) {
            jsonString = messageFormatter.FormatMessage(
              err,
              "Todo record found",
              true,
              obj
            );

            var msgObj = {
              title: obj.title,
              Message: obj.note,
            };

            if (obj.external_user) {
              msgObj.external_user = obj.external_user;
            }
            if (obj.due_at) {
              msgObj.due_at = new Date(obj.due_at).toISOString();
            }

            notification.InitiateNotification(
              obj.id,
              tenant,
              company,
              msgObj,
              cbdata.iss,
              function (issuccess) {
                if (issuccess) {
                  jsonString = messageFormatter.FormatMessage(
                    undefined,
                    "Notifications sent successfully",
                    true,
                    undefined
                  );
                } else {
                  jsonString = messageFormatter.FormatMessage(
                    undefined,
                    "Failed to send notifications",
                    false,
                    undefined
                  );
                }
                res.end(jsonString);
              }
            );
          } else {
            jsonString = messageFormatter.FormatMessage(
              undefined,
              "Invalid callback data found",
              false,
              undefined
            );
            res.end(jsonString);
          }
        } else {
          jsonString = messageFormatter.FormatMessage(
            undefined,
            "Invalid data provided",
            false,
            undefined
          );
          res.end(jsonString);
        }
      }
    }
  );
}

function GetToDoListActive(req, res) {
  logger.debug("DVP-ToDoListService.GetToDoList Internal method ");
  var company = parseInt(req.user.company);
  var tenant = parseInt(req.user.tenant);
  var jsonString;

  User.findOne(
    { user: req.user.iss, company: company, tenant: tenant },
    function (err, user) {
      if (err) {
        jsonString = messageFormatter.FormatMessage(
          err,
          "User found",
          false,
          undefined
        );
        res.end(jsonString);
      } else {
        if (user) {
          //check: false,
          ToDo.find(
            { owner: user.id, company: company, tenant: tenant },
            function (err, obj) {
              if (err) {
                jsonString = messageFormatter.FormatMessage(
                  err,
                  "Error in searching Todo List",
                  false,
                  undefined
                );
              } else {
                if (obj) {
                  jsonString = messageFormatter.FormatMessage(
                    err,
                    "Active Todo records found",
                    true,
                    obj
                  );
                } else {
                  jsonString = messageFormatter.FormatMessage(
                    undefined,
                    "No Active Todo records found ",
                    false,
                    undefined
                  );
                }
              }
              res.end(jsonString);
            }
          );
        } else {
          jsonString = messageFormatter.FormatMessage(
            undefined,
            "Error in searching user",
            false,
            undefined
          );
          res.end(jsonString);
        }
      }
    }
  );
}

function GetToDoActive(req, res) {
  logger.debug("DVP-ToDoListService.GetToDoList Internal method ");
  var company = parseInt(req.user.company);
  var tenant = parseInt(req.user.tenant);
  var jsonString;

  User.findOne(
    { user: req.user.iss, company: company, tenant: tenant },
    function (err, user) {
      if (err) {
        jsonString = messageFormatter.FormatMessage(
          err,
          "Get User Failed",
          false,
          undefined
        );
        res.end(jsonString);
      } else {
        if (user) {
          ToDo.findOne(
            {
              owner: user.id,
              _id: req.params.id,
              check: false,
              company: company,
              tenant: tenant,
            },
            function (err, obj) {
              if (err) {
                jsonString = messageFormatter.FormatMessage(
                  err,
                  "Error in searching Todo record",
                  false,
                  undefined
                );
              } else {
                if (obj) {
                  jsonString = messageFormatter.FormatMessage(
                    err,
                    "Todo records found",
                    true,
                    obj
                  );
                } else {
                  jsonString = messageFormatter.FormatMessage(
                    undefined,
                    "No ToDo entries Found",
                    false,
                    undefined
                  );
                }
              }
              res.end(jsonString);
            }
          );
        } else {
          jsonString = messageFormatter.FormatMessage(
            undefined,
            "No user found",
            false,
            undefined
          );
          res.end(jsonString);
        }
      }
    }
  );
}

function DeleteToDo(req, res) {
  logger.debug("DVP-ToDoListService.DeleteToDo Internal method ");
  var company = parseInt(req.user.company);
  var tenant = parseInt(req.user.tenant);
  var jsonString;

  User.findOne(
    { user: req.user.iss, company: company, tenant: tenant },
    function (err, user) {
      if (err) {
        jsonString = messageFormatter.FormatMessage(
          err,
          "Get User Failed",
          false,
          undefined
        );
        res.end(jsonString);
      } else {
        if (user) {
          ToDo.findOneAndRemove(
            {
              owner: user.id,
              _id: req.params.id,
              company: company,
              tenant: tenant,
            },
            function (err, obj) {
              if (err) {
                jsonString = messageFormatter.FormatMessage(
                  err,
                  "Delete ToDo Failed",
                  false,
                  undefined
                );
                res.end(jsonString);
              } else {
                if (obj) {
                  if (obj.due_at) {
                    var date = moment(obj.due_at);
                    var now = moment();

                    if (now < date) {
                      cronservice.DestroyCronJob(
                        company,
                        tenant,
                        req.params.id,
                        function (isSuccess) {
                          if (isSuccess) {
                            jsonString = messageFormatter.FormatMessage(
                              undefined,
                              "ToDo and cron delete successfully",
                              true,
                              obj
                            );
                          } else {
                            jsonString = messageFormatter.FormatMessage(
                              undefined,
                              "ToDo delete but cron failed",
                              false,
                              obj
                            );
                          }
                          res.end(jsonString);
                        }
                      );
                    } else {
                      jsonString = messageFormatter.FormatMessage(
                        undefined,
                        "Delete ToDo Successful",
                        true,
                        obj
                      );
                      res.end(jsonString);
                    }
                  } else {
                    jsonString = messageFormatter.FormatMessage(
                      undefined,
                      "Delete ToDo Successful",
                      true,
                      obj
                    );
                    res.end(jsonString);
                  }
                } else {
                  jsonString = messageFormatter.FormatMessage(
                    undefined,
                    "No ToDo Found",
                    false,
                    undefined
                  );
                  res.end(jsonString);
                }
              }
            }
          );
        } else {
          jsonString = messageFormatter.FormatMessage(
            undefined,
            "Get User Failed",
            false,
            undefined
          );
          res.end(jsonString);
        }
      }
    }
  );
}

function UpdateToDoCheck(req, res) {
  logger.debug("DVP-ToDoListService.UpdateToDoCheck Internal method ");
  var company = parseInt(req.user.company);
  var tenant = parseInt(req.user.tenant);
  var jsonString;

  User.findOne(
    { user: req.user.iss, company: company, tenant: tenant },
    function (err, user) {
      if (err) {
        jsonString = messageFormatter.FormatMessage(
          err,
          "Get User Failed",
          false,
          undefined
        );
        res.end(jsonString);
      } else {
        if (user) {
          ToDo.findOneAndUpdate(
            {
              _id: req.params.id,
              owner: user.id,
              company: company,
              tenant: tenant,
            },
            { check: true },
            function (err, obj) {
              if (err) {
                jsonString = messageFormatter.FormatMessage(
                  err,
                  "Update ToDo Failed",
                  false,
                  undefined
                );
                res.end(jsonString);
              } else {
                if (obj) {
                  jsonString = messageFormatter.FormatMessage(
                    err,
                    "Update ToDo Successful",
                    true,
                    obj
                  );

                  if (obj.due_at) {
                    var date = moment(obj.due_at);
                    var now = moment();

                    if (now < date) {
                      cronservice.DestroyCronJob(
                        company,
                        tenant,
                        req.params.id,
                        function (isSuccess) {
                          if (isSuccess) {
                            jsonString = messageFormatter.FormatMessage(
                              undefined,
                              "ToDo and cron checked successfully",
                              true,
                              obj
                            );
                          } else {
                            jsonString = messageFormatter.FormatMessage(
                              undefined,
                              "ToDo checked but cron failed",
                              false,
                              obj
                            );
                          }
                          res.end(jsonString);
                        }
                      );
                    } else {
                      jsonString = messageFormatter.FormatMessage(
                        undefined,
                        "Checked ToDo Successful due already passed ",
                        true,
                        obj
                      );
                      res.end(jsonString);
                    }
                  } else {
                    jsonString = messageFormatter.FormatMessage(
                      undefined,
                      "Checked ToDo Successful no due",
                      true,
                      obj
                    );
                    res.end(jsonString);
                  }
                } else {
                  jsonString = messageFormatter.FormatMessage(
                    undefined,
                    "No ToDo Found",
                    false,
                    undefined
                  );
                  res.end(jsonString);
                }
              }
            }
          );
        } else {
          jsonString = messageFormatter.FormatMessage(
            undefined,
            "Get User Failed",
            false,
            undefined
          );
          res.end(jsonString);
        }
      }
    }
  );
}

function UpdateToDoReminder(req, res) {
  logger.debug("DVP-ToDoListService.UpdateToDoCheck Internal method ");
  var company = parseInt(req.user.company);
  var tenant = parseInt(req.user.tenant);

  var due;
  if (req.body && req.body.due_at)
    due = new Date(req.body.due_at).toISOString();

  var jsonString;

  User.findOne(
    { user: req.user.iss, company: company, tenant: tenant },
    function (err, user) {
      if (err) {
        jsonString = messageFormatter.FormatMessage(
          err,
          "Error is searching Users",
          false,
          undefined
        );
        res.end(jsonString);
      } else {
        if (user && due) {
          ToDo.findOneAndUpdate(
            {
              _id: req.params.id,
              owner: user.id,
              company: company,
              tenant: tenant,
            },
            { due_at: due },
            { new: true },
            function (err, obj) {
              if (err) {
                jsonString = messageFormatter.FormatMessage(
                  err,
                  "Failed to update Note",
                  false,
                  undefined
                );
                res.end(jsonString);
              } else {
                if (obj) {
                  jsonString = messageFormatter.FormatMessage(
                    err,
                    "Note updated successfully",
                    true,
                    obj
                  );

                  if (obj.due_at) {
                    var date = moment(obj.due_at);
                    var now = moment();

                    if (now < date) {
                      var mainServer = format(
                        "http://{0}/DVP/API/{1}/ToDo/{2}/Reminder",
                        config.LBServer.ip,
                        config.Host.version,
                        obj.id
                      );

                      if (
                        config.Services.dynamicPort ||
                        validator.isIP(config.LBServer.ip)
                      )
                        mainServer = format(
                          "http://{0}:{1}/DVP/API/{2}/ToDo/{3}/Reminder",
                          config.LBServer.ip,
                          config.LBServer.port,
                          config.Host.version,
                          obj.id
                        );

                      cronservice.RegisterCronJob(
                        company,
                        tenant,
                        due,
                        req.params.id,
                        mainServer,
                        JSON.stringify({ iss: req.user.iss }),
                        function (isSuccess) {
                          if (isSuccess) {
                            jsonString = messageFormatter.FormatMessage(
                              undefined,
                              "Note and Schedule saved successfully",
                              true,
                              obj
                            );
                          } else {
                            jsonString = messageFormatter.FormatMessage(
                              undefined,
                              "Note saved but error in adding schedule",
                              false,
                              obj
                            );
                          }
                          res.end(jsonString);
                        }
                      );
                    } else {
                      jsonString = messageFormatter.FormatMessage(
                        undefined,
                        "Please insert a valid time ",
                        false,
                        obj
                      );
                      res.end(jsonString);
                    }
                  } else {
                    jsonString = messageFormatter.FormatMessage(
                      undefined,
                      "No time due record found",
                      true,
                      obj
                    );
                    res.end(jsonString);
                  }
                } else {
                  jsonString = messageFormatter.FormatMessage(
                    undefined,
                    "No note Found",
                    false,
                    undefined
                  );
                  res.end(jsonString);
                }
              }
            }
          );
        } else {
          jsonString = messageFormatter.FormatMessage(
            undefined,
            "Invalid due date found or Error in searching user ",
            false,
            undefined
          );
          res.end(jsonString);
        }
      }
    }
  );
}

function UpdateToDoNote(req, res) {
  logger.debug("DVP-ToDoListService.UpdateToDoCheck Internal method ");
  var company = parseInt(req.user.company);
  var tenant = parseInt(req.user.tenant);
  var jsonString;

  User.findOne(
    { user: req.user.iss, company: company, tenant: tenant },
    function (err, user) {
      if (err) {
        jsonString = messageFormatter.FormatMessage(
          err,
          "Get User Failed",
          false,
          undefined
        );
        res.end(jsonString);
      } else {
        if (user) {
          ToDo.findOneAndUpdate(
            {
              _id: req.params.id,
              owner: user.id,
              company: company,
              tenant: tenant,
            },
            { note: req.body.note },
            function (err, forms) {
              if (err) {
                jsonString = messageFormatter.FormatMessage(
                  err,
                  "Update ToDo Failed",
                  false,
                  undefined
                );
              } else {
                if (forms) {
                  jsonString = messageFormatter.FormatMessage(
                    err,
                    "Update ToDo Successful",
                    true,
                    forms
                  );
                } else {
                  jsonString = messageFormatter.FormatMessage(
                    undefined,
                    "No ToDo Found",
                    false,
                    undefined
                  );
                }
              }
              res.end(jsonString);
            }
          );
        } else {
          jsonString = messageFormatter.FormatMessage(
            undefined,
            "Get User Failed",
            false,
            undefined
          );
          res.end(jsonString);
        }
      }
    }
  );
}

function UpdateToDoSnooze(req, res) {
  logger.debug("DVP-ToDoListService.UpdateToDoSnooze Internal method ");
  var company = parseInt(req.user.company);
  var tenant = parseInt(req.user.tenant);
  var jsonString;

  User.findOne(
    { user: req.user.iss, company: company, tenant: tenant },
    function (err, user) {
      if (err) {
        jsonString = messageFormatter.FormatMessage(
          err,
          "Get User Failed",
          false,
          undefined
        );
        res.end(jsonString);
      } else {
        if (user) {
          var time = moment().add(req.params.time, "minutes");
          ToDo.findOneAndUpdate(
            {
              _id: req.params.id,
              owner: user.id,
              check: false,
              company: company,
              tenant: tenant,
            },
            { due_to: time },
            function (err, obj) {
              if (err) {
                jsonString = messageFormatter.FormatMessage(
                  err,
                  "Get ToDo entries Failed",
                  false,
                  undefined
                );
                res.end(jsonString);
              } else {
                if (obj && moment(obj.due_at) < time) {
                  jsonString = messageFormatter.FormatMessage(
                    err,
                    "Get ToDo entries Successful",
                    true,
                    obj
                  );
                  var mainServer = format(
                    "http://{0}/DVP/API/{1}/ToDo/{2}/Reminder",
                    config.LBServer.ip,
                    config.Host.version,
                    obj.id
                  );

                  if (
                    config.Services.dynamicPort ||
                    validator.isIP(config.LBServer.ip)
                  )
                    mainServer = format(
                      "http://{0}:{1}/DVP/API/{2}/ToDo/{3}/Reminder",
                      config.LBServer.ip,
                      config.LBServer.port,
                      config.Host.version,
                      obj.id
                    );

                  cronservice.RegisterCronJob(
                    company,
                    tenant,
                    time.toISOString(),
                    req.params.id,
                    mainServer,
                    JSON.stringify({ iss: req.user.iss }),
                    function (isSuccess) {
                      if (isSuccess) {
                        jsonString = messageFormatter.FormatMessage(
                          undefined,
                          "ToDo and cron saved successfully",
                          true,
                          obj
                        );
                      } else {
                        jsonString = messageFormatter.FormatMessage(
                          undefined,
                          "ToDo saved but cron failed",
                          false,
                          obj
                        );
                      }
                      res.end(jsonString);
                    }
                  );
                } else {
                  jsonString = messageFormatter.FormatMessage(
                    undefined,
                    "No ToDo entries Found",
                    false,
                    undefined
                  );
                  res.end(jsonString);
                }
              }
            }
          );
        } else {
          jsonString = messageFormatter.FormatMessage(
            undefined,
            "Get User Failed",
            false,
            undefined
          );
          res.end(jsonString);
        }
      }
    }
  );
}

function GetUserToDoList(req, res) {
  logger.debug("DVP-ToDoListService.GetUserToDoList Internal method ");
  var company = parseInt(req.user.company);
  var tenant = parseInt(req.user.tenant);
  var jsonString;

  if (req.params.id) {
    ToDo.find(
      { external_user: req.params.id, company: company, tenant: tenant },
      function (err, obj) {
        if (err) {
          jsonString = messageFormatter.FormatMessage(
            err,
            "Error in searching users's Todo List ",
            false,
            undefined
          );
        } else {
          if (obj) {
            jsonString = messageFormatter.FormatMessage(
              err,
              "User's Todo list found",
              true,
              obj
            );
          } else {
            jsonString = messageFormatter.FormatMessage(
              undefined,
              "No To do entries for user",
              false,
              undefined
            );
          }
        }
        res.end(jsonString);
      }
    );
  } else {
    jsonString = messageFormatter.FormatMessage(
      new Error("Invalid user details provided"),
      "Invalid user data provided",
      false,
      undefined
    );
    res.end(jsonString);
  }
  //check: false,
}

module.exports.CreateToDo = CreateToDo;
module.exports.GetToDoListActive = GetToDoListActive;
module.exports.GetToDoActive = GetToDoActive;
module.exports.DeleteToDo = DeleteToDo;
module.exports.UpdateToDoCheck = UpdateToDoCheck;
module.exports.UpdateToDoNote = UpdateToDoNote;
module.exports.UpdateToDoSnooze = UpdateToDoSnooze;
module.exports.RemindToDo = RemindToDo;
module.exports.UpdateToDoReminder = UpdateToDoReminder;
module.exports.GetUserToDoList = GetUserToDoList;
