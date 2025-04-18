// public/script.js
const form      = document.getElementById('waitlist-form');
const emailInput= document.getElementById('email');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = emailInput.value;

  try {
    const res = await fetch('/api/join', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ email })
    });
    if (!res.ok) throw new Error(`Server error: ${res.status}`);
    window.location.href = '/thankyou.html';
  } catch (err) {
    console.error(err);
    alert('Something went wrong. Please try again.');
  }
});
