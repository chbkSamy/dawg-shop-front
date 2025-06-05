"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Menu, X } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/hooks/use-cart"

export function Header() {
  const { getTotalItems } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo Simplifié */}
          <Link href="/" className="text-2xl font-bold text-rose-400">
            🐕 Dawg Store
          </Link>

          {/* Navigation desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-rose-400 transition-colors">
              Accueil
            </Link>
            <Link href="/products" className="text-gray-600 hover:text-rose-400 transition-colors">
              Produits
            </Link>
          </nav>

          {/* Panier */}
          <div className="flex items-center space-x-4">
            <Link href="/cart">
              <Button variant="outline" size="sm" className="relative border-gray-200 hover:bg-rose-50">
                <ShoppingCart className="h-4 w-4" />
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-rose-300 border-0">
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Menu mobile */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Navigation mobile */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-2">
              <Link
                href="/"
                className="text-gray-600 hover:text-rose-400 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Accueil
              </Link>
              <Link
                href="/products"
                className="text-gray-600 hover:text-rose-400 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Produits
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
