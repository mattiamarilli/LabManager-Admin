FROM trion/ng-cli

COPY . /app

WORKDIR /app

RUN npm install

ENTRYPOINT ng build
