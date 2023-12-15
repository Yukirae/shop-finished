document.addEventListener("DOMContentLoaded", async function () {
 const API_URL = "https://7373-172-188-41-15.ngrok-free.app/api/collections/shoes/records";

let itemList = [];

const display = document.querySelector(".base");

function renderNewItem(item){
  display.innerHTML +=`
  <div class="container">
    <div class="picture" >
    <img src="${item.url}" alt="picture" class="product-image"> </img>
    </div>
    <div class="title">
      <div class="rating">&#9733; &#9733; &#9733; &#9733; &#9733;</div>
      <div class="name"> ${item.title} </div>
      <div class="price">$${item.price}</div>
    </div>
</div>
`;
}
const response = await fetch(API_URL);
  const result = await response.json();

  itemList = result.items;

  const addItem = document.getElementById("post");
  addItem.addEventListener("click", async () => {
    const inputName = document.getElementById("prdname").value;
    const inputPrice = document.getElementById("prdprice").value;
    const inputImage = document.getElementById("imglink").value;

    if (!inputName || !inputPrice || !inputImage) {
      return;
    }

    const newItem = {
      title: inputName,
      price: inputPrice,
      url: inputImage,
    };

    const postResponse = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ records: [newItem] }),
    });
    if (postResponse.ok) {
      itemList.push(newItem);
      renderNewItem(newItem);
      document.getElementById("prdname").value = "";
      document.getElementById("prdprice").value = "";
      document.getElementById("imglink").value = "";
    } else {
      console.error("Failed to add item to the server.");
    }
  });
  for (let i = 0; i < itemList.length; i++) {
    renderNewItem(itemList[i]);
  }
});