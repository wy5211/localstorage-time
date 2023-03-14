var ExpiresEnum;
(function (ExpiresEnum) {
    // 永久
    ExpiresEnum["PERMANENT"] = "PERMANENT";
    //
    ExpiresEnum["EXPIRES"] = "__EXPIRES__";
})(ExpiresEnum || (ExpiresEnum = {}));

var EventCls = /** @class */ (function () {
    function EventCls() {
        this.list = {};
    }
    EventCls.prototype.on = function (name, fn) {
        var eventList = this.list[name];
        if (!eventList) {
            this.list[name] = [fn];
        }
        else {
            this.list[name].push(fn);
        }
        console.log(this.list[name]);
    };
    EventCls.prototype.emit = function (name) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var eventName = this.list[name];
        if (!eventName) {
            return console.error("".concat(name, "\u4E0D\u5B58\u5728"));
        }
        eventName.forEach(function (fn) {
            fn.apply(_this, args);
        });
    };
    EventCls.prototype.off = function (name, fn) {
        var eventName = this.list[name];
        if (!(eventName === null || eventName === void 0 ? void 0 : eventName.length)) {
            console.error("".concat(name, "\u4E0D\u5B58\u5728"));
            return;
        }
        var idx = eventName.findIndex(function (item) { return item === fn; });
        eventName.splice(idx, 1);
        console.log(this.list);
    };
    EventCls.prototype.once = function (name, fn) {
        var _this = this;
        var f = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            fn.apply(_this, args);
            _this.off(name, f);
        };
        this.on(name, f);
    };
    return EventCls;
}());
var e = new EventCls();
// e.on('post', () => {
//   console.log(1);
// });
// e.on('post', () => {
//   console.log(2);
// });
// const fn = () => {
//   console.log(3);
// };
// e.on('post', fn);
// e.emit('post1', 1, 2, 3);
// e.off('post', fn);
// e.emit('post', 1, 2, 3);
e.once('oncefn', function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    console.log('once - 1', args);
});
e.emit('oncefn', 1, 2, 3);
e.emit('oncefn', 4, 5, 6);

var Storage = /** @class */ (function () {
    function Storage() {
    }
    Storage.prototype.set = function (key, value, expires) {
        var _a;
        var data = (_a = {
                value: JSON.stringify(value)
            },
            _a[ExpiresEnum.EXPIRES] = expires || ExpiresEnum.PERMANENT,
            _a);
        localStorage.setItem(key, JSON.stringify(data));
    };
    Storage.prototype.get = function (key) {
        var data = localStorage.getItem(key);
        if (!data) {
            return {
                message: "".concat(key, "\u4E0D\u5B58\u5728"),
                value: null,
            };
        }
        var parseData = JSON.parse(data);
        var expiresTime = parseData[ExpiresEnum.EXPIRES];
        var now = Date.now();
        if (typeof expiresTime === 'number' && expiresTime < now) {
            this.remove(key);
            return {
                message: "".concat(key, "\u5DF2\u8FC7\u671F"),
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
}());

export { EventCls, Storage };
