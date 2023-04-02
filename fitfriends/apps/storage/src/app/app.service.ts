import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class AppService {
  public async delete({ fileName }) {
    try {
      fs.unlinkSync(`../../../../${fileName}`);
    } catch (e) {
      throw e;
    }
  }
}
