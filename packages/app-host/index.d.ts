declare global {
  interface WindowEventMap {
    "item-click": CustomEvent<{ id: number }>;
  }
}

export {};
