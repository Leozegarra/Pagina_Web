import ProductCard from './components/ProductCard'

const Home = () => {
  const products = [
    { id: 1, name: 'Producto 1', price: 100, image: 'https://cdn.dribbble.com/userupload/3875672/file/original-42f52449520e8e7940c668566888d84f.png?resize=752x&vertical=center' },
    { id: 2, name: 'Producto 2', price: 200, image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Producto 3', price: 300, image: 'https://via.placeholder.com/150' }
  ]

  return (
    <div className="container">
      <h1 className="text-center mb-4">Nuestros Productos</h1>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {products.map(product => (
          <div key={product.id} className="col">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home 