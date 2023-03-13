var ExpiresEnum;
(function (ExpiresEnum) {
  // 永久
  ExpiresEnum['PERMANENT'] = 'PERMANENT';
  //
  ExpiresEnum['EXPIRES'] = '__EXPIRES__';
})(ExpiresEnum || (ExpiresEnum = {}));

var Storage = /** @class */ (function () {
  function Storage() {}
  Storage.prototype.set = function (key, value, expires) {
    var _a;
    var data =
      ((_a = {
        value: JSON.stringify(value),
      }),
      (_a[ExpiresEnum.EXPIRES] = expires || ExpiresEnum.PERMANENT),
      _a);
    localStorage.setItem(key, JSON.stringify(data));
  };
  Storage.prototype.get = function (key) {
    var data = localStorage.getItem(key);
    if (!data) {
      return {
        message: ''.concat(key, '\u4E0D\u5B58\u5728'),
        value: null,
      };
    }
    var parseData = JSON.parse(data);
    var expiresTime = parseData[ExpiresEnum.EXPIRES];
    var now = Date.now();
    if (typeof expiresTime === 'number' && expiresTime < now) {
      this.remove(key);
      return {
        message: ''.concat(key, '\u5DF2\u8FC7\u671F'),
        value: null,
      };
    }
    return {
      message: '获取成功',
      value: parseData.value,
    };
  };
  Storage.prototype.remove = function (key) {
    localStorage.removeItem(key);
  };
  Storage.prototype.clear = function () {
    localStorage.clear();
  };
  return Storage;
})();

export { Storage };
