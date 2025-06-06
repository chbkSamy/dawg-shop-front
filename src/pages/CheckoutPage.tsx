"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, ArrowRight, CreditCard, Truck } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useCart } from "@/hooks/use-cart"
import { gql, useMutation, useQuery } from "@apollo/client"
import { useToast } from "@/hooks/use-toast"

const GET_ACTIVE_ORDER = gql`
  query GetActiveOrder {
    activeOrder {
      id
      code
      totalWithTax
      shippingWithTax
      lines {
        productVariant {
          id
          name
          priceWithTax
        }
        quantity
      }
      customer {
        id
        emailAddress
      }
    }
    eligibleShippingMethods {
      id
      name
      description
      priceWithTax
    }
    activeCustomer {
      id
      firstName
      lastName
      emailAddress
    }
  }
`

const SET_CUSTOMER_FOR_ORDER = gql`
  mutation SetCustomerForOrder($input: CreateCustomerInput!) {
    setCustomerForOrder(input: $input) {
      ... on Order {
        id
        customer {
          id
          firstName
          lastName
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

const SET_SHIPPING_ADDRESS = gql`
  mutation SetShippingAddress($orderId: ID!, $input: CreateAddressInput!) {
    setOrderShippingAddress(orderId: $orderId, input: $input) {
      id
      shippingAddress {
        fullName
        streetLine1
        city
        postalCode
        country {
          name
        }
      }
    }
  }
`

const SET_SHIPPING_METHOD = gql`
  mutation SetShippingMethod($orderId: ID!, $shippingMethodIds: [ID!]!) {
    setOrderShippingMethod(orderId: $orderId, shippingMethodIds: $shippingMethodIds) {
      id
    }
  }
`

const ADD_PAYMENT_TO_ORDER = gql`
  mutation AddPaymentToOrder($input: PaymentInput!) {
    addPaymentToOrder(input: $input) {
      id
      state
    }
  }
