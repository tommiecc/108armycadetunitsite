/*
REQUIRED FORMAT FOR REQUESTS:

{
    is-admin: <true/false>,
    is-logged-in: <true/false>,
    change-pass: <true/false>,
    user-input: <some string>
}

EG. TO CHANGE PASSWORD

{
    is-admin: true,
    is-logged-in: true,
    change-pass: true,
    user-input: "Welcome to the Party, Pal"
}

EG. TO AUTH A LOGIN

{
    is-admin: false,
    is-logged-in: false,
    change-pass: false,
    user-input: "Yippee-Ki-Yay"
}

*/


import bcrypt from 'bcryptjs';

export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const data = await request.json();
    
    // Validate input structure
    if (!validateInput(data)) {
      return new Response(JSON.stringify({ 
        error: 'Invalid input format' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { 
      'is-admin': isAdmin, 
      'is-logged-in': isLoggedIn, 
      'change-pass': changePass, 
      'user-input': userInput 
    } = data;

    // Get stored password hashes from KV
    const adminHash = await env.passwordCheck.get('admin-pass');
    const userHash = await env.passwordCheck.get('user-pass');

    if (!adminHash || !userHash) {
      return new Response(JSON.stringify({ 
        error: 'System configuration error' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Handle password change request
    if (changePass) {
      if (!isLoggedIn) {
        return new Response(JSON.stringify({ 
          error: 'Must be logged in to change password' 
        }), {
          status: 403,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Generate new password hash
      const salt = await bcrypt.genSalt(12);
      const newHash = await bcrypt.hash(userInput, salt);

      // Update appropriate password in KV
      if (isAdmin) {
        await env.passwordCheck.put('admin-pass', newHash);
      } else {
        await env.passwordCheck.put('user-pass', newHash);
      }

      return new Response(JSON.stringify({ 
        success: true, 
        message: 'Password updated successfully' 
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Handle authentication request
    const hashToCheck = isAdmin ? adminHash : userHash;
    const isValid = await bcrypt.compare(userInput, hashToCheck);

    if (!isValid) {
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'Invalid credentials' 
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Authentication successful' 
    }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({ 
      error: 'Internal server error', 
      details: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

function validateInput(data) {
  return (
    typeof data === 'object' &&
    'is-admin' in data &&
    'is-logged-in' in data &&
    'change-pass' in data &&
    'user-input' in data &&
    typeof data['is-admin'] === 'boolean' &&
    typeof data['is-logged-in'] === 'boolean' &&
    typeof data['change-pass'] === 'boolean' &&
    typeof data['user-input'] === 'string' &&
    data['user-input'].length > 0
  );
}

