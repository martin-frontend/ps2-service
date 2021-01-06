import { Test } from '@nestjs/testing';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as cron from 'node-cron'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  // Add headers
  app.use(function (req, res, next) {
    // Website you wish to allow to connect
    // 開發中暫時全開，上線時一定要關掉
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
  });
  //9:52
  var task = cron.schedule('0 10 * * *', () =>  {
    const test = require('./cronjob/test')
    test.Test()
  }, {
    scheduled: true,
    timezone: "Asia/Taipei"
  });
  
  task.start();
  await app.listen(3000);
}
bootstrap();
