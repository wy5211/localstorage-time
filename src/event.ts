interface EventType {
  on: (name: string, fn: Function) => void;

  emit: (name: string, ...args: any[]) => void;

  off: (name: string, fn: Function) => void;

  once: (name: string, fn: Function) => void;
}

export class EventCls implements EventType {
  list: Record<string, Array<Function>>;

  constructor() {
    this.list = {};
  }

  on(name: string, fn: Function) {
    const eventList = this.list[name];

    if (!eventList) {
      this.list[name] = [fn];
    } else {
      this.list[name].push(fn);
    }

    console.log(this.list[name]);
  }
  emit(name: string, ...args: any[]) {
    const eventName = this.list[name];
    if (!eventName) {
      return console.error(`${name}不存在`);
    }
    eventName.forEach((fn) => {
      fn.apply(this, args);
    });
  }

  off(name: string, fn: Function) {
    const eventName = this.list[name];
    if (!eventName?.length) {
      console.error(`${name}不存在`);
      return;
    }
    const idx = eventName.findIndex((item) => item === fn);

    eventName.splice(idx, 1);
    console.log(this.list);
  }

  once(name: string, fn: Function) {
    const f = (...args: any[]) => {
      fn.apply(this, args);
      this.off(name, f);
    };

    this.on(name, f);
  }
}

const e = new EventCls();

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

e.once('oncefn', (...args: any[]) => {
  console.log('once - 1', args);
});

e.emit('oncefn', 1, 2, 3);

e.emit('oncefn', 4, 5, 6);
