document.addEventListener('DOMContentLoaded', () => {
  const userNameForm = document.getElementById('user-name-form');
  const userNameInput = document.getElementById('user-name-input');
  const userNameContainer = document.getElementById('user-name-container');
  const greetingElement = document.getElementById('greeting');
  const userAvatarElement = document.getElementById('user-avatar');

  
  userNameForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const userName = userNameInput.value.trim();

    if (userName) {
      
      userNameContainer.style.display = 'none';
      document.body.classList.remove('locked');

      
      greetingElement.textContent = `Hi, ${userName}`;

      
    
      const avatarUrl = `https://api.dicebear.com/9.x/pixel-art/svg?seed=${userName}`;
      userAvatarElement.src = avatarUrl;
    }
  });
});



// Sample product data
const products = [
  { id: 1, title: 'Long sleeve t-shirt for girls with Mickey Mouse design',
     description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputatei.',
      price: 10, category: 'shirt',
       image: './img/1.webp' },
  { id: 2, title: 'Long-sleeve sports t-shirt for girls',
     description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputatei.', 
     price: 15, category: 'shirt', 
     image: './img/2.webp' },
  { id: 3, title: 'Children jeans 01',
     description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputatei.',
      price: 20, category: 'pants',
       image: './img/3.webp' },
  { id: 4, title: 'Children jeans 02',
     description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputatei.',
     price: 20, category: 'pants', 
     image: './img/4.webp' },
  { id: 5, title: 'Daisy style short stockings for girls',
     description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputatei.',
      price: 5, 
      category: 'socks',
       image: './img/5.webp' },
  { id: 6, title: 'Piperts girls stockings',
     description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputatei.',
      price: 5, category: 'socks',
       image: './img/6.webp' },
];

let cart = [];

// Function to render products
function renderProducts(productList) {
  const productContainer = document.getElementById('product-list');
  productContainer.innerHTML = '';

  productList.forEach(product => {
    const productCard = `
      
        <div class="card product-card">
          <img src="${product.image}" class="card-img-top" alt="${product.title}">
          <div class="card-body">
            <h3 class="card-title">${product.title}</h3>
            <p class="card-text">${product.description}</p>
          <div class="product-price">
            <p class="card-text">Price: $${product.price}</p>
            <button class="btn btn-primary add-to-cart" data-id="${product.id}">Add to cart</button>
          </div>
          </div>
        </div>
      
    `;
    productContainer.insertAdjacentHTML('beforeend', productCard);
  });

  // Add event listeners to Add to Cart buttons
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', addToCart);
  });
}

// Function to add products to the cart
function addToCart(event) {
  const productId = event.target.getAttribute('data-id');
  cart.push(productId);
  document.getElementById('cart-count').innerText = cart.length;
}

// Function to filter products by search and category
function filterProducts() {
  const searchInput = document.getElementById('search-input').value.toLowerCase();
  const categorySelect = document.getElementById('category-select').value;

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchInput);
    const matchesCategory = categorySelect ? product.category === categorySelect : true;
    return matchesSearch && matchesCategory;
  });

  renderProducts(filteredProducts);
}





// function to save cart in localStorage
function saveCartToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// function to load cart from localStorage
function loadCartFromLocalStorage() {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartCount();
    updateCartModal();
  }
}

//  get total count
function getTotalItemCount() {
  return cart.reduce((total, item) => total + item.quantity, 0);
}


// function to update cart 
function updateCartCount() {
  document.getElementById('cart-count').innerText = getTotalItemCount();
}

// function to add item to cart
function addToCart(event) {
  const productId = parseInt(event.target.getAttribute('data-id'));
  const product = products.find(p => p.id === productId);
  
  if (product) {
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    saveCartToLocalStorage();
    updateCartCount();
    updateCartModal();
  }
}

// fuction to update cart modal
function updateCartModal() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalElement = document.getElementById('cart-total');
  
  cartItemsContainer.innerHTML = '';
  let total = 0;
  
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    
    const itemElement = document.createElement('div');
    itemElement.classList.add('cart-item');
    itemElement.innerHTML = `
      <span>${item.title}</span>
      <span>Quantity: ${item.quantity}</span>
      <span>$${itemTotal.toFixed(2)}</span>
    `;
    cartItemsContainer.appendChild(itemElement);
  });
  
  cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
}

// add event listener to display cart modal
document.querySelector('.cart-container').addEventListener('click', () => {
  const cartModal = document.getElementById('cart-modal');
  cartModal.style.display = 'block';
  updateCartModal();
});

// add event listener to close cart modal
document.querySelector('.close-modal').addEventListener('click', () => {
  document.getElementById('cart-modal').style.display = 'none';
});




// Initialize product list and categories
document.addEventListener('DOMContentLoaded', () => {
  renderProducts(products);

  loadCartFromLocalStorage();

  // Initialize category dropdown
  const categories = [...new Set(products.map(product => product.category))];
  const categorySelect = document.getElementById('category-select');
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.text = category;
    categorySelect.appendChild(option);
  });

  // Add event listeners for search and category filter
  document.getElementById('search-input').addEventListener('input', filterProducts);
  document.getElementById('category-select').addEventListener('change', filterProducts);
});
