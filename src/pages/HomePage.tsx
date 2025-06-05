"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Star, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { useCart } from "@/hooks/use-cart"
import { type Product, products } from "@/lib/products"

export default function HomePage() {
  const { addToCart } = useCart()
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])

  useEffect(() => {
    // Sélectionner 3 produits mis en avant pour simplifier
    const featured = products.slice(0, 3)
    setFeaturedProducts(featured)
  }, [])

  const handleAddToCart = (product: Product) => {
    addToCart(product)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section Simplifié */}
      <section className="relative bg-gradient-to-br from-rose-200 via-purple-200 to-blue-200 text-gray-700 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">🐕 Dawg Store</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-80">
            Des jouets doux et colorés pour votre meilleur ami
          </p>
          <Link to="/products">
            <Button size="lg" className="bg-rose-300 hover:bg-rose-400 text-white border-0">
              Découvrir
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Produits Vedettes Simplifiés */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-700 mb-4">Nos Favoris</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Une sélection de jouets doux et résistants pour le bonheur de votre chien
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 border-gray-100">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <div className="w-full h-48 bg-gradient-to-br from-rose-100 via-purple-100 to-blue-100 flex items-center justify-center">
                      <span className="text-4xl">{product.id === 1 ? "🎾" : product.id === 2 ? "🪢" : "🔴"}</span>
                    </div>
                    <Badge
                      className={`absolute top-3 right-3 border-0 ${
                        product.stock > 10
                          ? "bg-green-200 text-green-700"
                          : product.stock > 0
                            ? "bg-orange-200 text-orange-700"
                            : "bg-red-200 text-red-700"
                      }`}
                    >
                      {product.stock > 0 ? `Stock: ${product.stock}` : "Épuisé"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-xl mb-2 text-gray-700">{product.name}</CardTitle>
                  <p className="text-gray-500 text-sm mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-rose-400">{product.price.toFixed(2)} €</span>
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-rose-300 hover:bg-rose-400 text-white border-0"
                    disabled={product.stock === 0}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    {product.stock === 0 ? "Épuisé" : "Ajouter au panier"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/products">
              <Button size="lg" variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                Voir tous les produits
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Simplifiées */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-700">Livraison Rapide</h3>
              <p className="text-gray-500">Gratuite dès 50€</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-700">Qualité Garantie</h3>
              <p className="text-gray-500">Jouets testés et approuvés</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">↩️</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-700">Retour Facile</h3>
              <p className="text-gray-500">30 jours pour changer d'avis</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
