let page = 1;

//getting data from API
const fetchApi = async(page=1)=>{
    try{
        let data = await fetch(`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products?limit=12&page=${page}`);
        data = await data.json()
        RenderData(data)
    }catch(error){
        console.log(error)
    }
}
fetchApi()

//cart counter function
let counter=()=>{
    let cart_count_container = document.querySelector('#cart-count');
    cart_count_container.innerText = JSON.parse(localStorage.getItem("cart"))?.length || 0
}
counter()
console.log(counter());

//Render api data
let RenderData = (data) =>{
    console.log(data);
    const main_items_container = document.querySelector("#main-items");
    main_items_container.innerHTML = ""
    if(page == 1){
        document.querySelector("#previous").disabled = true
    }else{
        document.querySelector("#previous").disabled=false
    }
    if(page == data.totalPages){
        document.querySelector("#next").disabled = true
    }else{
        document.querySelector("#next").disabled = false
    }
    data.data.map(item=>{
        let item_container =document.createElement("div")
        item_container.setAttribute("class","item")

        let img = document.createElement("img")
        img.setAttribute("src",item.image)

        let category = document.createElement("p")
        category.innerHTML = item.category;

        let title = document.createElement("p")
        title.innerHTML = item.title;

        let brand = document.createElement("p")
        brand.innerHTML = item.brand; 

        let price = document.createElement("p")
        price.innerHTML = item.price;

        let btn = document.createElement("button")
        btn.innerHTML = "Add to Cart";
        btn.setAttribute("class","add-to-cart")
        btn.addEventListener("click", ()=>{
            let carts_items = JSON.parse(localStorage.getItem("cart")) || []
            carts_items.push(item)
            localStorage.setItem("cart", JSON.stringify(carts_items));
            counter()
            window.alert(`${item.title}, is added to cart`)
        })
        item_container.append(img,category,brand,price,btn)
        main_items_container.append(item_container);
    })
}

//pagination
document.querySelector("#previous").addEventListener("click",()=>{
    page--
    fetchApi(page)
})

document.querySelector("#next").addEventListener("click",()=>{
    page++
    fetchApi(page)
})