
  const form = document.getElementById('enquiryForm');
  const btn = document.getElementById('submitBtn');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    btn.textContent = 'Sending...';
    btn.disabled = true;

    const data = new FormData(form);
    const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data });
    const json = await res.json();

    if (json.success) {
      document.getElementById('successModal').classList.remove('hidden');
    } else {
      btn.textContent = 'Plan My Trip →';
      btn.disabled = false;
      alert('Something went wrong. Please try again.');
    }
  });

  document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('successModal').classList.add('hidden');
    form.reset();
    btn.textContent = 'Plan My Trip →';
    btn.disabled = false;
  });

