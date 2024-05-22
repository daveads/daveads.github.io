async function helloWorld(): Promise<string> {
    await new Promise<void>(resolve => {
      setTimeout(() => {
        resolve();
      }, 2000); // wait 2 seconds before resolving
    });
    return "Hello World Test in typescript";
  }
  
  // Check if document is defined before adding event listener
  if (typeof document !== 'undefined') {
    document.addEventListener("DOMContentLoaded", async () => {
      const hello: string = await helloWorld();
      const responseElement: HTMLElement | null = document.getElementById('response');
      if (responseElement) {
        responseElement.textContent = hello;
      }
    });
  }
  