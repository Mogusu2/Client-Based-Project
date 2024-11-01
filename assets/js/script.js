(function() {
    // Laptop data
    const laptops = [
        { name: "Apple MacBook Air 13 (2020)", type: "Business", pricePerDay: 15 },
        { name: "Apple MacBook Air M1", type: "Personal", pricePerDay: 20 },
        { name: "Apple MacBook Pro 14", type: "Business", pricePerDay: 18 },
        { name: "Apple MacBook Pro 16 (2019)", type: "Gaming", pricePerDay: 25 },
        { name: "Apple MacBook Pro 16 (2021)", type: "Personal", pricePerDay: 12 },
        { name: "Dell XPS 13", type: "Personal", pricePerDay: 24 },
        { name: "Dell XPS 15", type: "Personal", pricePerDay: 18 },
        { name: "Dell XPS 17", type: "Business", pricePerDay: 23 },
        { name: "NMAX", type: "Gaming", pricePerDay: 12 },
        { name: "Surface Laptop 5 13", type: "Personal", pricePerDay: 32 },
        { name: "Surface Laptop 5 15", type: "Personal", pricePerDay: 22 },
        { name: "Surface Laptop 5 16", type: "Business", pricePerDay: 42 },
        { name: "Surface Laptop Studio 2", type: "Business", pricePerDay: 27 },
        { name: "VivoBook Pro", type: "Gaming", pricePerDay: 28 },
        { name: "ZenBook Flip", type: "Gaming", pricePerDay: 39 },
        { name: "ZenBook Fold", type: "Business", pricePerDay: 19 },
        { name: "ZenBook Pro", type: "Personal", pricePerDay: 17 },
    ];

    // Cart data
    let cart = [];

    // Rent Now button action
    function rentNow(laptopName) {
        const laptop = laptops.find(lap => lap.name === laptopName);
        if (laptop) {
            addToCart(laptop);
            showCart();
        } else {
            alert("Laptop not found!");
        }
    }

    // Add laptop to cart
    function addToCart(laptop) {
        const existing = cart.find(item => item.name === laptop.name);
        if (existing) {
            alert(`${laptop.name} is already in your cart.`);
        } else {
            cart.push({ ...laptop, days: 1 });
            alert(`${laptop.name} added to your cart.`);
        }
    }

    // Show cart contents
    function showCart() {
        const cartContainer = document.getElementById("cart-items");
        cartContainer.innerHTML = "";
        cart.forEach(item => {
            const itemRow = document.createElement("div");
            itemRow.className = "cart-item row mb-2";
            itemRow.innerHTML = `
                <div class="col-6">${item.name}</div>
                <div class="col-3">$${item.pricePerDay} x ${item.days} days</div>
                <div class="col-3">$${(item.pricePerDay * item.days).toFixed(2)}</div>
            `;
            cartContainer.appendChild(itemRow);
        });
        updateTotal();
    }

    // Update total rental cost
    function updateTotal() {
        const totalPrice = cart.reduce((acc, item) => acc + item.pricePerDay * item.days, 0);
        document.getElementById("total-price").innerText = `$${totalPrice.toFixed(2)}`;
    }

    // Filter laptops based on type
    function filterLaptops(type) {
        const laptopContainer = document.getElementById("laptop-list");
        laptopContainer.innerHTML = "";
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

    // Initialize default view
    document.addEventListener("DOMContentLoaded", () => {
        filterLaptops("All");
        showCart();

        // Setup filter buttons
        document.querySelectorAll(".filter-btn").forEach(button => {
            button.addEventListener("click", () => {
                filterLaptops(button.dataset.filter);
                document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");
            });
        });
    });

    // Make functions available globally (optional)
    window.rentNow = rentNow;
})();
