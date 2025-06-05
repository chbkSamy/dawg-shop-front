"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Star, ArrowLeft, Plus, Minus } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useCart } from "@/hooks/use-cart"
import { type Product, products } from "@/lib/products"

export default function ProductPage() {
  const params = useParams()
  const { addToCart } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const productId = Number.parseInt(params.id as string)
    const foundProduct = products.find((p) => p.id === productId)
    setProduct(foundProduct || null)
    setLoading(false)
  }, [params.id])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="h-96 bg-gray-200 rounded"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Produit non trouvé</h1>
        <p className="text-gray-600 mb-8">Le produit que vous recherchez n'existe pas.</p>
        <Link href="/products">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux produits
          </Button>
        </Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
  }

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/products" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour aux produits
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image du produit */}
        <div className="space-y-4">
          <div className="relative">
            <img
              src={`/placeholder.svg?height=400&width=600&text=${encodeURIComponent(product.name)}`}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />
            <Badge
              className={`absolute top-4 right-4 ${
                product.stock > 10 ? "bg-green-500" : product.stock > 0 ? "bg-orange-500" : "bg-red-500"
              }`}
            >
              {product.stock > 0 ? `En stock: ${product.stock}` : "Rupture de stock"}
            </Badge>
          </div>
        </div>

        {/* Informations du produit */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-gray-600">(4.8/5 - 124 avis)</span>
            </div>
            <p className="text-4xl font-bold text-blue-600 mb-4">{product.price.toFixed(2)} €</p>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          <Separator />

          {/* Sélection de quantité */}
          <div className="space-y-4">
            <div>
              <label className="text-lg font-semibold mb-2 block">Quantité</label>
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm" onClick={decrementQuantity} disabled={quantity <= 1}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                <Button variant="outline" size="sm" onClick={incrementQuantity} disabled={quantity >= product.stock}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Button onClick={handleAddToCart} className="w-full py-3 text-lg" disabled={product.stock === 0} size="lg">
              <ShoppingCart className="mr-2 h-5 w-5" />
              {product.stock === 0
                ? "Rupture de stock"
                : `Ajouter au panier - ${(product.price * quantity).toFixed(2)} €`}
            </Button>
          </div>

          {/* Informations supplémentaires */}
          <Card>
            <CardContent className="p-4">
              <h4 className="font-semibold mb-2">Informations de livraison</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Livraison standard : 4,99 €</li>
                <li>• Livraison gratuite à partir de 50 €</li>
                <li>• Délai de livraison : 2-3 jours ouvrés</li>
                <li>• Retour gratuit sous 30 jours</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
