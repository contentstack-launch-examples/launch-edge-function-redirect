export default async function handler(request, context) {
  try {
    const currentUrl = new URL(request.url);
    
    if (currentUrl.pathname.startsWith('/api/') || 
        currentUrl.pathname.startsWith('/_next/') || 
        currentUrl.pathname.startsWith('/static/') ||
        currentUrl.pathname.includes('.')) {
      return fetch(request);
    }
    
    const apiUrl = `${currentUrl.protocol}//${currentUrl.host}/api/redirect`;
    const response = await fetch(new Request(apiUrl, request));
    const redirects = response.ok ? await response.json() : [];
    const redirect = redirects.find(rule => rule.source === currentUrl.pathname);
    
    if (redirect) {
      const newUrl = new URL(request.url);
      newUrl.pathname = redirect.destination;
      
      return new Response(null, {
        status: redirect.status || 302,
        headers: {
          'Location': newUrl.toString()
        }
      });
    }
    
    return fetch(request);
    
  } catch (error) {
    return fetch(request);
  }
}

