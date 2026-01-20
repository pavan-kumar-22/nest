import {Injectable} from '@nestjs/common';
import {Connection, createConnection} from 'mongoose';

@Injectable()
    export class TenantConnectionManager {
        private connections:Record<string,Connection>={};

        async getConnection(dbName:string): Promise<Connection> {
            const baseUri = process.env.MongoBaseUrl;
            const key = `${baseUri}/${dbName}`;
            if (this.connections[key]) {
                return this.connections[key];
            }

            const conn = await createConnection(`${baseUri}/${dbName}`).asPromise();
            this.connections[key] = conn;
            return conn;
        }
    }