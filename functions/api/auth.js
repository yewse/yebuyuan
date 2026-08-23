// Cloudflare Pages Function for Decap CMS GitHub OAuth
// Handles both the initial redirect and the callback

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  
  // Get authorization code from GitHub callback
  const code = url.searchParams.get('code');
  
  // Step 1: Initial request - redirect to GitHub authorization
  if (!code) {
    const clientId = env.GITHUB_CLIENT_ID;
    
    if (!clientId) {
      return new Response('GitHub OAuth not configured. Set GITHUB_CLIENT_ID environment variable.', { 
        status: 500 
      });
    }
    
    // Redirect to GitHub OAuth authorize endpoint
    const scope = url.searchParams.get('scope') || 'repo';
    const redirectUri = `${url.origin}/api/auth`;
    
    const githubAuthUrl = new URL('https://github.com/login/oauth/authorize');
    githubAuthUrl.searchParams.set('client_id', clientId);
    githubAuthUrl.searchParams.set('scope', scope);
    githubAuthUrl.searchParams.set('redirect_uri', redirectUri);
    
    return Response.redirect(githubAuthUrl.toString(), 302);
  }
  
  // Step 2: Callback from GitHub - exchange code for token
  const clientId = env.GITHUB_CLIENT_ID;
  const clientSecret = env.GITHUB_CLIENT_SECRET;
  
  if (!clientId || !clientSecret) {
    return new Response('GitHub OAuth not configured. Set GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET environment variables.', { 
      status: 500 
    });
  }
  
  // Exchange code for access token
  const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
    }),
  });
  
  const data = await tokenResponse.json();
  
  if (data.error) {
    return new Response(`OAuth error: ${data.error_description || data.error}`, { 
      status: 400 
    });
  }
  
  // Return HTML page that posts message back to Decap CMS
  const content = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Authorizing...</title>
      </head>
      <body>
        <p>Authorization successful. Closing window...</p>
        <script>
          (function() {
            function receiveMessage(e) {
              console.log("receiveMessage %o", e);
              // Send success message with token to Decap CMS
              window.opener.postMessage(
                'authorization:github:success:${JSON.stringify({
                  token: data.access_token,
                  provider: 'github'
                })}',
                e.origin
              );
              window.removeEventListener("message", receiveMessage, false);
            }
            
            window.addEventListener("message", receiveMessage, false);
            
            console.log("Sending message: authorizing:github");
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
