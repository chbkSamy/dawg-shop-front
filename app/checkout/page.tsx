"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, ArrowRight, CreditCard, Truck } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCart } from "@/hooks/use-cart"

type CheckoutStep = "personal" | "shipping" | "payment" | "confirmation"

interface PersonalInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  postalCode: string
}

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotalPrice, clearCart } = useCart()
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("personal")
  const [shippingMethod, setShippingMethod] = useState("standard")
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  })

  const shippingCost = getTotalPrice() >= 50 ? 0 : 4.99
  const totalWithShipping = getTotalPrice() + shippingCost

  const handlePersonalInfoChange = (field: keyof PersonalInfo, value: string) => {
    setPersonalInfo((prev) => ({ ...prev, [field]: value }))
  }

  const validatePersonalInfo = () => {
    return Object.values(personalInfo).every((value) => value.trim() !== "")
  }

  const handleNextStep = () => {
    if (currentStep === "personal" && !validatePersonalInfo()) {
      alert("Veuillez remplir tous les champs obligatoires")
      return
    }

    const steps: CheckoutStep[] = ["personal", "shipping", "payment", "confirmation"]
    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1])
    }
  }

  const handlePreviousStep = () => {
    const steps: CheckoutStep[] = ["personal", "shipping", "payment", "confirmation"]
    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1])
    }
  }

  const handlePayment = () => {
    // Simulation du paiement
    setTimeout(() => {
      clearCart()
      router.push("/order-confirmation")
    }, 2000)
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Votre panier est vide</h1>
        <p className="text-gray-600 mb-8">Ajoutez des produits à votre panier pour continuer.</p>
        <Link href="/products">
          <Button>Découvrir nos produits</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Link href="/cart" className="mr-4">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour au panier
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Commande</h1>
      </div>

      {/* Indicateur d'étapes */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center space-x-4">
          {[
            { key: "personal", label: "Informations", icon: "1" },
            { key: "shipping", label: "Livraison", icon: "2" },
            { key: "payment", label: "Paiement", icon: "3" },
            { key: "confirmation", label: "Confirmation", icon: "4" },
          ].map((step, index) => (
            <div key={step.key} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  currentStep === step.key
                    ? "bg-blue-600 text-white"
                    : ["personal", "shipping", "payment", "confirmation"].indexOf(currentStep) > index
                      ? "bg-green-600 text-white"
                      : "bg-gray-200 text-gray-600"
                }`}
              >
                {step.icon}
              </div>
              <span className={`ml-2 text-sm ${currentStep === step.key ? "font-semibold" : ""}`}>{step.label}</span>
              {index < 3 && <ArrowRight className="h-4 w-4 mx-4 text-gray-400" />}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulaire */}
        <div className="lg:col-span-2">
          {currentStep === "personal" && (
            <Card>
              <CardHeader>
                <CardTitle>Informations personnelles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Prénom *</Label>
                    <Input
                      id="firstName"
                      value={personalInfo.firstName}
                      onChange={(e) => handlePersonalInfoChange("firstName", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Nom *</Label>
                    <Input
                      id="lastName"
                      value={personalInfo.lastName}
                      onChange={(e) => handlePersonalInfoChange("lastName", e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={personalInfo.email}
                    onChange={(e) => handlePersonalInfoChange("email", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Téléphone *</Label>
                  <Input
                    id="phone"
                    value={personalInfo.phone}
                    onChange={(e) => handlePersonalInfoChange("phone", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="address">Adresse *</Label>
                  <Input
                    id="address"
                    value={personalInfo.address}
                    onChange={(e) => handlePersonalInfoChange("address", e.target.value)}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">Ville *</Label>
                    <Input
                      id="city"
                      value={personalInfo.city}
                      onChange={(e) => handlePersonalInfoChange("city", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="postalCode">Code postal *</Label>
                    <Input
                      id="postalCode"
                      value={personalInfo.postalCode}
                      onChange={(e) => handlePersonalInfoChange("postalCode", e.target.value)}
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === "shipping" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="mr-2 h-5 w-5" />
                  Mode de livraison
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard" className="flex-1 cursor-pointer">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold">Livraison standard</p>
                          <p className="text-sm text-gray-600">2-3 jours ouvrés</p>
                        </div>
                        <span className="font-semibold">{getTotalPrice() >= 50 ? "Gratuit" : "4,99 €"}</span>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>

                {getTotalPrice() < 50 && (
                  <p className="text-sm text-gray-600 mt-4 p-3 bg-blue-50 rounded">
                    💡 Ajoutez {(50 - getTotalPrice()).toFixed(2)} € pour bénéficier de la livraison gratuite !
                  </p>
                )}
              </CardContent>
            </Card>
          )}

          {currentStep === "payment" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Paiement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-6 border rounded-lg bg-gray-50">
                  <h3 className="font-semibold mb-2">Paiement simulé</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Dans un environnement réel, vous saisiriez ici vos informations de carte bancaire.
                  </p>
                  <div className="space-y-3">
                    <div>
                      <Label>Numéro de carte</Label>
                      <Input placeholder="**** **** **** 1234" disabled />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label>Date d'expiration</Label>
                        <Input placeholder="MM/AA" disabled />
                      </div>
                      <div>
                        <Label>CVV</Label>
                        <Input placeholder="123" disabled />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === "confirmation" && (
            <Card>
              <CardHeader>
                <CardTitle>Confirmation de commande</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Informations de livraison</h3>
                  <p className="text-sm text-gray-600">
                    {personalInfo.firstName} {personalInfo.lastName}
                    <br />
                    {personalInfo.address}
                    <br />
                    {personalInfo.postalCode} {personalInfo.city}
                    <br />
                    {personalInfo.email} • {personalInfo.phone}
                  </p>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-2">Articles commandés</h3>
                  {items.map((item) => (
                    <div key={item.product.id} className="flex justify-between py-2">
                      <span>
                        {item.product.name} x{item.quantity}
                      </span>
                      <span>{(item.product.price * item.quantity).toFixed(2)} €</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Boutons de navigation */}
          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={handlePreviousStep} disabled={currentStep === "personal"}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Précédent
            </Button>

            {currentStep !== "confirmation" ? (
              <Button onClick={handleNextStep}>
                Suivant
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handlePayment} className="bg-green-600 hover:bg-green-700">
                Confirmer et payer
              </Button>
            )}
          </div>
        </div>

        {/* Résumé de commande */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Résumé</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between text-sm">
                  <span>
                    {item.product.name} x{item.quantity}
                  </span>
                  <span>{(item.product.price * item.quantity).toFixed(2)} €</span>
                </div>
              ))}

              <Separator />

              <div className="flex justify-between">
                <span>Sous-total</span>
                <span>{getTotalPrice().toFixed(2)} €</span>
              </div>

              <div className="flex justify-between">
                <span>Livraison</span>
                <span>
                  {shippingCost === 0 ? (
                    <span className="text-green-600">Gratuit</span>
                  ) : (
                    `${shippingCost.toFixed(2)} €`
                  )}
                </span>
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>{totalWithShipping.toFixed(2)} €</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