`

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { items, getTotalPrice, clearCart } = useCart()
  const [currentStep, setCurrentStep] = useState("personal")
  const [shippingMethod, setShippingMethod] = useState(null)
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "France"
  })
  const [orderId, setOrderId] = useState(null)

  const { data, loading, error, refetch } = useQuery(GET_ACTIVE_ORDER)
  const [setCustomer] = useMutation(SET_CUSTOMER_FOR_ORDER)
  const [setShippingAddress] = useMutation(SET_SHIPPING_ADDRESS)
  const [setShippingMethodMutation] = useMutation(SET_SHIPPING_METHOD)
  const [addPayment] = useMutation(ADD_PAYMENT_TO_ORDER)

  useEffect(() => {
    if (data?.activeOrder?.id) {
      setOrderId(data.activeOrder.id)
    }
  }, [data])

  const { shippingCost, totalWithShipping } = useMemo(() => {
    const cost = data?.activeOrder?.shippingWithTax ?? 0
    const subtotal = getTotalPrice() * 100
    return {
      shippingCost: cost / 100,
      totalWithShipping: (subtotal + cost) / 100
    }
  }, [data, getTotalPrice])

  const handlePersonalInfoChange = (field, value) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }))
  }

  const handleNextStep = async () => {
    if (currentStep === "personal") {
      const allFilled = Object.values(personalInfo).every(v => v.trim() !== "")
      if (!allFilled) {
        toast({ title: "Champs manquants", description: "Veuillez remplir tous les champs." })
        return
      }
    }

    if (currentStep === "shipping" && orderId) {
      try {
        if (data?.activeCustomer?.id) {
          await setCustomer({
            variables: { input: { emailAddress: data.activeCustomer.emailAddress } }
          })
        } else {
          await setCustomer({
            variables: {
              input: {
                emailAddress: personalInfo.email,
                firstName: personalInfo.firstName,
                lastName: personalInfo.lastName
              }
            }
          })
        }

        await setShippingAddress({
          variables: {
            orderId,
            input: {
              fullName: `${personalInfo.firstName} ${personalInfo.lastName}`,
              streetLine1: personalInfo.address,
              city: personalInfo.city,
              postalCode: personalInfo.postalCode,
              countryCode: "FR"
            }
          }
        })

        if (shippingMethod) {
          await setShippingMethodMutation({
            variables: { orderId, shippingMethodIds: [shippingMethod] }
          })
        }
      } catch (err) {
        toast({ title: "Erreur", description: "Échec de la mise à jour de la commande" })
        return
      }
    }

    const steps = ["personal", "shipping", "payment", "confirmation"]
    const next = steps[steps.indexOf(currentStep) + 1]
    setCurrentStep(next)
  }

  const handlePreviousStep = () => {
    const steps = ["personal", "shipping", "payment", "confirmation"]
    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1])
    }
  }

  const handlePayment = async () => {
    if (!orderId) return
    try {
      const { data: paymentData } = await addPayment({
        variables: {
          input: {
            method: "dummy-payment-method",
            metadata: { paymentMethod: "dummy", orderId }
          }
        }
      })
      if (paymentData?.addPaymentToOrder?.state === "PaymentSettled") {
        toast({ title: "Paiement réussi" })
        clearCart()
        navigate("/order-confirmation")
      } else {
        toast({ title: "Paiement refusé" })
      }
    } catch (err) {
      toast({ title: "Erreur paiement", description: err.message })
    }
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Link to="/cart" className="mr-4">
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="postalCode">Code postal *</Label>
                    <Input
                      id="postalCode"
                      value={personalInfo.postalCode}
                      onChange={(e) => handlePersonalInfoChange("postalCode", e.target.value)}
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="city">Ville *</Label>
                    <Input
                      id="city"
                      value={personalInfo.city}
                      onChange={(e) => handlePersonalInfoChange("city", e.target.value)}
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
                {data?.eligibleShippingMethods && data.eligibleShippingMethods.length > 0 ? (
                  <div>
                    <p className="mb-4 text-sm text-gray-600">
                      Sélectionnez une méthode de livraison (optionnel)
                    </p>
                    <RadioGroup
                      value={shippingMethod || ""}
                      onValueChange={setShippingMethod}
                    >
                      {data.eligibleShippingMethods.map((method) => (
                        <div key={method.id} className="flex items-center space-x-2 p-4 border rounded-lg mb-2">
                          <RadioGroupItem value={method.id} id={method.id} />
                          <Label htmlFor={method.id} className="flex-1 cursor-pointer">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-semibold">{method.name}</p>
                                <p className="text-sm text-gray-600">{method.description}</p>
                              </div>
                              <span className="font-semibold">
                                {(method.priceWithTax / 100).toFixed(2)} €
                              </span>
                            </div>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                ) : (
                  <p className="text-yellow-600 p-4 bg-yellow-50 rounded-lg">
                    Aucune méthode de livraison disponible pour votre commande.
                    Vous pouvez continuer sans sélectionner de méthode de livraison.
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
                  <h3 className="font-semibold mb-4">Paiement par carte bancaire</h3>
                  <p className="text-sm text-gray-600 mb-6">
                    Nous utilisons le dummy payment handler de Vendure pour simuler le paiement.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Numéro de carte</Label>
                      <Input
                        id="cardNumber"
                        placeholder="4242 4242 4242 4242"
                        defaultValue="4242 4242 4242 4242"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Date d'expiration</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/AA"
                          defaultValue="12/30"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          defaultValue="123"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="cardName">Nom sur la carte</Label>
                      <Input
                        id="cardName"
                        placeholder="NOM PRÉNOM"
                        defaultValue={`${personalInfo.firstName} ${personalInfo.lastName}`.toUpperCase()}
                      />
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

                <div>
                  <h3 className="font-semibold mb-2">Méthode de livraison</h3>
                  <p className="text-sm text-gray-600">
                    {shippingMethod
                      ? data?.eligibleShippingMethods?.find(m => m.id === shippingMethod)?.name || "Méthode sélectionnée"
                      : "Non spécifiée"}
                  </p>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-2">Articles commandés</h3>
                  {items.map((item) => (
                    <div key={`${item.product.id}-${item.variantId}`} className="flex justify-between py-2">
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
                Confirmer et payer {(totalWithShipping).toFixed(2)} €
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
                <div key={`${item.product.id}-${item.variantId}`} className="flex justify-between text-sm">
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
