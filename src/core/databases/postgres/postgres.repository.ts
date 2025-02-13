import {Pool, QueryResult} from "pg";
import {BaseRepository} from "../base.repository";
import {IEntity} from "../../entity/entity.interface";
import configurations from "../../../server-config/configurations";

export abstract class PostgresRepository<T extends IEntity> implements BaseRepository<T> {
  protected database: Pool;
  protected tableName: string;

  constructor(tableName: string) {
    this.database = configurations().postgres.pool;
    this.tableName = tableName;
  }

  async create(item: T): Promise<T> {
    const data = item.toDatabaseObject(); // Ensure object serialization
    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map((_, index) => `$${index + 1}`).join(", ");
    const query = `INSERT INTO ${this.tableName} (${keys.join(", ")}) VALUES (${placeholders}) RETURNING *`;

    try {
      const result: QueryResult = await this.database.query(query, values);
      if (!result || result.rowCount === 0) throw new Error("Insert failed");
      return this.docToEntity(result.rows[0]);
    } catch (error: any) {
      throw new Error(`Error inserting into ${this.tableName}: ${error.message}`);
    }
  }

  async update(uuid: string | number, item: T): Promise<boolean> {
    const data = item.toDatabaseObject();
    const keys = Object.keys(data);
    const values = Object.values(data);
    const updates = keys.map((col, index) => `${col} = $${index + 1}`).join(", ");
    const query = `UPDATE ${this.tableName} SET ${updates} WHERE uuid = $${keys.length + 1}`;

    try {
      const result: QueryResult = await this.database.query(query, [...values, uuid]);
      return result.rowCount !== null && result.rowCount > 0;
    } catch (error: any) {
      throw new Error(`Error updating ${this.tableName}: ${error.message}`);
    }
  }

  async delete(uuid: string | number): Promise<boolean> {
    const query = `DELETE FROM ${this.tableName} WHERE uuid = $1`;
    try {
      const result: QueryResult = await this.database.query(query, [uuid]);
      return result.rowCount !== null && result.rowCount > 0;
    } catch (error: any) {
      throw new Error(`Error deleting from ${this.tableName}: ${error.message}`);
    }
  }

  async find(): Promise<T[]> {
    const query = `SELECT * FROM ${this.tableName}`;
    try {
      const result: QueryResult = await this.database.query(query);
      return result.rows.map((doc) => this.docToEntity(doc));
    } catch (error: any) {
      throw new Error(`Error fetching from ${this.tableName}: ${error.message}`);
    }
  }

  async findOne(uuid: string | number): Promise<T> {
    const query = `SELECT * FROM ${this.tableName} WHERE uuid = $1`;
    try {
      const result: QueryResult = await this.database.query(query, [uuid]);
      if (!result.rows[0]) throw new Error("Record not found");
      return this.docToEntity(result.rows[0]);
    } catch (error: any) {
      throw new Error(`Error fetching from ${this.tableName}: ${error.message}`);
    }
  }

  protected abstract docToEntity(doc: any): T;
}
