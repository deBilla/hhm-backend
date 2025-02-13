export interface BaseRepository<T> {
  create(item: T): Promise<T>;
  update(id: string | number, item: T): Promise<boolean>;
  delete(id: string | number): Promise<boolean>;
  find(): Promise<T[]>;
  findOne(id: string | number): Promise<T>;
}
