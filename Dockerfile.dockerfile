FROM node:17
ENV HOME=/root
EXPOSE 4242

WORKDIR ${HOME}
RUN git clone --branch test https://github.com/hypothe/bomi_fama_nodejs.git project 

WORKDIR ${HOME}/project
RUN npm install

#ENTRYPOINT [ "npm start" ]