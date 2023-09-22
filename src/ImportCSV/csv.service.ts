// 1. Importe as dependências necessárias
import * as fs from 'fs';
import * as csvParser from 'csv-parser';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import * as iconv from 'iconv-lite';

@Injectable()
export class CsvService {
  constructor(private readonly prismaService: PrismaService) {}

  async processCsvFile(filePath: string): Promise<void> {
    const data: any[] = [];

    fs.createReadStream(filePath)
      .pipe(iconv.decodeStream('latin1'))
      .pipe(iconv.encodeStream('utf-8'))
      .pipe(csvParser({ separator: ';' }))
      .on('data', (row) => {
        data.push({
          year: parseInt(row.Ano),
          marital_status: row['Estado civil'],
          age_range: row['Faixa etária'],
          gender: row['Gênero'],
          education_level: row['Grau de instrução'],
          month: parseInt(row.Mês),
          city: row.Município,
          country: row.País,
          region: row['Região'],
          situation: row['Situação do eleitor'],
          uf: row.UF,
          zone: parseInt(row.Zona),
          elector_quantity: parseInt(row['Quantidade de eleitor']),
          load_date: row['Data de carga'],
        });
      })
      .on('end', async () => {
        try {
          await this.prismaService.monthlyElectorate.createMany({
            data,
          });
          console.log('Dados inseridos com sucesso.');
        } catch (error) {
          console.error('Erro ao inserir dados:', error);
          throw new Error('Falha ao inserir dados no banco de dados.');
        }
      });
  }
}