import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './auth.guard';
import { LocalStrategy } from './local.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      secret: process.env.SECRET,
    }),
  ],
  exports: [JwtAuthGuard, LocalStrategy],
  providers: [JwtAuthGuard, LocalStrategy],
})
export class AuthModule {}
