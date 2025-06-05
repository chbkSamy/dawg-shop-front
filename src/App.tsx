import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { CartProvider } from "@/hooks/use-cart"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import HomePage from "@/pages/HomePage"
import ProductsPage from "@/pages/ProductsPage"
import ProductPage from "@/pages/ProductPage"
import CartPage from "@/pages/CartPage"
import CheckoutPage from "@/pages/CheckoutPage"
import OrderConfirmationPage from "@/pages/OrderConfirmationPage"
import DesignSystemPage from "@/pages/DesignSystemPage"
import WireframesPage from "@/pages/WireframesPage"
import MockupsPage from "@/pages/MockupsPage"

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
              <Route path="/design-system" element={<DesignSystemPage />} />
              <Route path="/wireframes" element={<WireframesPage />} />
              <Route path="/mockups" element={<MockupsPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <Toaster />
      </CartProvider>
    </Router>
  )
}

export default App
