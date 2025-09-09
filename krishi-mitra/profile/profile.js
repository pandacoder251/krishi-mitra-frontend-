// ===================== Elements =====================
const sendOtpBtn = document.querySelector('.verify-btn');
const otpGroup = document.querySelector('.otp-group');
const verifyBtn = otpGroup.querySelector('button'); // matches your HTML
const profilePicBtn = document.querySelector('.profile-pic .btn');
const profilePicImg = document.querySelector('.profile-pic img');
const saveBtn = document.querySelector('.actions button[type="submit"]');
const changePasswordBtn = document.querySelector('.change-password-btn');

// ===================== OTP Interaction =====================
sendOtpBtn.addEventListener('click', () => {
    otpGroup.classList.add('show'); // Smooth toggle
    otpGroup.scrollIntoView({ behavior: 'smooth' });

    // Disable button & show "OTP Sent!"
    sendOtpBtn.disabled = true;
    sendOtpBtn.textContent = "OTP Sent!";

    // Countdown timer
    let countdown = 30;
    const interval = setInterval(() => {
        sendOtpBtn.textContent = `Resend OTP (${countdown}s)`;
        countdown--;

        if (countdown < 0) {
            clearInterval(interval);
            sendOtpBtn.disabled = false;
            sendOtpBtn.textContent = "Resend OTP";
        }
    }, 1000);
});

verifyBtn.addEventListener('click', () => {
    const otpInput = otpGroup.querySelector('input');
    if (otpInput.value.trim().length === 6) {
        alert("OTP Verified Successfully!");
        otpGroup.classList.remove('show'); // Smooth hide
        otpInput.value = '';
    } else {
        alert("Please enter a valid 6-digit OTP.");
    }
});

// ===================== Profile Picture Change =====================
profilePicBtn.addEventListener('click', () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';

    fileInput.onchange = () => {
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                profilePicImg.src = reader.result;
            };
            reader.readAsDataURL(file);
        }
    };

    fileInput.click();
});

// ===================== Save Changes =====================
saveBtn.addEventListener('click', (e) => {
    e.preventDefault(); // prevent form submission
    const formData = new FormData(document.querySelector('.profile-form'));
    let summary = "Saved Details:\n";
    for (let [key, value] of formData.entries()) {
        summary += `${key}: ${value}\n`;
    }
    alert(summary);
});

// ===================== Change Password =====================
if (changePasswordBtn) { // Only if the button exists
    changePasswordBtn.addEventListener('click', () => {
        window.location.href = "changepassword.html";
    });
}
