const products = [
      { id: 1, name: 'LINKÉ Essencial', price: 11500, category: 'linke', desc: 'Página de links básica' },
      { id: 2, name: 'LINKÉ Pro', price: 21500, category: 'linke', desc: 'Links + personalização' },
      { id: 3, name: 'LINKÉ Premium', price: 31500, category: 'linke', desc: 'Links + automações' },
      { id: 4, name: 'Catálogo Essencial', price: 15500, category: 'catalogo', desc: 'Catálogo simples' },
      { id: 5, name: 'Catálogo Pro', price: 31500, category: 'catalogo', desc: 'Catálogo interativo' },
      { id: 6, name: 'Catálogo Premium', price: 55500, category: 'catalogo', desc: 'Catálogo + carrinho' },
    ];

    let cart = [];

    const productList = document.getElementById('productList');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    function renderProducts(list) {
      productList.innerHTML = '';
      list.forEach(p => {
        productList.innerHTML += `
          <div class="card">
            <h3>${p.name}</h3>
            <p>${p.desc}</p>
            <div class="price">${p.price.toLocaleString()} Kz</div>
            <button onclick="addToCart(${p.id})">Adicionar ao carrinho</button>
          </div>
        `;
      });
    }

    function addToCart(id) {
      const product = products.find(p => p.id === id);
      const existing = cart.find(item => item.id === id);

      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }

      renderCart();
    }

    function removeFromCart(id) {
      cart = cart.filter(item => item.id !== id);
      renderCart();
    }

    function renderCart() {
      cartItems.innerHTML = '';
      cart.forEach(item => {
        cartItems.innerHTML += `
          <div class="cart-item">
            <span>${item.name} x${item.quantity} - ${(item.price * item.quantity).toLocaleString()} Kz</span>
            <button onclick="removeFromCart(${item.id})"><i class="fa-solid fa-trash"></i></button>
          </div>
        `;
      });

      const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      cartTotal.textContent = `Total: ${total.toLocaleString()} Kz`;

      // Atualiza contador de itens
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      cartCount.textContent = totalItems;
    }

    function toggleCart() {
      document.getElementById('cart').classList.toggle('open');
    }

    function checkoutWhatsApp() {
      if (!cart.length) return alert('Carrinho vazio');

      let message = 'Olá, gostaria de adquirir:%0A%0A';
      cart.forEach(item => {
        message += `• ${item.name} x${item.quantity} - ${(item.price * item.quantity).toLocaleString()} Kz%0A`;
      });

      const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      message += `%0ATotal: ${total.toLocaleString()} Kz`;

      window.open(`https://wa.me/939696653?text=${message}`, '_blank');
    }

    document.getElementById('search').addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase();
      const filtered = products.filter(p => p.name.toLowerCase().includes(term));
      renderProducts(filtered);
    });

    document.getElementById('year').textContent = new Date().getFullYear();

    renderProducts(products);
  
