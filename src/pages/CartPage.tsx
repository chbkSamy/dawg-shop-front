"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"
import { useCart } from "@/hooks/use-cart"
import { gql, useQuery, useMutation } from "@apollo/client"
import { useMemo, useEffect } from "react"

// Requête GraphQL mise à jour pour gérer les commandes d'invités
const GET_SHIPPING_METHODS = gql`
  query GetShippingMethods {
    activeShippingMethods {
      id
      code
      name
      description
    }
    activeOrder {
      id
      code
      state
      totalWithTax
      shippingWithTax
      customer {
        id
        emailAddress
      }
    }
  }
`

// Mutation pour créer une commande d'invité
const CREATE_ORDER = gql`
  mutation CreateOrder {
    createOrder {
      id
      code
      state
      ... on Order {
        id
        code
        state
      }
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`

// Mutation pour définir l'email de commande d'invité
const SET_CUSTOMER_FOR_ORDER = gql`
  mutation SetCustomerForOrder($input: CreateCustomerInput!) {
    setCustomerForOrder(input: $input) {
      ... on Order {
        id
        customer {
          id
          emailAddress
        }
      }
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, getTotalPrice, getTotalItems, clearCart } = useCart()

  // Seuil pour livraison gratuite
  const FREE_SHIPPING_THRESHOLD = 50 // 50€
  const STANDARD_SHIPPING_COST = 4 // 4€

  // Queries et mutations GraphQL
  const { data, loading, error, refetch } = useQuery(GET_SHIPPING_METHODS, {
    errorPolicy: 'all' // Pour gérer les erreurs sans bloquer l'interface
  })
  const [createOrder] = useMutation(CREATE_ORDER)
  const [setCustomerForOrder] = useMutation(SET_CUSTOMER_FOR_ORDER)

  // Création automatique d'une commande si nécessaire
  useEffect(() => {
    if (!loading && !data?.activeOrder?.id && items.length > 0) {
      handleCreateOrder()
    }
  }, [loading, data, items.length])

  const handleCreateOrder = async () => {
    try {
      console.log("Tentative de création de commande...");
      const result = await createOrder();
      console.log("Résultat de la mutation:", result);

      if (result.data?.createOrder?.id) {
        console.log("Commande créée avec succès:", result.data.createOrder.id);
        refetch();
      } else if (result.data?.createOrder?.errorCode) {
        console.error("Erreur lors de la création de la commande:", result.data.createOrder.message);
      }
    } catch (err) {
      console.error("Erreur complète lors de la création de la commande:", err);
      console.error("Stack trace:", err.stack);
    }
  };

  // Fonction pour préparer une commande d'invité (optionnel, peut être déplacé vers checkout)
  const prepareGuestOrder = async (email: string) => {
    try {
      const result = await setCustomerForOrder({
        variables: {
          input: {
            emailAddress: email
          }
        }
      })

      if (result.data?.setCustomerForOrder?.id) {
        console.log("Email défini pour la commande d'invité")
        refetch()
      }
    } catch (err) {
      console.error("Erreur lors de la définition de l'email:", err)
    }
  }

  // Calcul des frais de livraison
  const { shippingCost, shippingMethod } = useMemo(() => {
    // Si l'API Vendure renvoie déjà un activeOrder avec shippingWithTax, on l'utilise
    if (data?.activeOrder?.shippingWithTax !== undefined) {
      return {
        shippingCost: data.activeOrder.shippingWithTax / 100,
        shippingMethod: data.activeShippingMethods?.find(m => m.code === "standard-shipping")
      }
    }

    // Sinon, on calcule localement selon le panier
    const total = getTotalPrice()
    const cost = total >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_COST

    return {
      shippingCost: cost,
      shippingMethod: data?.activeShippingMethods?.[0] || null
    }
  }, [data, getTotalPrice])

  const totalWithShipping = getTotalPrice() + shippingCost
  const amountUntilFreeShipping = FREE_SHIPPING_THRESHOLD - getTotalPrice()

  if (error) {
    console.error("Erreur lors du chargement des méthodes d'expédition :", error)
  }

  // Vérifier l'état de la commande
  const orderState = data?.activeOrder?.state
  const isGuestOrder = data?.activeOrder && !data.activeOrder.customer?.id

  // Si le panier est vide, on affiche un message dédié
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

      {/* Indicateur d'état de commande pour debug */}
      {process.env.NODE_ENV === 'development' && data?.activeOrder && (
        <div className="mb-4 p-3 bg-blue-50 rounded text-sm">
          <p>Commande ID: {data.activeOrder.id}</p>
          <p>État: {orderState}</p>
          <p>Type: {isGuestOrder ? 'Invité' : 'Connecté'}</p>
          {data.activeOrder.customer?.emailAddress && (
            <p>Email: {data.activeOrder.customer.emailAddress}</p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Liste des articles */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={`${item.product.id}-${item.variantId}`}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Image du produit */}
                  <div className="w-full md:w-24 h-24">
                    {item.product.image ? (
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover rounded"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 rounded flex items-center justify-center">
                        <span className="text-gray-400 text-xs text-center">Aucune image</span>
                      </div>
                    )}
                  </div>

                  {/* Détails du produit */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">{item.product.name}</h3>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                      {item.product.description}
                    </p>
                    <p className="text-lg font-bold text-blue-600">
                      {item.product.price.toFixed(2)} €
                    </p>
                    {item.variantId && (
                      <p className="text-xs text-gray-500 mt-1">Variante: {item.variantId}</p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col items-end space-y-2">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (item.variantId) {
                            updateQuantity(item.product.id, item.quantity - 1, item.variantId)
                          } else {
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                        }}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-12 text-center font-semibold">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (item.variantId) {
                            updateQuantity(item.product.id, item.quantity + 1, item.variantId)
                          } else {
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                        }}
                        disabled={item.quantity >= item.product.stock}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <p className="text-lg font-bold">
                      {(item.product.price * item.quantity).toFixed(2)} €
                    </p>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        if (item.variantId) {
                          removeFromCart(item.product.id, item.variantId)
                        } else {
                          removeFromCart(item.product.id)
                        }
                      }}
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
                  {loading ? (
                    <span className="text-gray-500">Calcul en cours...</span>
                  ) : shippingCost === 0 ? (
                    <span className="text-green-600 font-semibold">Gratuit</span>
                  ) : (
                    `${shippingCost.toFixed(2)} €`
                  )}
                </span>
              </div>

              {getTotalPrice() < FREE_SHIPPING_THRESHOLD && (
                <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded">
                  Il vous manque {amountUntilFreeShipping.toFixed(2)} € pour bénéficier de la
                  livraison gratuite !
                </p>
              )}

              <Separator />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>
                  {loading ? (
                    <span className="text-gray-500">Calcul en cours...</span>
                  ) : (
                    `${totalWithShipping.toFixed(2)} €`
                  )}
                </span>
              </div>

              {/* Information sur le checkout d'invité */}
              {isGuestOrder && (
                <p className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
                  💡 Vous pouvez finaliser votre commande sans créer de compte
                </p>
              )}

              <Link to="/checkout" className="w-full">
                <Button
                  className="w-full"
                  size="lg"
                  disabled={loading || !data?.activeOrder?.id}
                >
                  {loading ? "Chargement..." : "Passer commande"}
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
