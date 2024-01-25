const socket = io();

const productList = document.getElementById('realtime-product-list')
const productForm = document.getElementById('product-form')
const titleInput = document.getElementById('title')
const priceInput = document.getElementById('price')
const deleteButton = document.getElementById('delete-product')


socket.on('productos', (products) => {
    productList.innerHTML = ''
    // Renderizar los productos
    const templateSource = document.getElementById('realtime-template').innerHTML
    const template = Handlebars.compile(templateSource)
    products.forEach((product) => {
        const html = template(product)
        productList.innerHTML += html
    })
})

// Enviar el formulario para crear un producto
productForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const title = titleInput.value
    const price = priceInput.value
    socket.emit('nuevoProducto', { title, price })
})

// Eliminar un producto
deleteButton.addEventListener('click', () => {
    const idProducto = // Obtener el id del producto a eliminar
        socket.emit('borrarProducto', idProducto)
})

