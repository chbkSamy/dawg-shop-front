"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShoppingCart, Star } from "lucide-react"
import { Link } from "react-router-dom"
import { useCart } from "@/hooks/use-cart"
import { type Product, products } from "@/lib/products"

type SortOption = "name-asc" | "name-desc" | "price-asc" | "price-desc"

export default function ProductsPage() {
  const { addToCart } = useCart()
  const [sortBy, setSortBy] = useState<SortOption>("name-asc")

  const sortedProducts = useMemo(() => {
    const sorted = [...products]

    switch (sortBy) {
      case "name-asc":
        return sorted.sort((a, b) => a.name.localeCompare(b.name))
      case "name-desc":
        return sorted.sort((a, b) => b.name.localeCompare(a.name))
      case "price-asc":
        return sorted.sort((a, b) => a.price - b.price)
      case "price-desc":
        return sorted.sort((a, b) => b.price - a.price)
      default:
        return sorted
    }
  }, [sortBy])

  const handleAddToCart = (product: Product) => {
    addToCart(product)
  }

  const getProductEmoji = (id: number) => {
    const emojis = ["🎾", "🪢", "🔴", "🧸", "🥏", "🍖", "🦴", "💡", "🍩", "🏊"]
    return emojis[id - 1] || "🎾"
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-700 mb-2">Tous nos Jouets</h1>
          <p className="text-gray-500">{products.length} produits disponibles</p>
        </div>

        <div className="mt-4 md:mt-0">
          <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
            <SelectTrigger className="w-[200px] border-gray-200">
              <SelectValue placeholder="Trier par..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name-asc">Nom (A-Z)</SelectItem>
              <SelectItem value="name-desc">Nom (Z-A)</SelectItem>
              <SelectItem value="price-asc">Prix croissant</SelectItem>
              <SelectItem value="price-desc">Prix décroissant</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedProducts.map((product) => (
          <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 border-gray-100">
            {/* Enveloppe tout sauf le footer dans Link */}
            <Link
              to={`/products/${product.id}`}
              className="block cursor-pointer text-inherit no-underline"
              aria-label={`Voir détails de ${product.name}`}
            >
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <div className="w-full h-48 bg-gradient-to-br from-rose-100 via-purple-100 to-blue-100 flex items-center justify-center">
                    <span className="text-4xl">{getProductEmoji(product.id)}</span>
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
              <CardContent className="p-4">
                <CardTitle className="text-lg mb-2 text-gray-700">{product.name}</CardTitle>
                <p className="text-gray-500 text-sm mb-3 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-rose-400">{product.price.toFixed(2)} €</span>
                </div>
              </CardContent>
            </Link>

            <CardFooter className="p-4 pt-0 space-y-2">
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
    </div>
  )
}
