let elProducts = document.querySelector(".product");

function fetchProducts(url, callBack) {
  let deleteObj;
  fetch(url, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      // renderData(data)
      deleteObj = data;
      console.log(data);
    })
    .then(() => callBack(deleteObj));
}

function renderData(arr) {
  console.log(arr);
  arr.forEach((value, index, array) => {
    let html = `
            <div class="card mt-3" style="width: 18rem;">
                <img src=${value.images[0]} width="270" height="200" class="card-img-top" alt="...">
                <div class="card-body">
                <div class="parent-heading">
                    <h5 class="card-title" style="font-size: 20px; margin-bottom: 15px;" id=${value.id}>${value.title}</h5>
                </div>
                <h6 class="card-price" style="font-size: 18px;">${value.price}$</h6>
                <p class="card-text">
                    ${value.description}
                </p>
                <button id=${value.id} class="btn btn-danger delete-btn">Delete</button>
                </div>
            </div>
        `;

    elProducts.insertAdjacentHTML("beforeend", html);
  });
}

fetchProducts("https://api.escuelajs.co/api/v1/products", renderData);

elProducts.addEventListener("click", (e) => {
  if (e.target.matches(".delete-btn")) {
    e.preventDefault();
    deleteFetch(e.target.id);
  }

  if (e.target.matches(".card-title")) {
    if (e.target.parentElement.childElementCount == 1) {
      let input = document.createElement("input");
      let inputPrice = document.createElement("input");
      let buttonEdit = document.createElement("button");

      buttonEdit.textContent = "Update";
      buttonEdit.setAttribute("id", e.target.id);
      buttonEdit.setAttribute("class", "update-btn");
      input.setAttribute("class", "card-title");
      inputPrice.setAttribute("class", "card-price");

      input.setAttribute("placeholder", "Title");
      inputPrice.setAttribute("placeholder", "Price");

      e.target.parentElement.appendChild(input);
      e.target.parentElement.appendChild(inputPrice);
      e.target.parentElement.appendChild(buttonEdit);
    }
  }

  if (e.target.matches(".update-btn")) {
    updateFetch(
      e.target.id,
      e.target.previousSibling.previousSibling.value,
      e.target.previousSibling.value
    );
  }
});

function deleteFetch(id) {
  fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      fetchProducts("https://api.escuelajs.co/api/v1/products", renderData);
      window.location.reload();
    });
}

function updateFetch(id, value, price) {
  console.log(id);
  fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: value,
      price: price,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      fetchProducts("https://api.escuelajs.co/api/v1/products", renderData);
      window.location.reload();
    });
}
