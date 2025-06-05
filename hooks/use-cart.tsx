"use client"

import { createContext, useContext, useReducer, type ReactNode } from "react"
import type { Product } from "@/lib/products"
import { useToast } from "@/hooks/use-toast"

interface CartItem {
  product: Product
  quantity: number
}

interface CartState {
  items: CartItem[]
}

type CartAction =
  | { type: "ADD_TO_CART"; product: Product }
  | { type: "REMOVE_FROM_CART"; productId: number }
  | { type: "UPDATE_QUANTITY"; productId: number; quantity: number }
  | { type: "CLEAR_CART" }

const CartContext = createContext<{
  items: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  getTotalPrice: () => number
  getTotalItems: () => number
} | null>(null)

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.items.find((item) => item.product.id === action.product.id)

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.product.id === action.product.id
              ? { ...item, quantity: Math.min(item.quantity + 1, action.product.stock) }
              : item,
          ),
        }
      }

      return {
        ...state,
        items: [...state.items, { product: action.product, quantity: 1 }],
      }
    }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter((item) => item.product.id !== action.productId),
      }

    case "UPDATE_QUANTITY":
      if (action.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.product.id !== action.productId),
        }
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === action.productId
            ? { ...item, quantity: Math.min(action.quantity, item.product.stock) }
            : item,
        ),
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

  const addToCart = (product: Product) => {
    const existingItem = state.items.find((item) => item.product.id === product.id)
    const currentQuantity = existingItem ? existingItem.quantity : 0

    if (currentQuantity >= product.stock) {
      toast({
        title: "Stock insuffisant",
        description: `Il ne reste que ${product.stock} exemplaire(s) de ce produit.`,
        variant: "destructive",
      })
      return
    }

    dispatch({ type: "ADD_TO_CART", product })
    toast({
      title: "Produit ajouté",
      description: `${product.name} a été ajouté à votre panier.`,
    })
  }

  const removeFromCart = (productId: number) => {
    dispatch({ type: "REMOVE_FROM_CART", productId })
    toast({
      title: "Produit supprimé",
      description: "Le produit a été retiré de votre panier.",
    })
  }

  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", productId, quantity })
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  const getTotalPrice = () => {
    return state.items.reduce((total, item) => total + item.product.price * item.quantity, 0)
  }

  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0)
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
