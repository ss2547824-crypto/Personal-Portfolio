/* ================= CART ================= */

let cart = JSON.parse(
    localStorage.getItem("mangoCart")
) || [];


/* SAVE CART */

function saveCart() {

    localStorage.setItem(
        "mangoCart",
        JSON.stringify(cart)
    );

    renderCart();
}


/* ADD ITEM */

function addToCart(name, price) {

    const existingItem =
        cart.find(item => item.name === name);

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }

    saveCart();

    showToast(
        name + " added to your order"
    );

    openCart();
}


/* REMOVE ITEM */

function removeItem(index) {

    cart.splice(index, 1);

    saveCart();
}


/* RENDER CART */

function renderCart() {

    const cartCount =
        document.getElementById("cartCount");

    const cartItems =
        document.getElementById("cartItems");

    const cartTotal =
        document.getElementById("cartTotal");


    const totalQuantity =
        cart.reduce(
            (sum, item) =>
                sum + item.quantity,
            0
        );


    cartCount.textContent =
        totalQuantity;


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p style="color:#777">
                Your order is empty.
                Add something delicious
                from our menu.
            </p>
        `;

    } else {

        cartItems.innerHTML =
            cart.map(
                (item, index) => `

                <div class="cart-row">

                    <span>
                        ${item.name}
                        × ${item.quantity}
                    </span>

                    <strong>
                        ₹${item.price * item.quantity}
                    </strong>

                    <button
                        class="remove"
                        onclick="removeItem(${index})"
                    >
                        Remove
                    </button>

                </div>

            `
            ).join("");

    }


    const total =
        cart.reduce(
            (sum, item) =>
                sum +
                item.price *
                item.quantity,
            0
        );


    cartTotal.textContent =
        "₹" + total;

}


/* ================= CART OPEN ================= */

function openCart() {

    document
        .getElementById("cartDrawer")
        .classList.add("open");

    document
        .getElementById("cartOverlay")
        .classList.add("open");

    renderCart();
}


/* ================= CART CLOSE ================= */

function closeCart() {

    document
        .getElementById("cartDrawer")
        .classList.remove("open");

    document
        .getElementById("cartOverlay")
        .classList.remove("open");

}


/* ================= CHECKOUT ================= */

function checkout() {

    if (cart.length === 0) {

        showToast(
            "Please add an item first."
        );

        return;
    }


    let order =
        cart
            .map(
                item =>
                    `${item.name} x${item.quantity}`
            )
            .join(", ");


    showToast(
        "Order ready: " + order
    );

}


/* ================= TABLE BOOKING ================= */

function bookTable(event) {

    event.preventDefault();


    const name =
        document.getElementById(
            "guestName"
        ).value;

    const time =
        document.getElementById(
            "bookingTime"
        ).value;

    const guests =
        document.getElementById(
            "guestNumber"
        ).value;


    showToast(
        `Thank you ${name}! Table request for ${guests} at ${time} received.`
    );


    event.target.reset();

}


/* ================= TOAST ================= */

function showToast(message) {

    const toast =
        document.getElementById("toast");


    toast.textContent =
        message;


    toast.classList.add("show");


    clearTimeout(
        window.toastTimer
    );


    window.toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            3000
        );

}


/* ================= PAGE LOAD ================= */

window.addEventListener(
    "load",
    function () {

        setTimeout(
            () => {

                document
                    .getElementById(
                        "loader"
                    )
                    .style.opacity = "0";

            },
            800
        );


        setTimeout(
            () => {

                document
                    .getElementById(
                        "loader"
                    )
                    .style.display =
                    "none";

            },
            1500
        );


        renderCart();


        /* Minimum booking date */

        const tomorrow =
            new Date();

        tomorrow.setDate(
            tomorrow.getDate() + 1
        );


        const dateString =
            tomorrow
                .toISOString()
                .split("T")[0];


        document
            .getElementById(
                "bookingDate"
            )
            .min = dateString;

    }
);


/* ================= 3D MOUSE EFFECT ================= */

document.addEventListener(
    "mousemove",
    function (event) {

        document
            .querySelectorAll(".dish")
            .forEach(card => {

                const rect =
                    card.getBoundingClientRect();


                if (
                    rect.top <
                    window.innerHeight &&
                    rect.bottom > 0
                ) {

                    const x =
                        (event.clientX -
                            rect.left) /
                        rect.width -
                        0.5;


                    const y =
                        (event.clientY -
                            rect.top) /
                        rect.height -
                        0.5;


                    card.style.transform = `
                        perspective(800px)
                        rotateY(${x * 5}deg)
                        rotateX(${-y * 5}deg)
                        translateY(-5px)
                    `;

                }

            });

    }
);


/* RESET CARD */

document.addEventListener(
    "mouseleave",
    function () {

        document
            .querySelectorAll(".dish")
            .forEach(card => {

                card.style.transform =
                    "";

            });

    }
);