export function onElementRemoved(element: HTMLElement, callback: () => void): void {
  const observer = new MutationObserver((event) => {
    const removedNodes = event
      .filter((e) => e.removedNodes.length && e.type === 'childList')
      .map((e) => Array.from(e.removedNodes))
      .flat();

    if (!removedNodes?.some((x) => x.contains(element))) return;

    console.log('Element removed, calling callback');
    callback();
  });

  observer.observe(document.body, { childList: true, subtree: true });
}
