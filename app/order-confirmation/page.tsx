"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Package, Truck, Home } from "lucide-react"
import Link from "next/link"

export default function OrderConfirmationPage() {
  const orderNumber = `CMD-${Date.now().toString().slice(-6)}`

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto text-center">
        {/* Confirmation */}
        <div className="mb-8">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Commande confirmée !</h1>
          <p className="text-gray-600">Merci pour votre achat. Votre commande a été enregistrée avec succès.</p>
        </div>

        {/* Numéro de commande */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Détails de votre commande</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Numéro de commande</p>
              <p className="text-2xl font-bold text-blue-600 mb-4">{orderNumber}</p>
              <p className="text-sm text-gray-600">Un email de confirmation a été envoyé à votre adresse.</p>
            </div>
          </CardContent>
        </Card>

        {/* Étapes de livraison */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Suivi de votre commande</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold">Commande confirmée</p>
                  <p className="text-sm text-gray-600">Votre commande a été enregistrée</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <Package className="h-5 w-5 text-gray-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-gray-600">Préparation</p>
                  <p className="text-sm text-gray-600">Votre commande est en cours de préparation</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <Truck className="h-5 w-5 text-gray-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-gray-600">Expédition</p>
                  <p className="text-sm text-gray-600">Votre commande sera expédiée sous 24h</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <Home className="h-5 w-5 text-gray-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-gray-600">Livraison</p>
                  <p className="text-sm text-gray-600">Livraison prévue dans 2-3 jours ouvrés</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="space-y-4">
          <Link href="/products" className="w-full">
            <Button className="w-full" size="lg">
              Continuer mes achats
            </Button>
          </Link>

          <Link href="/" className="w-full">
            <Button variant="outline" className="w-full">
              Retour à l'accueil
            </Button>
          </Link>
        </div>

        {/* Informations supplémentaires */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold mb-2">Besoin d'aide ?</h3>
          <p className="text-sm text-gray-600">
            Pour toute question concernant votre commande, contactez notre service client au 01 23 45 67 89 ou par email
            à support@dogtoys.fr
          </p>
        </div>
      </div>
    </div>
  )
}
