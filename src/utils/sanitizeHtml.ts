export function sanitizeHtml(html: string): string {
  const tempElement = document.createElement('div');
  tempElement.innerHTML = html;

  const scripts = tempElement.querySelectorAll('script');
  scripts.forEach((script) => script.remove());

  const iframes = tempElement.querySelectorAll('iframe');
  iframes.forEach((iframe) => iframe.remove());

  return tempElement.innerHTML;
}
