// Cloudflare Pages Function for Decap CMS GitHub OAuth
// This handles the OAuth callback from GitHub

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  
  // Get authorization code from GitHub callback
  const code = url.searchParams.get('code');
  
  if (!code) {
    return new Response('Missing authorization code', { status: 400 });
  }
  
  // Exchange code for access token
  const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });
  
  const data = await tokenResponse.json();
  
  if (data.error) {
    return new Response(`OAuth error: ${data.error_description}`, { status: 400 });
  }
  
  // Return token to CMS in the expected format
  const content = `
    <html>
      <body>
        <script>
          (function() {
            function receiveMessage(e) {
              console.log("receiveMessage %o", e);
              window.opener.postMessage(
                'authorization:github:success:${JSON.stringify(data)}',
                e.origin
              );
              window.removeEventListener("message", receiveMessage, false);
            }
            window.addEventListener("message", receiveMessage, false);
            console.log("Sending message: %o", "authorizing:github");
            window.opener.postMessage("authorizing:github", "*");
          })();
        </script>
      </body>
    </html>
  `;
  
  return new Response(content, {
    headers: { 'Content-Type': 'text/html' },
  });
}
