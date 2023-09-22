import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { CsvModule } from './ImportCSV/csv.module';

@Module({
  imports: [CsvModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
