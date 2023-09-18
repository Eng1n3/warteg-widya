import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { EnvConfig } from './interfaces';

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor() {
    const filePath = `.env`;
    const envFile = path.resolve(__dirname, '../../', filePath);
    this.envConfig = dotenv.parse(fs.readFileSync(envFile));
    type NodeEnvironment = 'development' | 'staging' | 'production' | 'rc';
    this.envConfig.NODE_ENV =
      (process.env.NODE_ENV as NodeEnvironment) ?? 'development';
  }

  get<T>(key: string): T {
    return this.envConfig[key] as T;
  }
}
