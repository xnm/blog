class RootStore {
  registerStore(name: string, store): void {
    console.log('registering store:', name);
    this[name] = store;
  }
}

export default new RootStore();
