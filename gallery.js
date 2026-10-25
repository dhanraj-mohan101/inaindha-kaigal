
const tripHome = document.getElementById("tripHome");
const tripGallery = document.getElementById("tripGallery");
const galleryGrid = document.getElementById("galleryGrid");

const tripTitle = document.getElementById("tripTitle");
const tripEyebrow = document.getElementById("tripEyebrow");
const tripDescription = document.getElementById("tripDescription");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxVideo = document.getElementById("lightboxVideo");
const photoCounter = document.getElementById("photoCounter");

let activePhotos = [];
let activeIndex = 0;

const trips = {
    aanakatti: {
        title: "Aanakatti Trip",
        eyebrow: "FRIENDS • NATURE • MEMORIES",
        description: "Our Aanakatti travel memories",
        photos: [
            {
                src: "images/Trip-1/aanakatti-2.jpeg",
                alt: "Aanakatti trip friends"
            },
            {
                src: "images/Trip-1/aanakatti-3.jpeg",
                alt: "Aanakatti group photo"
            },
            {
                src: "images/Trip-1/aanakatti-4.webp",
                alt: "Aanakatti trip memories"
            }
        ]
    },
    marayoor: {
        title: "Marayoor Trip",
        eyebrow: "FRIENDS • NATURE • MEMORIES",
        description: "February 6, 7 & 8, 2026",
        photos: [
            {
                src: "images/Marayoor/marayoor-1.jpeg",
                alt: "Marayoor trip photo 1"
            },
            {
                src: "images/Marayoor/marayoor-2.jpeg",
                alt: "Marayoor trip photo 2"
            },
            {
                src: "images/Marayoor/marayoor-3.jpeg",
                alt: "Marayoor trip photo 3"
            },
            {
                src: "images/Marayoor/marayoor-4.jpeg",
                alt: "Marayoor trip photo 4"
            },
            {
                src: "images/Marayoor/marayoor-5.webp",
                alt: "Marayoor trip photo 5"
            },
            {
                src: "images/Marayoor/marayoor-video-1.mp4",
                type: "video",
                alt: "Marayoor trip video 1"
            },
            {
                src: "images/Marayoor/marayoor-video-2.mp4",
                type: "video",
                alt: "Marayoor trip video 2"
            },
            {
                src: "images/Marayoor/marayoor-video-3.mp4",
                type: "video",
                alt: "Marayoor trip video 3"
            },
            {
                src: "images/Marayoor/marayoor-video-4.mp4",
                type: "video",
                alt: "Marayoor trip video 4"
            },
            {
                src: "images/Marayoor/marayoor-video-5.mp4",
                type: "video",
                alt: "Marayoor trip video 5"
            },
            {
                src: "images/Marayoor/marayoor-video-6.mp4",
                type: "video",
                alt: "Marayoor trip video 6"
            }
        ]
    },
    marayoor2: {
        title: "Marayoor Trip 2",
        eyebrow: "NEW JOURNEY • NEW MEMORIES",
        description: "Marayoor second trip",
        photos: [
            {
                src: "images/Marayoor-2/marayoor2-1.webp",
                alt: "Marayoor second trip photo 1"
            },
            {
                src: "images/Marayoor-2/marayoor2-2.webp",
                alt: "Marayoor second trip photo 2"
            },
            {
                src: "images/Marayoor-2/marayoor2-3.webp",
                alt: "Marayoor second trip photo 3"
            },
            {
                src: "images/Marayoor-2/marayoor2-4.webp",
                alt: "Marayoor second trip photo 4"
            },
        ]
    },
    wayanad: {
        title: "Wayanad Trip",
        eyebrow: "FRIENDS • NATURE • MEMORIES",
        description: "Our Wayanad travel memories",
        photos: [
            {
                src: "images/wayanad/wayanad-1.webp",
                alt: "Wayanad trip photo 1"
            },
            {
                src: "images/wayanad/wayanad-2.webp",
                alt: "Wayanad trip photo 2"
            },
            {
                src: "images/wayanad/wayanad-3.webp",
                alt: "Wayanad trip photo 3"
            },
            {
                src: "images/wayanad/wayanad-4.jpeg",
                alt: "Wayanad trip photo 4"
            },
            {
                src: "images/wayanad/wayanad-5.jpeg",
                alt: "Wayanad trip photo 5"
            }
        ]
    },
    kasaragod: {
        title: "Kasaragod Trip",
        eyebrow: "TRIP MEMORIES",
        description: "October 2–4, 2026",
        photos: Array.from({ length: 18 }, (_, i) => ({
            src: `images/kasaragod/kasaragod-${i + 1}.jpg.jpeg`,
            alt: `Kasaragod trip photo ${i + 1}`
        }))
    }
};

