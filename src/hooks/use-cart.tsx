"use client"

import { createContext, useContext, useReducer, type ReactNode } from "react"
import { useToast } from "@/hooks/use-toast"

interface Product {
  id: string
  name: string
  description: string
  price: number
  stock: number
  image?: string
  variantId?: string
}

interface CartItem {
  product: Product
  variantId?: string
  quantity: number
}

interface CartState {
  items: CartItem[]
}

type CartAction =
  | { type: "ADD_TO_CART"; product: Product; variantId?: string }
  | { type: "REMOVE_FROM_CART"; productId: string; variantId?: string }
  | { type: "UPDATE_QUANTITY"; productId: string; quantity: number; variantId?: string }
  | { type: "CLEAR_CART" }

const CartContext = createContext<{
  items: CartItem[]
  addToCart: (product: Product, variantId?: string) => void
  removeFromCart: (productId: string, variantId?: string) => void
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void
  clearCart: () => void
  getTotalPrice: () => number
  getTotalItems: () => number
} | null>(null)

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_TO_CART": {
      // Vérifie si l'article existe déjà dans le panier (même produit ET même variante)
      const existingItemIndex = state.items.findIndex(
        item => item.product.id === action.product.id &&
               item.variantId === action.variantId
      )

      if (existingItemIndex >= 0) {
        // Si l'article existe déjà, on incrémente la quantité sans dépasser le stock
        const updatedItems = [...state.items]
        const newQuantity = Math.min(
          updatedItems[existingItemIndex].quantity + 1,
          action.product.stock
        )

        if (newQuantity === updatedItems[existingItemIndex].quantity) {
          // La quantité n'a pas changé (stock atteint)
          return state
        }

        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: newQuantity
        }
        return { ...state, items: updatedItems }
      }

      // Sinon, on ajoute le nouvel article
      return {
        ...state,
        items: [...state.items, {
          product: action.product,
          variantId: action.variantId,
          quantity: 1
        }],
      }
    }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter(
          item => !(item.product.id === action.productId &&
                  item.variantId === action.variantId)
        ),
      }

    case "UPDATE_QUANTITY": {
      if (action.quantity <= 0) {
        // Si la quantité est 0 ou moins, on supprime l'article
        return {
          ...state,
          items: state.items.filter(
            item => !(item.product.id === action.productId &&
                    item.variantId === action.variantId)
          ),
        }
      }

      return {
        ...state,
        items: state.items.map(item => {
          if (item.product.id === action.productId &&
              item.variantId === action.variantId) {
            // On limite la quantité au stock disponible
            return {
              ...item,
              quantity: Math.min(action.quantity, item.product.stock)
            }
          }
          return item
        }),
      }
    }

    case "CLEAR_CART":
      return { items: [] }

    default:
      return state
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })
  const { toast } = useToast()

  const addToCart = (product: Product, variantId?: string) => {
    const existingItem = state.items.find(
      item => item.product.id === product.id && item.variantId === variantId
    )
    const currentQuantity = existingItem ? existingItem.quantity : 0

    if (currentQuantity >= product.stock) {
      toast({
        title: "Stock insuffisant",
        description: `Il ne reste que ${product.stock} exemplaire(s) de ce produit en stock.`,
        variant: "destructive",
      })
      return
    }

    dispatch({ type: "ADD_TO_CART", product, variantId })
    toast({
      title: "Produit ajouté",
      description: `${product.name} a été ajouté à votre panier.`,
    })
  }

  const removeFromCart = (productId: string, variantId?: string) => {
    dispatch({ type: "REMOVE_FROM_CART", productId, variantId })
    toast({
      title: "Produit supprimé",
      description: "Le produit a été retiré de votre panier.",
    })
  }

  const updateQuantity = (productId: string, quantity: number, variantId?: string) => {
    dispatch({ type: "UPDATE_QUANTITY", productId, quantity, variantId })
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
    toast({
      title: "Panier vidé",
      description: "Tous les articles ont été retirés de votre panier.",
    })
  }

  const getTotalPrice = () => {
    return state.items.reduce(
      (total, item) => total + (item.product.price * item.quantity),
      0
    )
  }

  const getTotalItems = () => {
    return state.items.reduce(
      (total, item) => total + item.quantity,
      0
    )
  }

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
