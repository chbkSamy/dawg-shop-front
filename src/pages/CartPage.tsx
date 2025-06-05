"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"
import { useCart } from "@/hooks/use-cart"

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, getTotalPrice, getTotalItems, clearCart } = useCart()

  const shippingCost = getTotalPrice() >= 50 ? 0 : 4.99
  const totalWithShipping = getTotalPrice() + shippingCost

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <ShoppingCart className="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Votre panier est vide</h1>
          <p className="text-gray-600 mb-8">Découvrez nos jouets pour chien et ajoutez-les à votre panier</p>
          <Link to="/products">
            <Button size="lg">Découvrir nos produits</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Link to="/products" className="mr-4">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continuer mes achats
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">
          Mon Panier ({getTotalItems()} article{getTotalItems() > 1 ? "s" : ""})
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Liste des articles */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.product.id}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <img
                    src={`/placeholder.svg?height=120&width=120&text=${encodeURIComponent(item.product.name)}`}
                    alt={item.product.name}
                    className="w-full md:w-24 h-24 object-cover rounded"
                  />

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">{item.product.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{item.product.description}</p>
                    <p className="text-lg font-bold text-blue-600">{item.product.price.toFixed(2)} €</p>
                  </div>

                  <div className="flex flex-col items-end space-y-2">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-12 text-center font-semibold">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        disabled={item.quantity >= item.product.stock}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <p className="text-lg font-bold">{(item.product.price * item.quantity).toFixed(2)} €</p>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Supprimer
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <div className="flex justify-between items-center pt-4">
            <Button variant="outline" onClick={clearCart}>
              Vider le panier
            </Button>
          </div>
        </div>

        {/* Résumé de commande */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Résumé de la commande</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Sous-total ({getTotalItems()} articles)</span>
                <span>{getTotalPrice().toFixed(2)} €</span>
              </div>

              <div className="flex justify-between">
                <span>Frais de livraison</span>
                <span>
                  {shippingCost === 0 ? (
                    <span className="text-green-600 font-semibold">Gratuit</span>
                  ) : (
                    `${shippingCost.toFixed(2)} €`
                  )}
                </span>
              </div>

              {getTotalPrice() < 50 && (
                <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded">
                  Ajoutez {(50 - getTotalPrice()).toFixed(2)} € pour bénéficier de la livraison gratuite !
                </p>
              )}

              <Separator />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>{totalWithShipping.toFixed(2)} €</span>
              </div>

              <Link to="/checkout" className="w-full">
                <Button className="w-full" size="lg">
                  Passer commande
                </Button>
              </Link>

              <div className="text-xs text-gray-500 text-center">
                Paiement sécurisé • Livraison rapide • Retour gratuit
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
