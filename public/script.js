const form = document.getElementById('waitlist-form');
const emailIn = document.getElementById('email');

form.addEventListener('submit', async e => {
  e.preventDefault();
  
  // Simple client-side validation
  const email = emailIn.value.trim();
  if (!email || !email.includes('@')) {
    alert('Please enter a valid email address');
    return;
  }
  
  try {
    const res = await fetch('/api/join', {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    console.log('API response:', data);
    
    if (data.success) {
      // Redirect to thank you page regardless of whether the email was already in the database
      window.location.href = '/thankyou.html';
      
      // Clear the form in case they navigate back
      form.reset();
    } else {
      alert(`❌ ${data.message}`);
    }
  } catch (err) {
    alert('Something went wrong. Please try again.');
    console.error(err);
  }
});