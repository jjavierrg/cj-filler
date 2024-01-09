const DEFAULT_TIMEOUT = 5000;

export async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function waitFor(condition: () => boolean, timeout: number = DEFAULT_TIMEOUT): Promise<void> {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    if (condition()) {
      return;
    }

    await sleep(100);
  }

  throw new Error('Timeout exceeded while waiting for condition');
}

export async function waitForElement(selector: string, optional: boolean = false, timeout: number = DEFAULT_TIMEOUT): Promise<HTMLElement> {
  const isElementPresent = (): boolean => document.querySelector<HTMLElement>(selector) !== null;

  try {
    await waitFor(isElementPresent, timeout);
    return document.querySelector<HTMLElement>(selector);
  } catch (error) {
    if (!optional) {
      throw new Error(`Element not found: ${selector}`);
    }

    return null;
  }
}
