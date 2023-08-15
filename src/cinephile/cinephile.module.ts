import { Module } from '@nestjs/common';
import { CinephileController } from './cinephile.controller';
import { CinephileService } from './cinephile.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CinephileSchema } from './schema/cinephile.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'cinephile', schema: CinephileSchema }]),
    JwtModule.register({
      secret: process.env.SECRET,
    }),
  ],
  controllers: [CinephileController],
  providers: [CinephileService],
})
export class CinephileModule {}
