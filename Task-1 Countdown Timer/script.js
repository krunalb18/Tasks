function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(';');
    for(let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) === ' ') cookie = cookie.substring(1, cookie.length);
        if (cookie.indexOf(nameEQ) === 0) return cookie.substring(nameEQ.length, cookie.length);
    }
    return null;
}

function startCountdown(targetDate) {
    const countdownDisplay = document.getElementById('countdown-display');
    const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = new Date(targetDate).getTime() - now;

        if (distance <= 0) {
            clearInterval(interval);
            countdownDisplay.innerHTML = "<span class='complete'>Time’s up!</span>";
        } else {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            countdownDisplay.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }
    }, 1000);
}

document.getElementById('start-timer').addEventListener('click', () => {
    const datetimePicker = document.getElementById('datetime-picker');
    const selectedDate = datetimePicker.value;

    if (selectedDate) {
        setCookie('targetDate', selectedDate, 1); 
        startCountdown(selectedDate);
    }
});

window.onload = function() {
    const savedDate = getCookie('targetDate');
    if (savedDate) {
        startCountdown(savedDate);
    }
};
