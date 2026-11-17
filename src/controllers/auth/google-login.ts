import { Request, Response } from 'express';
import { env } from '#/config/env.js'
const googleLoginController = async (req: Request, res: Response) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'Code is required' });
  }


  const tokenResponse = fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      client_id: env.GOOGLE_CLIENT_ID,
      client_secret: env.GOOGLE_CLIENT_SECRET,
      redirect_uri: env.GOOGLE_REDIRECT_URI,
      grant_type: env.GOOGLE_GRANT_TYPE,
      code: code
    })

  })
  tokenResponse.then(
    (response) => {
      return response.json();
    }
  ).then(tokenData => {

    const user = fetch('https://openidconnect.googleapis.com/v1/userinfo', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
      }
    })

    return user;

  }
  ).then(userResponse => {
    return userResponse.json();
  }).then(userData => {
    console.log('User data:', userData);
  }
  )
    .catch((error) => {
      console.error('Error fetching token:', error);
    })



}

export { googleLoginController }