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

// Load approved reviews
async function loadApprovedReviews() {
    if (!approvedReviews) return;

    const { data, error } = await supabaseClient
        .from("reviews")
        .select("id, customer_name, rating, review_text, created_at")
        .eq("status", "approved")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Could not load reviews:", error.message);
        return;
    }

    approvedReviews.replaceChildren();

    data.forEach(review => {
        const card = document.createElement("div");
        card.className = "review-card";

        const stars = document.createElement("p");
        stars.textContent = "★".repeat(review.rating) +
            "☆".repeat(5 - review.rating);

        const name = document.createElement("h4");
        name.textContent = review.customer_name;

        const message = document.createElement("p");
        message.textContent = review.review_text;

        card.append(stars, name, message);
        approvedReviews.appendChild(card);
    });
}

// Submit review for approval
if (reviewForm) {
    reviewForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        if (reviewStatus) {
            reviewStatus.textContent = "Submitting your review...";
        }

        const customerName =
            document.getElementById("reviewName").value.trim();

        const rating =
            Number(document.getElementById("reviewRating").value);

        const reviewText =
            document.getElementById("reviewMessage").value.trim();

        if (!customerName || !reviewText || rating < 1 || rating > 5) {
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
            console.error(error);
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

loadApprovedReviews();