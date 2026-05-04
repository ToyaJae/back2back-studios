document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => document.getElementById('navLinks').classList.remove('open'));
});

document.getElementById('apptDate').setAttribute('min', new Date().toISOString().split('T')[0]);

function submitBooking() {
  const fname = document.getElementById('fname').value.trim();
  const lname = document.getElementById('lname').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  const service = document.getElementById('service').value;
  const date = document.getElementById('apptDate').value;
  const time = document.getElementById('time').value;

  if (!fname || !lname || !phone || !email || !service || !date || !time) {
    alert('Please fill out all fields before submitting.');
    return;
  }

  const dateObj = new Date(date + 'T00:00:00');
  const formattedDate = dateObj.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  // Save booking to localStorage
  const booking = { fname, lname, phone, email, service, date, time, submitted: new Date().toISOString() };
  const existing = JSON.parse(localStorage.getItem('b2b_bookings') || '[]');
  existing.push(booking);
  localStorage.setItem('b2b_bookings', JSON.stringify(existing));

  document.getElementById('confirmMsg').textContent =
    `Thank you, ${fname}! Your request for ${service} on ${formattedDate} at ${time} has been received.`;
  document.getElementById('bookingForm').style.display = 'none';
  document.getElementById('bookingConfirm').style.display = 'block';
}

function resetForm() {
  ['fname','lname','phone','email','service','apptDate','time'].forEach(id => {
    document.getElementById(id).value = '';
  });
  document.getElementById('bookingForm').style.display = 'block';
  document.getElementById('bookingConfirm').style.display = 'none';
}
