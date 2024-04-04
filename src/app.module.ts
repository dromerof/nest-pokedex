import { join } from 'path'; // De node, usualmente los paquetes de node van al inicio 
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvConfiguration } from './config/env.config';
import { ConfigModule } from '@nestjs/config';

import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { JoiValidationSchema } from './config/joi.validation';


@Module({
  
  imports: [

    ConfigModule.forRoot({
      load:[EnvConfiguration],
      validationSchema: JoiValidationSchema,
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname,"..","public"),
      }),
      
    MongooseModule.forRoot(process.env.MONGODB, {
      dbName: "pokemonsdb"
    }), 
    
    PokemonModule, 
    CommonModule, 
    SeedModule,
  ],

})
export class AppModule {}
