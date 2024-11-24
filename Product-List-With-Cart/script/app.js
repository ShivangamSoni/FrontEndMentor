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

const productsList = document.querySelector("#products");

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
    addItem(product) {
        product.qty = 1;
        this.total += product.qty * product.price;
        this.items.push(product);
        return product;
    },
    deleteItem(product) {
        this.items = this.items.filter((a) => a != product);
        this.total -= product.qty * product.price;
        product.qty = 0;
        return product;
    },
    increaseQty(product) {
        product.qty += 1;
        this.total += product.price;
        return product;
    },
    decreaseQty(product) {
        if (product.qty == 1) {
            return this.deleteItem(product);
        }
        product.qty -= 1;
        this.total -= product.price;
        return product;
    },
};

function renderCart() {}

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

    addBtn.setAttribute("aria-label", `Add ${name} to cart`);

    addBtn.addEventListener("click", () => {
        product = CartStore.addItem(product);
        item.setAttribute("aria-selected", true);
        qty.textContent = product.qty;
    });

    decBtn.addEventListener("click", () => {
        CartStore.decreaseQty(product);
        qty.textContent = product.qty;
        if (product.qty == 0) {
            item.setAttribute("aria-selected", false);
        }
    });

    incBtn.addEventListener("click", () => {
        CartStore.increaseQty(product);
        qty.textContent = product.qty;
    });

    return item;
}

(async () => {
    await ProductStore.fetchProducts();
    console.log(ProductStore.products);

    ProductStore.products.forEach((data) =>
        productsList.appendChild(renderProduct(data))
    );
})();
