










 function initForm() {
  const form = document.getElementById('enquiryForm');
  if (!form) return;

const btn = document.getElementById('submitBtn');

const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
const emailInput = document.getElementById('email');
const dateInput = document.getElementById('travelDate');

//  Disable past dates
const today = new Date().toISOString().split("T")[0];
if (dateInput) dateInput.min = today;

//  SINGLE validation function (Tailwind version)
function validateField(input, condition) {
  const error = input.closest("div").querySelector(".error-text");

  if (!condition) {
    input.classList.add("border-red-500", "bg-red-50");
    input.classList.remove("border-green-500", "bg-green-50");

    error?.classList.remove("hidden");
    return false;
  } else {
    input.classList.remove("border-red-500", "bg-red-50");
    input.classList.add("border-green-500", "bg-green-50");

    error?.classList.add("hidden");
    return true;
  }
}

// LIVE VALIDATION
nameInput?.addEventListener("input", () => {
  if (nameInput.value.length === 0) {
    // remove styles when empty
    nameInput.classList.remove("border-red-500", "bg-red-50", "border-green-500", "bg-green-50");
    nameInput.closest("div").querySelector(".error-text")?.classList.add("hidden");
    return;
  }

  validateField(nameInput, /^[A-Za-z ]{3,}$/.test(nameInput.value));
});

phoneInput?.addEventListener("input", () => {
  if (phoneInput.value.length === 0) {
    phoneInput.classList.remove("border-red-500", "bg-red-50", "border-green-500", "bg-green-50");
    phoneInput.closest("div").querySelector(".error-text")?.classList.add("hidden");
    return;
  }

  validateField(phoneInput, /^[6-9][0-9]{9}$/.test(phoneInput.value));
});

emailInput?.addEventListener("input", () => {
  if (emailInput.value === "") return;
  validateField(emailInput, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value));
});

dateInput?.addEventListener("change", () => {
  const selected = new Date(dateInput.value);
  const now = new Date();
  now.setHours(0,0,0,0);

  validateField(dateInput, selected >= now);
});

// SUBMIT
form.addEventListener('submit', async (e) => {


  e.preventDefault();

  const isNameValid = /^[A-Za-z ]{3,}$/.test(nameInput.value);
  const isPhoneValid = /^[6-9][0-9]{9}$/.test(phoneInput.value);
  const isEmailValid =
    emailInput.value === "" ||
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);

  const selectedDate = new Date(dateInput.value);
  const now = new Date();
  now.setHours(0,0,0,0);
  const isDateValid = dateInput.value && selectedDate >= now;

  validateField(nameInput, isNameValid);
  validateField(phoneInput, isPhoneValid);
  validateField(emailInput, isEmailValid);
 validateField(dateInput, isDateValid);

  if (!isNameValid || !isPhoneValid || !isEmailValid || !isDateValid) {
    return;
  }

  // Loading state
  btn.innerHTML = `
    <span class="flex items-center justify-center gap-2">
      <span class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
      Sending...
    </span>
  `;
  btn.disabled = true;

  try {
    const data = new FormData(form);
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: data
    });

    const json = await res.json();

    if (json.success) {
      document.getElementById('successModal').classList.remove('hidden');

      // reset button immediately
 btn.innerHTML = formConfig.buttonText || "Plan My Trip →";
  btn.disabled = false;

    } else {
      throw new Error();
    }

  } catch (err) {
    btn.innerHTML = "Plan My Trip →";
    btn.disabled = false;
  }
});

// RESET
document.getElementById('closeModal').addEventListener('click', () => {
  document.getElementById('successModal').classList.add('hidden');

  form.reset();

  form.querySelectorAll("input").forEach(input => {
    input.classList.remove(
      "border-red-500",
      "bg-red-50",
      "border-green-500",
      "bg-green-50"
    );
  });

 btn.innerHTML = formConfig.buttonText || "Plan My Trip →";
  btn.disabled = false;
});





   
}
