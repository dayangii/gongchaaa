
$(document).ready(function () {
    const $filterButtons = $(".filter-btn");
    const $menuCards = $(".menu-card");
    const $showMoreBtn = $("#showMoreBtn");
    const $showLessBtn = $("#showLessBtn");

    const initialItemsToShow = 4; // Initially show 4 items
    let itemsVisible = initialItemsToShow;

    // Initially hide extra items
    $menuCards.each(function (index) {
        if (index >= initialItemsToShow) {
            $(this).hide();
        }
    });

    // Show More functionality
    $showMoreBtn.on("click", function () {
        // Show all items
        $menuCards.show();
        $showMoreBtn.hide(); // Hide the "Show More" button
        $showLessBtn.show(); // Show the "Show Less" button
        itemsVisible = $menuCards.length; // Update the visible count

        // Force a layout reflow to recalculate the button's position
        forceLayoutReflow();
    });

    // Show Less functionality
    $showLessBtn.on("click", function () {
        // Hide extra items
        $menuCards.each(function (index) {
            if (index >= initialItemsToShow) {
                $(this).hide();
            }
        });
        $showLessBtn.hide(); // Hide the "Show Less" button
        $showMoreBtn.show(); // Show the "Show More" button
        itemsVisible = initialItemsToShow;

        // Force a layout reflow to recalculate the button's position
        forceLayoutReflow();
    });

    // Category filter functionality
    $filterButtons.on("click", function () {
        const filterCategory = $(this).data("filter");

        if (filterCategory === "all") {
            // Show all items
            $menuCards.show();
        } else {
            $menuCards.each(function () {
                const $card = $(this);
                if ($card.data("category") === filterCategory) {
                    $card.show();
                } else {
                    $card.hide();
                }
            });
        }

        // Reset the "Show More / Show Less" state to show the initial set of items
        resetShowMoreState();

        // Force a layout reflow to recalculate the button's position
        forceLayoutReflow();
    });

    // Reset Show More / Show Less state after filtering
    function resetShowMoreState() {
        $menuCards.each(function (index) {
            if (index >= initialItemsToShow) {
                $(this).hide();
            }
        });
        $showMoreBtn.show();
        $showLessBtn.hide();
        itemsVisible = initialItemsToShow;
    }

    // Function to force layout recalculation for centering
    function forceLayoutReflow() {
        // Force a reflow/repaint of the layout
        setTimeout(function() {
            $(window).trigger('resize'); // Trigger resize event to recalculate positioning
        }, 100);
    }

    // Flip card functionality
    $(".flip-card-front img").on("click", function () {
        const $flipCard = $(this).closest(".flip-card");
        $flipCard.toggleClass("flipped");
    });
    var swiper = new Swiper(".mySwiper", {
        effect: "coverflow", // Apply the coverflow effect
        grabCursor: true, // Enable grabbing the slides
        centeredSlides: true, // Center the active slide
        slidesPerView: "auto", // Automatically adjust the number of slides visible based on the container's size
        coverflowEffect: {
            rotate: 15, // Rotation of the slides
            stretch: 0, // Stretching the slides
            depth: 300, // Depth of the effect
            modifier: 1, // Intensity of the effect
            slideShadows: true, // Enable slide shadows
        },
        loop: true, // Enable infinite loop
    });
});

