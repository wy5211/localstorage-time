export interface StorageClass {
  get: (key: Key) => void;
  set: <T>(key: Key, value: T, expires?: Expires) => void;
  remove: (key: Key) => void;
  clear: () => void;
}

export interface Data<T> {
  value: T;
  [ExpiresEnum.EXPIRES]: number | ExpiresEnum.PERMANENT;
}

export type Expires = ExpiresEnum.PERMANENT | number;

export enum ExpiresEnum {
  // 永久
  PERMANENT = 'PERMANENT',
  //
  EXPIRES = '__EXPIRES__',
}

export type Key = string;
