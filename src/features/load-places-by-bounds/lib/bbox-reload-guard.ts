export function createBboxReloadGuard() {
  let lastBboxKey: string | null = null;

  return {
    shouldReload(bboxKey: string, force = false): boolean {
      return force || bboxKey !== lastBboxKey;
    },
    markLoaded(bboxKey: string) {
      lastBboxKey = bboxKey;
    },
    reset() {
      lastBboxKey = null;
    },
  };
}
