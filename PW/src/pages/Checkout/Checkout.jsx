import OrderSummary from './components/OrderSummary'
import PaymentForm from './components/PaymentForm'

const Checkout = () => {
  return (
    <div className="container">
      <h1 className="text-center mb-4">Checkout</h1>
      
      <div className="row">
        <div className="col-md-6">
          <OrderSummary />
        </div>
        <div className="col-md-6">
          <PaymentForm />
        </div>
      </div>
    </div>
  )
}

export default Checkout 