// Use native fetch

async function runTests() {
  console.log('--- Starting Auth API Tests ---');
  
  const baseUrl = 'http://localhost:5000/api/auth';
  const phone = '1234567890';
  const name = 'Test Patient';
  let otpCode = '';
  let jwtToken = '';

  try {
    // 1. Send OTP
    console.log('\n1. Testing POST /send-otp...');
    const sendOtpRes = await fetch(`${baseUrl}/send-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone })
    });
    const sendOtpData = await sendOtpRes.json();
    console.log('Response:', sendOtpData);
    if (sendOtpData.status === 'success') {
      otpCode = sendOtpData.data.otp;
      console.log('✅ Send OTP Passed. OTP:', otpCode);
    } else {
      throw new Error('Send OTP failed');
    }

    // 2. Verify OTP
    console.log('\n2. Testing POST /verify-otp...');
    const verifyOtpRes = await fetch(`${baseUrl}/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, otp: otpCode, name })
    });
    const verifyOtpData = await verifyOtpRes.json();
    console.log('Response:', verifyOtpData);
    if (verifyOtpData.status === 'success') {
      jwtToken = verifyOtpData.data.token;
      console.log('✅ Verify OTP Passed. JWT:', jwtToken.substring(0, 20) + '...');
    } else {
      throw new Error('Verify OTP failed');
    }

    // 3. Test Protected Route
    console.log('\n3. Testing GET /me (Protected Route)...');
    const meRes = await fetch(`${baseUrl}/me`, {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`
      }
    });
    const meData = await meRes.json();
    console.log('Response:', meData);
    if (meData.status === 'success') {
      console.log('✅ Protected Route Passed. Authenticated as:', meData.data.name);
    } else {
      throw new Error('Protected route failed');
    }

    console.log('\n🎉 All tests passed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Test failed:', err.message);
    process.exit(1);
  }
}

runTests();
