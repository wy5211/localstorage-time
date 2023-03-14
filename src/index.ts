import { StorageClass, Key, ExpiresEnum, Expires, Data } from './types';

export { EventCls } from './event';

export class Storage implements StorageClass {
  set<T>(key: Key, value: T, expires?: Expires) {
    const data = {
      value: JSON.stringify(value),
      [ExpiresEnum.EXPIRES]: expires || ExpiresEnum.PERMANENT,
    };

    localStorage.setItem(key, JSON.stringify(data));
  }

  get<T>(key: Key) {
    const data = localStorage.getItem(key);

    if (!data) {
      return {
        message: `${key}不存在`,
        value: null,
      };
    }

    const parseData: Data<T> = JSON.parse(data);

    const expiresTime = parseData[ExpiresEnum.EXPIRES];

    const now = Date.now();

    if (typeof expiresTime === 'number' && expiresTime < now) {
      this.remove(key);
      return {
        message: `${key}已过期`,
        value: null,
      };
    }
    return {
      message: '获取成功',
      value: parseData.value,
    };
  }

  remove(key: Key) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }
}
