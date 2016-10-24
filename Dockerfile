#FROM ubuntu
#RUN apt-get update
#RUN apt-get install -y git nodejs npm nodejs-legacy
#RUN git clone git://github.com/DuoSoftware/DVP-ToDoListService.git /usr/local/src/todolistservice
#RUN cd /usr/local/src/todolistservice; npm install
#CMD ["nodejs", "/usr/local/src/todolistservice/app.js"]

##EXPOSE 8872

FROM node:5.10.0
RUN git clone git://github.com/DuoSoftware/DVP-ToDoListService.git /usr/local/src/todolistservice
RUN cd /usr/local/src/todolistservice;
WORKDIR /usr/local/src/todolistservice
RUN npm install
EXPOSE 8879
CMD [ "node", "/usr/local/src/todolistservice/app.js" ]