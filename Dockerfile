FROM trion/ng-cli

WORKDIR /app

COPY . /app

RUN npm install

ENTRYPOINT ng build
