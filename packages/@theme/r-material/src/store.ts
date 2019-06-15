class RootStore {
  registerStore(name: string, store): void {
    this[name] = store;
  }
}

export default new RootStore();
