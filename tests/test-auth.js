// test-auth.js
async function testAuthFunction() {
    const BASE_URL = 'https://108armycadetunit.site/auth';  // Replace with your actual URL
  
    const testCases = [
        {
            name: "Test Password Change (Admin)",
            payload: {
              "is-admin": true,
              "is-logged-in": true,
              "change-pass": true,
              "user-input": "testpass"
            }
        },
        {
            name: "Test Login (Normal User)",
            payload: {
            "is-admin": false,
            "is-logged-in": false,
            "change-pass": false,
            "user-input": "testpass"
            }
        },
        {
            name: "Test Login (Admin)",
            payload: {
            "is-admin": true,
            "is-logged-in": false,
            "change-pass": false,
            "user-input": "admin"
            }
        },
        {
            name: "Test Invalid Login",
            payload: {
            "is-admin": false,
            "is-logged-in": false,
            "change-pass": false,
            "user-input": "WrongPassword"
            }
        }
    ];
  
    for (const test of testCases) {
      console.log(`\nRunning: ${test.name}`);
      try {
        const response = await fetch(BASE_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(test.payload)
        });
  
        const data = await response.json();
        console.log('Status:', response.status);
        console.log('Response:', data);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }
  
  // Run the tests
  testAuthFunction();