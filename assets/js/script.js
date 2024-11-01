(function() {
    // Laptop data
    const laptops = [
        { name: "Dell Inspiron 15", type: "Business", pricePerDay: 15 },
        { name: "MacBook Air M1", type: "Personal", pricePerDay: 20 },
        { name: "Lenovo ThinkPad X1", type: "Business", pricePerDay: 18 },
        { name: "HP Pavilion", type: "Gaming", pricePerDay: 25 },
        { name: "Acer Swift", type: "Personal", pricePerDay: 12 },
    ];

    // Function to display laptops based on the category filter
    function filterLaptops(type) {
        const laptopContainer = document.getElementById("laptop-list");
        laptopContainer.innerHTML = "";  // Clear previous content
        laptops
            .filter(laptop => type === "All" || laptop.type === type)
            .forEach(laptop => {
                const laptopCard = document.createElement("div");
                laptopCard.className = "col-md-4 mb-4";
                laptopCard.innerHTML = `
                    <div class="card">
                        <img src="assets/images/${laptop.name.replace(/ /g, "_")}.jpg" class="card-img-top" alt="${laptop.name}">
                        <div class="card-body">
                            <h5 class="card-title">${laptop.name}</h5>
                            <p class="card-text">$${laptop.pricePerDay} per day - ${laptop.type} Laptop</p>
                            <button class="btn btn-primary rent-btn" onclick="rentNow('${laptop.name}')">Rent Now</button>
                        </div>
                    </div>
                `;
                laptopContainer.appendChild(laptopCard);
            });
    }

    // Event Listener on page load to initialize buttons
    document.addEventListener("DOMContentLoaded", () => {
        filterLaptops("All");  // Display all laptops by default

        // Add event listeners to filter buttons
        document.querySelectorAll(".filter-btn").forEach(button => {
            button.addEventListener("click", () => {
                const filterType = button.getAttribute("data-filter");
                filterLaptops(filterType);  // Call filter function with the category
                // Update active button style
                document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");
            });
        });
    });

    // Rent Now button functionality (kept as is)
    window.rentNow = function(laptopName) {
        const laptop = laptops.find(lap => lap.name === laptopName);
        if (laptop) {
            alert(`${laptop.name} is added to your cart!`);
        } else {
            alert("Laptop not found!");
        }
    };
})();
