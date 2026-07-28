/* ===========================
   Sticky Header
=========================== */

window.addEventListener("scroll", function () {

    const header = document.querySelector("header");

    if (window.scrollY > 50) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }

});
/* ===========================
   Mobile Menu
=========================== */

const menu = document.querySelector(".menu");
const nav = document.querySelector("header nav");

if (menu && nav) {
    menu.addEventListener("click", () => {
        nav.classList.toggle("active");
    });
}
/* ===========================
   Hero Slider
=========================== */
document.querySelectorAll("nav a").forEach(link => {

    link.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({
                behavior: "smooth"
            });

            // Mobile menu close
            if (nav.classList.contains("active")) {
                nav.classList.remove("active");
            }
        }

    });

});

/* ===========================
   Smooth Scroll
=========================== */

document.querySelectorAll("nav a").forEach(link => {

    link.addEventListener("click", function (e) {

        e.preventDefault();

        let target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});


/* ===========================
   Back To Top
=========================== */

// const topBtn = document.createElement("button");

// topBtn.innerHTML = "↑";

// topBtn.id = "topBtn";

// document.body.appendChild(topBtn);
const topBtn = document.getElementById("topBtn");

if (topBtn) {

    window.addEventListener("scroll", function () {

        if (window.scrollY > 400) {
            topBtn.style.display = "block";
        } else {
            topBtn.style.display = "none";
        }

    });

    topBtn.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}
/*==========================
      Gallery Lightbox
==========================*/

const images = document.querySelectorAll(".gallery img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.getElementById("close");

if (lightbox && lightboxImg && closeBtn) {

    images.forEach(image => {
        image.addEventListener("click", () => {
            lightbox.style.display = "flex";
            lightboxImg.src = image.src;
        });
    });

    closeBtn.addEventListener("click", () => {
        lightbox.style.display = "none";
    });

    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = "none";
        }
    });

}
/*==========================
      WhatsApp Booking
==========================*/

const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {

    bookingForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = document.getElementById("name").value;
        const phone = document.getElementById("phone").value;
        const email = document.getElementById("email").value;
        const trip = document.getElementById("trip").value;
        const members = document.getElementById("members").value;
        const message = document.getElementById("message").value;

        const text = `🚌 Inaindha Kaigal Trip Booking

👤 Name : ${name}
📞 Phone : ${phone}
📧 Email : ${email}
📍 Trip : ${trip}
👥 Members : ${members}
📝 Message : ${message}`;

        window.open(
            "https://wa.me/919500379744?text=" + encodeURIComponent(text),
            "_blank"
        );

    });

}
/* ==========================
   Statistics Counter
========================== */

const counters = document.querySelectorAll(".counter");

const speed = 150;

counters.forEach(counter => {

    function updateCounter() {

        const target = Number(counter.getAttribute("data-target"));
        const current = Number(counter.innerText);

        const increment = Math.ceil(target / speed);

        if (current < target) {

            counter.innerText = current + increment;

            setTimeout(updateCounter, 15);

        } else {

            counter.innerText = target + "+";

        }

    }

    updateCounter();

});
/* ==========================
      FAQ Accordion
========================== */

const questions = document.querySelectorAll(".faq-question");

questions.forEach(question => {

    question.addEventListener("click", () => {

        const answer = question.nextElementSibling;
        const icon = question.querySelector("span");

        document.querySelectorAll(".faq-answer").forEach(item => {

            if (item !== answer) {
                item.style.maxHeight = null;
            }

        });

        document.querySelectorAll(".faq-question span").forEach(item => {

            if (item !== icon) {
                item.textContent = "+";
            }

        });

        if (answer.style.maxHeight) {

            answer.style.maxHeight = null;
            icon.textContent = "+";

        } else {

            answer.style.maxHeight = answer.scrollHeight + "px";
            icon.textContent = "−";

        }

    });

});
/* ==========================
      Dark Mode
========================== */

const themeBtn = document.getElementById("theme-toggle");

if (themeBtn) {

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
        themeBtn.textContent = "☀️";
    }

    themeBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {
            themeBtn.textContent = "☀️";
            localStorage.setItem("theme", "dark");
        } else {
            themeBtn.textContent = "🌙";
            localStorage.setItem("theme", "light");
        }

    });

}
/*====================================
        WEBSITE LOADER
====================================*/

window.addEventListener("load", function () {

    const loader = document.getElementById("loader");

    if (loader) {
        setTimeout(() => {
            loader.classList.add("hide");
        }, 800);
    }

});
/*====================================
      Scroll Progress Bar
====================================*/

window.addEventListener("scroll", () => {

    const progressBar = document.getElementById("progress-bar");

    if (!progressBar) return;

    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress = (scrollTop / scrollHeight) * 100;

    progressBar.style.width = progress + "%";

});

/*====================================
      Active Navigation
====================================*/

const sections = document.querySelectorAll("section");

const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});
/*====================================
      TESTIMONIAL SLIDER
====================================*/

const testimonials = document.querySelectorAll(".testimonial");

let currentTestimonial = 0;

function changeTestimonial() {

    testimonials[currentTestimonial].classList.remove("active");

    currentTestimonial++;

    if (currentTestimonial >= testimonials.length) {

        currentTestimonial = 0;

    }

    testimonials[currentTestimonial].classList.add("active");

}

if (testimonials.length > 0) {
    setInterval(changeTestimonial, 5000);
}
