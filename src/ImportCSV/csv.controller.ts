import { Body, Controller, Get, Post } from '@nestjs/common';
import { CsvService } from './csv.service';

@Controller('csv')
export class CsvController {
  constructor(private readonly CsvService: CsvService) {}

  @Post()
  insertData(@Body("path") path: string): Promise<void> {
    return this.CsvService.processCsvFile(path);
  }
}
