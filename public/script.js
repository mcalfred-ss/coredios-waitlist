// public/script.js

// 1️⃣ Grab your form and email input by ID
const form = document.getElementById('waitlist-form');
const emailInput = document.getElementById('email');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = emailInput.value;

  try {
    // 2️⃣ Post to the Express route you mounted at /api/join
    const res = await fetch('/api/join', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    if (!res.ok) throw new Error(`Server error: ${res.status}`);
    // 3️⃣ On success, redirect to your static thank‑you page
    window.location.href = '/thankyou.html';
  } catch (err) {
    console.error(err);
    alert('Something went wrong. Please try again.');
  }
});
