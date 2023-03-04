/**
 * 订阅者
 * @property {() => void} remove 取消订阅
 */
type Listener = {
  remove: () => void;
};

/**
 * 回调 callback
 */
type Callback = {
  (data: unknown): unknown;
};

interface EventSupport {
  /**
   * 订阅事件
   * @param event 事件名
   * @param callback 订阅函数
   * @returns {Listener}
   */
  on(event: string, callback: Callback): Listener;

  /**
   * 取消订阅
   * @param event 事件名
   * @param callback 订阅函数
   */
  off(event: string, callback?: Callback): void;

  /**
   * 触发事件
   * @param event 事件名
   * @param data 数据
   */
  emit(event: string, data: unknown): void;
}

class MyEvent implements EventSupport {
  // code here
  // 属性列表
  event: string | undefined;

  callback: Callback | undefined;

  data: unknown;

  // 实现on方法
  on(event: string, callback: Callback): any {
    this.event = event;
    this.callback = callback;
  }

  // 实现off方法
  off(event: string, callback?: Callback | undefined): void {
    this.event = event;
    this.callback = callback;
  }

  // 实现emit方法
  emit(event: string, data: unknown): void {
    this.event = event;
    this.data = data;
    throw new Error('Method not implemented.');
  }
}

// 测试代码
const myEvent = new MyEvent();

const listener1 = myEvent.on('event1', (param) => {
  console.log('event1 emitted with', param);
});
const callback2 = (param: any) => {
  console.log('event2 emitted with', param);
};
myEvent.on('event2', callback2);

myEvent.emit('event1', '1.1'); // 输出 'event1 emitted with 1.1'
myEvent.emit('event1', '1.2'); // 输出 'event1 emitted with 1.2'
listener1.remove();
myEvent.emit('event1', '1.3'); // <nothing happened>

myEvent.emit('event2', '2.1'); // 输出 'event2 emitted with 2.1'
myEvent.off('event2', callback2);
myEvent.emit('event2', '2.2'); // <nothing happened>