document.querySelectorAll(".view-gallery").forEach(button => {
    button.addEventListener("click", () => {
        const trip = trips[button.dataset.trip];
        if (!trip) return;

        activePhotos = trip.photos;

        tripTitle.textContent = trip.title;
        tripEyebrow.textContent = trip.eyebrow;
        tripDescription.textContent = trip.description;

        galleryGrid.replaceChildren();

        trip.photos.forEach((photo, index) => {
            const card = document.createElement("button");
            card.className = "gallery-item";
            card.type = "button";

            if (photo.type === "video") {
                const video = document.createElement("video");
                video.src = photo.src;
                video.muted = true;
                video.preload = "metadata";
                video.playsInline = true;
                card.appendChild(video);
            } else {
                const image = document.createElement("img");
                image.src = photo.src;
                image.alt = photo.alt;
                image.loading = "lazy";
                card.appendChild(image);
            }

            card.addEventListener("click", () => openPhoto(index));
            galleryGrid.appendChild(card);
        });

        tripHome.hidden = true;
        tripGallery.hidden = false;
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});

document.getElementById("backToTrips").addEventListener("click", () => {
    closePhoto();
    tripGallery.hidden = true;
    tripHome.hidden = false;
    window.scrollTo({ top: 0, behavior: "smooth" });
});

function openPhoto(index) {
    activeIndex = index;
    showPhoto();
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
}

function showPhoto() {
    const photo = activePhotos[activeIndex];

    if (photo.type === "video") {
        lightboxImage.hidden = true;
        lightboxImage.src = "";

        lightboxVideo.hidden = false;
        lightboxVideo.src = photo.src;
        lightboxVideo.currentTime = 0;
        lightboxVideo.load();
        lightboxVideo.play().catch(() => { });
    } else {
        lightboxVideo.pause();
        lightboxVideo.removeAttribute("src");
        lightboxVideo.load();
        lightboxVideo.hidden = true;

        lightboxImage.hidden = false;
        lightboxImage.src = photo.src;
        lightboxImage.alt = photo.alt;
    }

    photoCounter.textContent =
        `${activeIndex + 1} / ${activePhotos.length}`;
}

function closePhoto() {
    lightbox.classList.remove("active");

    lightboxImage.src = "";
    lightboxVideo.pause();
    lightboxVideo.removeAttribute("src");
    lightboxVideo.load();

    lightboxImage.hidden = false;
    lightboxVideo.hidden = true;
    document.body.style.overflow = "";
}

function changePhoto(direction) {
    activeIndex =
        (activeIndex + direction + activePhotos.length)
        % activePhotos.length;

    showPhoto();
}

document.getElementById("closeButton")
    .addEventListener("click", closePhoto);

document.getElementById("prevPhoto")
    .addEventListener("click", () => changePhoto(-1));

document.getElementById("nextPhoto")
    .addEventListener("click", () => changePhoto(1));

lightbox.addEventListener("click", event => {
    if (event.target === lightbox) closePhoto();
});

document.addEventListener("keydown", event => {
    if (!lightbox.classList.contains("active")) return;

    if (event.key === "Escape") closePhoto();
    if (event.key === "ArrowLeft") changePhoto(-1);
    if (event.key === "ArrowRight") changePhoto(1);
});
