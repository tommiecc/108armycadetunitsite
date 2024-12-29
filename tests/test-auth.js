// test-auth.js
async function testAuthFunction() {
    
    let BASE_URL = 'https://108armycadetunit.site/auth/changepass'

    const testCase = {
      name: "Test Change Password",
      payload: {
        "is-admin": true,
        "is-logged-in": true,
        "user-input": "testpass123"
      }
    }

    console.log(`\nRunning: ${testCase.name}`);
    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(testCase.payload)
      });

      const data = await response;
      console.log('Response:', data);
    } catch (error) {
      console.error('Error:', error)
    }


    BASE_URL = 'https://108armycadetunit.site/auth/authLogin';  // Replace with your actual URL
  
    const testCases = [
        {
            name: "Test Login (Normal User)",
            payload: {
            "user-input": "testpass123"
            }
        },
        {
            name: "Test Login (Admin)",
            payload: {
            "user-input": "admin"
            }
        },
        {
            name: "Test Invalid Login",
            payload: {
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
  
        const data = await response;
        
        //console.log('Status:', response.status);
        console.log('Response:', data);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }
  
  // Run the tests
  testAuthFunction();