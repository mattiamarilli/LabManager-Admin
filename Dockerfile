FROM trion/ng-cli

COPY . /app

WORKDIR /app

RUN npm install

RUN npm install --only=dev

ENTRYPOINT ng build
