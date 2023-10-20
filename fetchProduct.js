document.addEventListener("DOMContentLoaded", () => {
    const productId = "product1"; // Change this to the desired product ID
    const apiUrl = `/api/products/${productId}`; // Use relative URL
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        document.querySelector(".product-name").textContent = data.name;
        document.querySelector(".product-price").textContent = data.price;
        document.querySelector(".product-description").textContent = data.description;
  
        const featuresList = document.querySelector(".product-features");
        featuresList.innerHTML = data.features.map(feature => `<li>${feature}</li>`).join("");
  
        // Update other elements as needed
      })
      .catch(error => console.error("Error fetching data:", error));
  });
  