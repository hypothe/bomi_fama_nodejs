FROM node:17
ENV HOME=/root
ENV WS=${HOME}/project
EXPOSE 4242

WORKDIR ${HOME}
COPY . ${WS}

WORKDIR ${WS}
RUN npm install

ENTRYPOINT [ "npm", "start" ]
