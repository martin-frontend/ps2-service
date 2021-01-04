import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthorityModule } from './authority/authority.module';
import { AnalysisModule } from './analysis/analysis.module';
import { OperationModule } from './operation/operation.module';
@Module({
  imports: [
    // MongooseModule.forRoot('mongodb+srv://penbillpopo:075717169@billcluster.jrgs2.mongodb.net/ps2_service?retryWrites=true&w=majority',{ useNewUrlParser: true }),
    // MongooseModule.forRoot('mongodb+srv://develop:1qaz@WSX@sandbox.gywtz.mongodb.net/sandbox?retryWrites=true&w=majority',{ useNewUrlParser: true }),
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get('MONGO_DB_HOST'),
        useUnifiedTopology: true,
        poolSize: 10,
        autoCreate: true,
        autoIndex: true,
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
      }),
    }),
    UserModule,
    AuthModule,
    AuthorityModule,
    AnalysisModule,
    OperationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
