
// ===================================
// INAIN DHA KAIGAL - CUSTOMER REVIEWS
// ===================================

const SUPABASE_URL = "https://heotjgiukyawvjqolhql.supabase.co";

const SUPABASE_ANON_KEY = "sb_publishable_YujDVA2YC1SRZ2qnOu5Y-A_m4eRNDKY";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

const reviewForm = document.getElementById("reviewForm");
const reviewStatus = document.getElementById("reviewMessageStatus");
const approvedReviews = document.getElementById("approvedReviews");

const prevButton = document.getElementById("reviewsPrev");
const nextButton = document.getElementById("reviewsNext");

let currentReviewPage = 0;
let allApprovedReviews = [];


// ===================================
// RESPONSIVE REVIEWS PER PAGE
// ===================================

function getReviewsPerPage() {

    const screenWidth = window.innerWidth;

    if (screenWidth <= 600) {
        return 1; // Mobile
    }

    if (screenWidth <= 900) {
        return 4; // Tablet
    }

    return 6; // Desktop
}


// ===================================
// LOAD APPROVED REVIEWS
// ===================================

async function loadApprovedReviews() {

    if (!approvedReviews) return;

    const { data, error } = await supabaseClient
        .from("reviews")
        .select("id, customer_name, rating, review_text, created_at")
        .eq("status", "approved")
        .order("created_at", { ascending: false });

    if (error) {

        console.error("Could not load reviews:", error.message);

        approvedReviews.textContent = "Unable to load reviews.";

        return;
    }

    allApprovedReviews = data || [];

    currentReviewPage = 0;

    renderApprovedReviews();
}

// ===================================
// DISPLAY REVIEWS
// ===================================

function renderApprovedReviews() {

    if (!approvedReviews) return;

    approvedReviews.replaceChildren();

    const reviewsPerPage = getReviewsPerPage();

    const totalPages = Math.ceil(
        allApprovedReviews.length / reviewsPerPage
    );

    currentReviewPage = Math.max(
        0,
        Math.min(currentReviewPage, totalPages - 1)
    );

    // No approved reviews

    if (allApprovedReviews.length === 0) {

        const emptyMessage = document.createElement("p");

        emptyMessage.textContent =
            "No reviews yet. Be the first to share your experience!";

        approvedReviews.appendChild(emptyMessage);

        updateReviewArrows();

        return;
    }

    const startIndex = currentReviewPage * reviewsPerPage;

    const pageReviews = allApprovedReviews.slice(
        startIndex,
        startIndex + reviewsPerPage
    );

    pageReviews.forEach(review => {

        // Review Card

        const card = document.createElement("div");

        card.className = "review-card";

        // Review Header Button

        const header = document.createElement("button");

        header.type = "button";
        header.className = "review-header";
        header.setAttribute("aria-expanded", "false");

        // Customer Name

        const name = document.createElement("span");

        name.className = "review-name";

        name.textContent = review.customer_name || "Customer";

        // Star Rating

        const stars = document.createElement("span");

        stars.className = "review-stars";

        const rating = Math.max(
            0,
            Math.min(5, Number(review.rating) || 0)
        );

        stars.textContent =
            "★".repeat(rating) + "☆".repeat(5 - rating);

        // Dropdown Arrow

        const arrow = document.createElement("span");

        arrow.className = "review-arrow";

        arrow.textContent = "⌄";

        // Append Header Elements

        header.append(name, stars, arrow);

        // Review Message

        const message = document.createElement("div");

        message.className = "review-message";

        message.hidden = true;

        const messageText = document.createElement("p");

        messageText.textContent = review.review_text || "";

        message.appendChild(messageText);

        // Expand / Collapse Review

        header.addEventListener("click", () => {

            const isOpen =
                header.getAttribute("aria-expanded") === "true";

            // Close all other reviews

            approvedReviews
                .querySelectorAll(".review-header")
                .forEach(item => {

                    item.setAttribute("aria-expanded", "false");

                    const itemArrow =
                        item.querySelector(".review-arrow");

                    if (itemArrow) {
                        itemArrow.textContent = "⌄";
                    }

                    if (item.nextElementSibling) {
                        item.nextElementSibling.hidden = true;
                    }
                });

            // Open selected review

            if (!isOpen) {

                header.setAttribute("aria-expanded", "true");

                arrow.textContent = "⌃";

                message.hidden = false;
            }

        });

        card.append(header, message);

        approvedReviews.appendChild(card);

    });

    updateReviewArrows();
}

// ===================================
// UPDATE PREVIOUS / NEXT ARROWS
// ===================================

function updateReviewArrows() {

    const reviewsPerPage = getReviewsPerPage();

    const totalPages = Math.ceil(
        allApprovedReviews.length / reviewsPerPage
    );

    if (prevButton) {
        prevButton.disabled = currentReviewPage <= 0;
    }

    if (nextButton) {
        nextButton.disabled =
            currentReviewPage >= totalPages - 1;
    }
}

// ===================================
// PREVIOUS BUTTON
// ===================================

if (prevButton) {

    prevButton.addEventListener("click", () => {

        if (currentReviewPage > 0) {

            currentReviewPage--;

            renderApprovedReviews();
        }

    });

}

// ===================================
// NEXT BUTTON
// ===================================

if (nextButton) {

    nextButton.addEventListener("click", () => {

        const totalPages = Math.ceil(
            allApprovedReviews.length / getReviewsPerPage()
        );

        if (currentReviewPage < totalPages - 1) {

            currentReviewPage++;

            renderApprovedReviews();
        }

    });

}


// ===================================
// RESPONSIVE SCREEN SIZE CHANGE
// ===================================

let previousReviewsPerPage = getReviewsPerPage();

window.addEventListener("resize", () => {

    const newReviewsPerPage = getReviewsPerPage();

    // Re-render only when layout category changes

    if (newReviewsPerPage !== previousReviewsPerPage) {

        const oldStartIndex =
            currentReviewPage * previousReviewsPerPage;

        previousReviewsPerPage = newReviewsPerPage;

        // Keep the current review position as closely as possible

        currentReviewPage = Math.floor(
            oldStartIndex / newReviewsPerPage
        );

        renderApprovedReviews();
    }

});


// ===================================
// SUBMIT REVIEW
// ===================================

if (reviewForm) {

    reviewForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        if (reviewStatus) {
            reviewStatus.textContent = "Submitting your review...";
        }

        const customerName =
            document.getElementById("reviewName")?.value.trim();

        const rating =
            Number(document.getElementById("reviewRating")?.value);

        const reviewText =
            document.getElementById("reviewMessage")?.value.trim();

        if (
            !customerName ||
            !reviewText ||
            !Number.isInteger(rating) ||
            rating < 1 ||
            rating > 5
        ) {

            if (reviewStatus) {
                reviewStatus.textContent = "Please fill in all fields.";
            }

            return;
        }

        const { error } = await supabaseClient
            .from("reviews")
            .insert({
                customer_name: customerName,
                rating: rating,
                review_text: reviewText,
                status: "pending"
            });

        if (error) {

            console.error("Review submission error:", error);

            if (reviewStatus) {
                reviewStatus.textContent =
                    "Review could not be submitted. Please try again.";
            }

            return;
        }

        reviewForm.reset();

        if (reviewStatus) {
            reviewStatus.textContent =
                "Thank you! Your review will appear after approval.";
        }

    });

}

// ===================================
// INITIALIZE
// ===================================

loadApprovedReviews();
