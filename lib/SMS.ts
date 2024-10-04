// lib/SMS.js
export const sendSMS = async (phone, message) => {
  const response = await fetch('https://mboadeals.net/api/v1/sms/sendsms', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_id: '663bf37a10e820a0fec4802a',
      password: '9PFNgUcumEJsnig',
      message: message,
      phone_str: phone,
      sender_name: 'LATIOMS',
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to send SMS');
  }

  return response.json();
};
