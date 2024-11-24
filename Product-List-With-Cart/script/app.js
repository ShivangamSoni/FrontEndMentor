tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: {
                    red: "hsl(14, 86%, 42%)",
                    green: "hsl(159, 69%, 38%)",
                    rose: {
                        50: "hsl(20, 50%, 98%)",
                        100: "hsl(13, 31%, 94%)",
                        300: "hsl(14, 25%, 72%)",
                        400: "hsl(7, 20%, 60%)",
                        500: "hsl(12, 20%, 44%)",
                        900: "hsl(14, 65%, 9%)",
                    },
                },
            },
            fontFamily: {
                primary: ["Red Hat Text", "sans-serif"],
            },
            gridTemplateColumns: {
                app: "2fr 1fr",
            },
            gridTemplateRows: {
                app: "auto 1fr",
            },
        },
    },
};

const productItemTemplate = document.querySelector("#product-item-template");
const cartItemTemplate = document.querySelector("#cart-item-template");
const summaryItemTemplate = document.querySelector("#summary-item-template");

const productsList = document.querySelector(".products");
const cart = document.querySelector(".cart");
const cartCount = document.querySelector(".cart__count");
const cartList = document.querySelector(".cart__list");
const cartTotal = document.querySelector(".cart__total");
const cartBtn = document.querySelector(".cart__btn");
const summary = document.querySelector(".summary");
const summaryList = document.querySelector(".summary__list");
const summaryTotal = document.querySelector(".summary__total");
const summaryBtn = document.querySelector(".summary__btn");

const ProductStore = {
    products: null,
    async fetchProducts() {
        if (!this.products) {
            const res = await fetch("data.json");
            this.products = await res.json();
        }
    },
};

const CartStore = {
    items: [],
    total: 0,
    qty: 0,
    callbacks: [],
    addCB(cb) {
        this.callbacks.push(cb);
    },
    invokeCBs() {
        this.callbacks.forEach((cb) => cb());
    },
    addItem(product) {
        product.qty = 1;
        this.total += product.qty * product.price;
        this.qty += 1;
        this.items.push(product);
        this.invokeCBs();
        return product;
    },
    deleteItem(product) {
        this.items = this.items.filter((a) => a != product);
        this.total -= product.qty * product.price;
        this.qty -= product.qty;
        product.qty = 0;
        this.invokeCBs();
        return product;
    },
    increaseQty(product) {
        product.qty += 1;
        this.qty += 1;
        this.total += product.price;
        this.invokeCBs();
        return product;
    },
    decreaseQty(product) {
        if (product.qty == 1) {
            return this.deleteItem(product);
        }
        product.qty -= 1;
        this.qty -= 1;
        this.total -= product.price;
        this.invokeCBs();
        return product;
    },
    clearCart() {
        this.items.forEach((item) => (item.qty = 0));
        this.items = [];
        this.total = 0;
        this.qty = 0;
        this.invokeCBs();
    },
};

function renderSummaryItem(product) {
    const {
        image: { thumbnail },
        name,
        qty,
        price,
    } = product;
    const item = summaryItemTemplate.content.cloneNode(true);
    item.querySelector(".item__thumb").setAttribute("src", thumbnail);
    item.querySelector(".item__name").textContent = name;
    item.querySelector(".item__qty").textContent = `${qty}x`;
    item.querySelector(".item__price").textContent = `@ $${price.toFixed(2)}`;
    item.querySelector(".item__total").textContent = `$${(qty * price).toFixed(
        2
    )}`;
    return item;
}

function renderSummary() {
    summaryList.innerHTML = "";
    CartStore.items.forEach((item) =>
        summaryList.appendChild(renderSummaryItem(item))
    );
    summaryTotal.textContent = `$${CartStore.total.toFixed(2)}`;
    summary.setAttribute("aria-hidden", false);
    summaryBtn.addEventListener("click", () => {
        summary.setAttribute("aria-hidden", true);
        CartStore.clearCart();
    });
}

function renderCartItem(product) {
    const { name, price, qty } = product;
    const item = cartItemTemplate.content.cloneNode(true);
    item.querySelector(".item__name").textContent = name;
    item.querySelector(".item__qty").textContent = `${qty}x`;
    item.querySelector(".item__price").textContent = `@ $${price.toFixed(2)}`;
    item.querySelector(".item__total").textContent = `$${(price * qty).toFixed(
        2
    )}`;
    const removeBtn = item.querySelector(".item__remove");
    removeBtn.querySelector(
        ".sr-only"
    ).textContent = `Delete ${name} from cart`;
    removeBtn.addEventListener("click", () => {
        CartStore.deleteItem(product);
    });
    return item;
}

function renderCart() {
    cartCount.textContent = `(${CartStore.qty})`;
    if (CartStore.items.length == 0) {
        cart.dataset.cartEmpty = true;
        return;
    }
    cart.dataset.cartEmpty = false;
    cartTotal.textContent = `$${CartStore.total.toFixed(2)}`;
    cartList.innerHTML = "";
    CartStore.items.forEach((item) =>
        cartList.appendChild(renderCartItem(item))
    );

    cartBtn.addEventListener("click", () => {
        renderSummary();
    });
}

function renderProduct(product) {
    const { image, name, category, price } = product;
    const item = productItemTemplate.content
        .cloneNode(true)
        .querySelector("li");
    const addBtn = item.querySelector(".product__add");
    const decBtn = item.querySelector(".product__dec");
    const incBtn = item.querySelector(".product__inc");
    const qty = item.querySelector(".product__qty");

    item.querySelector(".product__desktop").setAttribute(
        "srcset",
        image.desktop
    );
    item.querySelector(".product__tablet").setAttribute("srcset", image.tablet);
    item.querySelector(".product__mobile").setAttribute("src", image.mobile);
    item.querySelector(".product__tag").textContent = category;
    item.querySelector(".product__title").textContent = name;
    item.querySelector(".product__price").textContent = `$${price.toFixed(2)}`;
    decBtn.querySelector(
        ".sr-only"
    ).textContent = `Decrease Quantity of ${name}`;
    incBtn.querySelector(
        ".sr-only"
    ).textContent = `Increase Quantity of ${name}`;

    if (!product.qty || product.qty == 0) {
        item.setAttribute("aria-selected", false);
    } else {
        item.setAttribute("aria-selected", true);
    }

    qty.textContent = product.qty ?? 0;

    addBtn.setAttribute("aria-label", `Add ${name} to cart`);

    addBtn.addEventListener("click", () => {
        product = CartStore.addItem(product);
    });

    decBtn.addEventListener("click", () => {
        CartStore.decreaseQty(product);
    });

    incBtn.addEventListener("click", () => {
        CartStore.increaseQty(product);
    });

    return item;
}

function renderProductList() {
    productsList.innerHTML = "";
    ProductStore.products.forEach((data) =>
        productsList.appendChild(renderProduct(data))
    );
}

(async () => {
    await ProductStore.fetchProducts();
    renderProductList();
    renderCart();
    CartStore.addCB(renderCart);
    CartStore.addCB(renderProductList);
})();
