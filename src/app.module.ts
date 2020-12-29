import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '@module/user.module';

// import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoginModule } from '@module/login.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://penbillpopo:075717169@billcluster.jrgs2.mongodb.net/ps2_service?retryWrites=true&w=majority',{ useNewUrlParser: true }),
    // forRootAsync尚有錯誤暫時跳過config方式介接
    // MongooseModule.forRoot('mongodb+srv://develop:1qaz@WSX@sandbox.gywtz.mongodb.net/sandbox?retryWrites=true&w=majority',{ useNewUrlParser: true }),
    // ConfigModule.forRoot({ isGlobal: true }),
    // MongooseModule.forRootAsync({
    //   inject: [ConfigService],
    //   connectionName: 'MongoDB',
    //   useFactory: async (config: ConfigService) => ({
    //     uri: config.get('MONGO_DB_HOST'),
    //     useUnifiedTopology: true,
    //     poolSize: 10,
    //     autoCreate: true,
    //     autoIndex: true,
    //     useCreateIndex: true,
    //     useNewUrlParser: true,
    //     useFindAndModify: false,
    //   }),
    // }),
    UserModule,
    LoginModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
