let usuario = "Gero"
let contraseña = "12"

// Función de inicio de sesión
const login = () => {
    let ingresar = false

    for (let i = 3; i > 0; i--) {
        let usuarioIngresado = prompt(`Ingresar usuario. Tenes ${i} intentos`)
        let contraseñaIngresada = prompt(`Ingresa tu contraseña. Tenes ${i} intentos`)

        if (contraseñaIngresada === contraseña && usuarioIngresado === usuario) {
            alert(`Bienvenido ${usuario}`)
            ingresar = true
            break
        } else {
            alert("Inicio de Sesion cancelado")
        }
    }

    return ingresar
}

if (login()) {
    let productos = [
        { id: "1", nombre: "Auriculares", marca: "Sony", precio: 24000, stock: 10 },
        { id: "2", nombre: "Mouse", marca: "Corsair", precio: 13000, stock: 20 },
        { id: "3", nombre: "Teclado", marca: "Corsair", precio: 20000, stock: 15 },
        { id: "4", nombre: "MousePad", marca: "SteelSeries", precio: 15000, stock: 30 },
        { id: "5", nombre: "Monitor", marca: "Samsung", precio: 35000, stock: 8 },
        { id: "6", nombre: "Impresora", marca: "HP", precio: 18000, stock: 12 },
        { id: "7", nombre: "Altavoces", marca: "Sony", precio: 28000, stock: 6 },
        { id: "8", nombre: "Webcam", marca: "Logitech", precio: 9000, stock: 18 }
    ]

    let carrito = []
    let totalGastado = 0

    let opcion

    do {
        opcion = prompt(`Elige una opción:
                        \n 1- Añadir al carrito
                        \n 2- Ver carrito
                        \n 3- Comprar
                        \n 4- Ver stock de productos
                        \n 5- Filtrar productos por marca
                        \n 6- Lista de productos

                        \n 7- Salir`).toUpperCase()

        if (opcion === "1") {
            agregarAlCarrito(productos, carrito)
        } else if (opcion === "2") {
            verCarrito(carrito)
        } else if (opcion === "3") {
            comprarCarrito(carrito)
        } else if (opcion === "4") {
            verStock(productos)
        } else if (opcion === "5") {
            filtrarPorMarca(productos)
        } else if (opcion === "6") {
            listarProductos(productos)
        }
    } while (opcion !== "7")

    alert(`Muchas gracias por tu visita`)
} else {
    alert("Ni nos vimos")
}


function agregarAlCarrito(productos, carrito) {
    listarProductos(productos)

    let opcionProducto = prompt("Ingresa el número del producto que deseas añadir al carrito")

    let productoSeleccionado = productos.find(producto => producto.id === opcionProducto)

    if (productoSeleccionado) {
        if (productoSeleccionado.stock === 0) {
            alert(`Lo sentimos, el ${productoSeleccionado.nombre} está agotado.`)
            return
        }

        carrito.push(productoSeleccionado)
        alert(`${productoSeleccionado.nombre} añadido al carrito`)
    } else {
        alert("Producto inválido")
    }
}

function verCarrito(carrito) {
    if (carrito.length === 0) {
        alert("El carrito está vacío")
    } else {
        alert("Productos en el carrito:")
        for (let producto of carrito) {
            alert(`${producto.nombre} - Precio: $${producto.precio}`)
        }
    }
}

function comprarCarrito(carrito) {
    if (carrito.length === 0) {
        alert("El carrito está vacío, no se realizó ninguna compra")
    } else {
        let totalCarrito = carrito.reduce((total, producto) => total + producto.precio, 0)

        let confirmacion = confirm(`Confirmar la compra de los productos en el carrito? Precio total: $${totalCarrito}`)
        
        if (confirmacion) {
            carrito.forEach(producto => {
                let totalGastado = 0
                totalGastado += producto.precio
                producto.stock-- // Reducir el stock por cada producto comprado
            })
            
            alert(`Compra confirmada, gastaste $${totalCarrito}`)
            carrito = []
        } else {
            alert("Compra cancelada")
        }
    }
}



function listarProductos(productos) {
    let lista = "Listado de productos:\n"
    for (let producto of productos) {
        lista += `${producto.id}- ${producto.nombre} - Marca: ${producto.marca} - Precio: $${producto.precio} -Stock : ${producto.stock}\n`
    }
    alert(lista)
}

function verStock(productos) {
    alert("Stock disponible:")
    for (let producto of productos) {
        alert(`${producto.nombre}: ${producto.stock}`)
    }
}

function filtrarPorMarca(productos) {
    let marcaFiltrar = prompt("Ingresa la marca que deseas filtrar").toLowerCase()
    let productosFiltrados = productos.filter(producto => producto.marca.toLowerCase() === marcaFiltrar)

    if (productosFiltrados.length > 0) {
        alert(`Productos de la marca ${marcaFiltrar}:`)
        for (let producto of productosFiltrados) {
            alert(`${producto.nombre} - Precio: $${producto.precio}`)
        }
    } else {
        alert(`No se encontraron productos de la marca ${marcaFiltrar}`)
    }
}

