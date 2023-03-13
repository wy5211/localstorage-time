localStorage 支持设置过期时间

```bash
npm i localstorage-time -S
```

```js
import { Storage } from 'localstorage-time';

// 10s 后过期
Storage.set('key', 123, Date.now() + 1000 * 10);

Storage.get('key');
```
