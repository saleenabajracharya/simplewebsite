let cart_items = JSON.parse(localStorage.getItem("cart")) || [];

let counter = () => {
    let cart_number = JSON.parse(localStorage.getItem("cart"))?.length || 0;
    document.querySelector("#cart-count").innerText = cart_number;
};

counter();

cart_items.map((item, index) => {
    let cart_container = document.createElement("div");
    cart_container.setAttribute("class", "item");
    let img = document.createElement("img");
    img.setAttribute("src", item.image);

    let category = document.createElement("p");
    category.innerHTML = item.category;

    let brand = document.createElement("p");
    brand.innerHTML = item.brand;

    let title = document.createElement("p");
    title.innerHTML = item.title;

    let price = document.createElement("p");
    price.innerHTML = item.price;

    let btn = document.createElement("button");
    btn.innerHTML = "Remove";
    btn.setAttribute("class", "remove");
    btn.addEventListener("click", () => {
        cart_items = cart_items.filter((cart_item, ind_no) => {
            return ind_no !== index;
        });

        localStorage.setItem("cart", JSON.stringify(cart_items));
        counter();
        window.location.reload();
    });

    cart_container.append(img, category, brand, title, price, btn);
    document.querySelector("#items").append(cart_container);
});