FROM trion/ng-cli

RUN npm install

WORKDIR /app

COPY . /app

ENTRYPOINT ng build
