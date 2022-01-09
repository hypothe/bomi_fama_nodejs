FROM node:17
ENV HOME=/root
WORKDIR ${HOME}
RUN git clone https://github.com/hypothe/bomi_fama_nodejs.git project 

WORKDIR ${HOME}/project
RUN npm install

#ENTRYPOINT [ "npm start" ]