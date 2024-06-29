import { ConnectionPool, Request } from 'mssql';
import mssql from 'mssql';
import { sqlConfig } from '../config';

export class DbHelper {
  private pool: Promise<ConnectionPool>;

  constructor() {
    this.pool = mssql.connect(sqlConfig);
  }

  private createRequest(emptyRequest: Request, data: { [key: string]: string | number }) {
    const keys = Object.keys(data);
    keys.forEach(key => {
      emptyRequest.input(key, data[key]);
    });
    return emptyRequest;
  }

  async exec(storedProcedure: string, data: { [key: string]: string | number }) {
    const emptyRequest = (await this.pool).request();
    const request = this.createRequest(emptyRequest, data);
    const results = await request.execute(storedProcedure);
    return results;
  }

  async query<T>(queryString: string, data?: { [key: string]: string | number }): Promise<T[]> {
    const emptyRequest = (await this.pool).request();
    if (data) {
      const request = this.createRequest(emptyRequest, data);
      const results = await request.query(queryString);
      return results.recordset;
    } else {
      const results = await emptyRequest.query(queryString);
      return results.recordset;
    }
  }

  async get(storedProcedure: string, data: { [key: string]: string | number }) {
    const emptyRequest = (await this.pool).request();
    const request = this.createRequest(emptyRequest, data);
    const results = await request.execute(storedProcedure);
    return results.recordset[0];
  }

  async getAll(storedProcedure: string) {
    const request = (await this.pool).request();
    const results = await request.execute(storedProcedure);
    return results.recordset;
  }
}
