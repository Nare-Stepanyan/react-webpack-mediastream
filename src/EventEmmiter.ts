type Listener = {
  id: string;
  cb: Function;
};
type Listeners = {
  [key: string]: Listener[];
};

class EventEmitter {
  listeners: Listeners = {
    click: [],
  };
  on(event: string, listener: Function) {
    const id = Math.random().toString(36);
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    } else this.listeners[event].push({ id, cb: listener });
    return this.off(event, id);
  }

  off(event: string, listenerId: string) {
    if (this.listeners[event]) {
      this.listeners[event].filter((listener) => listener.id !== listenerId);
    }
  }

  emit(event: string, data: any) {
    if (this.listeners[event]) {
      this.listeners[event].forEach((listener: Listener) => {
        listener.cb(data);
      });
    }
  }
}

export default EventEmitter;
