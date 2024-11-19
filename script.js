// Ambil nama tamu dari URL jika tersedia
function getGuestName() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('guest') || 'Tamu Undangan';
}

// Menampilkan nama tamu pada cover
document.getElementById('guestName').innerText = getGuestName();

document.getElementById('openInvitation').addEventListener('click', () => {
    // Dapatkan elemen cover dan undangan
    let cover = document.getElementById('cover');
    let invitation = document.getElementById('invitation');

    // Tambahkan kelas animasi swipe-up ke cover
    cover.classList.add('swipe-up-cover');

    // Setelah animasi selesai, sembunyikan cover dan tampilkan undangan
    cover.addEventListener('transitionend', () => {
        cover.style.display = 'none';
        invitation.style.display = 'block';
        
        // Putar musik undangan
        const audio = document.getElementById('weddingMusic');
        audio.play();
    }, { once: true });
});

  // Menangani tombol Play/Pause
  document.getElementById('playPauseButton').addEventListener('click', function() {
    const audio = document.getElementById('weddingMusic');
    const icon = document.getElementById('playPauseIcon');
    
    if (audio.paused) {
      audio.play();
      icon.classList.remove('fa-play');
      icon.classList.add('fa-pause');
    } else {
      audio.pause();
      icon.classList.remove('fa-pause');
      icon.classList.add('fa-play');
    }
  });

// Countdown Timer
function countdownTimer(targetDate) {
    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysElement.innerHTML = days;
        hoursElement.innerHTML = hours;
        minutesElement.innerHTML = minutes;
        secondsElement.innerHTML = seconds;

        if (distance < 0) {
            clearInterval(interval);
            daysElement.innerHTML = hoursElement.innerHTML = minutesElement.innerHTML = secondsElement.innerHTML = "0";
        }
    }, 1000);
}

// Initialize Countdown
document.addEventListener("DOMContentLoaded", () => {
    const targetDate = new Date("2024-12-01T11:00:00").getTime();
    countdownTimer(targetDate);
});

document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('mouseover', () => {
        item.style.transform = 'scale(1.05)';
    });
    item.addEventListener('mouseout', () => {
        item.style.transform = 'scale(1)';
    });
});

// DATE-COUNT
const speed = 50;  // Kecepatan dalam milidetik

// Fungsi untuk mulai menghitung dari 0 ke targetNumber
function startCounting(element) {
    const targetNumber = parseInt(element.getAttribute('data-target'));
    let currentNumber = 30;

    const counter = setInterval(() => {
        currentNumber--;
        element.textContent = String(currentNumber).padStart(2, '0');

        if (currentNumber <= targetNumber) {
            clearInterval(counter);
        }
    }, speed);
}

// Menggunakan Intersection Observer untuk memulai animasi saat elemen masuk ke viewport
const observer2 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startCounting(entry.target);
            observer.unobserve(entry.target); // Hentikan observasi setelah animasi berjalan
        }
    });
}, { threshold: 0.5 });

// Mengamati setiap elemen dengan kelas .wedding-date
document.querySelectorAll('.wedding-date-count').forEach(element => {
    observer2.observe(element);
});



// COPY ACCOUNT NUMBER

function copyAccountNumber(accountNumber) {
    navigator.clipboard.writeText(accountNumber).then(() => {
        alert('Nomor rekening berhasil disalin!');
    }).catch(err => {
        alert('Gagal menyalin nomor rekening, coba lagi.');
    });
}

 // Mengambil data RSVP ketika halaman dimuat
 fetch('https://yogi-putri-wedding-invitation.glitch.me/rsvps')
 .then(response => response.json())
 .then(data => {
   data.forEach(item => {
     const messageItem = document.createElement('div');
     messageItem.classList.add('message-item');
     messageItem.innerHTML = `
       <h4>${item.name} (${item.attendance})</h4>
       <p>${item.message}</p>
     `;
     document.getElementById('messageList').appendChild(messageItem);
   });
 })
 .catch(error => console.error('Error fetching RSVP data:', error));
 
 // Menangani form RSVP
 document.getElementById('rsvpForm').addEventListener('submit', function (event) {
 event.preventDefault(); // Prevent default form submission
 
 // Get form data
 const guestNameRSVP = document.getElementById('guestNameRSVP').value.trim(); // Ganti ID
 const guestMessage = document.getElementById('guestMessage').value.trim();
 const attendance = document.getElementById('attendance').value;
 
 // Check if all required fields are filled
 if (!guestNameRSVP || !guestMessage || !attendance) {
   alert('Please fill out all fields.');
   return;
 }
 
 // Create an object with form data
 const formData = {
   name: guestNameRSVP,
   message: guestMessage,
   attendance: attendance
 };
 
 // Submit form data
 fetch('https://yogi-putri-wedding-invitation.glitch.me/rsvp', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(formData)
 })
 .then(response => response.json())
 .then(data => {
   if (data.success) {
     alert('RSVP submitted successfully!');
     location.reload(); // Optionally, reload the page after submission
   } else {
     alert('Error: ' + data.error);
   }
 })
 .catch(error => {
   console.error('Error submitting RSVP:', error);
 });
 });

 const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
const elements = document.querySelectorAll('.fade-in, .fade-slide, .swipe-left, .swipe-right, .swipe-up, .swipe-down, .pop-up');

elements.forEach(element => {
    observer.observe(element);
});
