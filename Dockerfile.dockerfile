FROM node:17
ENV HOME=/root
ENV WS=${HOME}/project
EXPOSE 4242

WORKDIR ${HOME}
#RUN git clone --branch test https://github.com/hypothe/bomi_fama_nodejs.git project 
COPY . ${WS}

WORKDIR ${WS}
RUN npm install

ENTRYPOINT [ "bash" ]