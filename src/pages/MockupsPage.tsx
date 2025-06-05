import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Star, ShoppingCart, Menu } from "lucide-react"

export default function MockupsPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Maquettes Haute Fidélité</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Exemples de maquettes haute fidélité pour guider la création dans Figma. Ces designs appliquent le design
          system et montrent l'apparence finale attendue.
        </p>
      </div>

      {/* Maquette Mobile - Accueil */}
      <section>
        <h2 className="text-3xl font-bold mb-6">📱 Version Mobile - Accueil</h2>
        <div className="flex justify-center">
          <div className="w-80 bg-white border-2 border-gray-300 rounded-3xl p-2 shadow-xl">
            <div className="bg-gray-900 rounded-2xl overflow-hidden">
              {/* Status bar */}
              <div className="bg-black text-white text-xs p-2 flex justify-between items-center">
                <span>9:41</span>
                <div className="flex space-x-1">
                  <div className="w-4 h-2 bg-white rounded-sm"></div>
                  <div className="w-4 h-2 bg-white rounded-sm"></div>
                  <div className="w-4 h-2 bg-white rounded-sm"></div>
                </div>
              </div>

              <div className="bg-white">
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b">
                  <div className="text-2xl font-bold text-blue-600">🐕 DogToys</div>
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <ShoppingCart className="h-6 w-6 text-gray-600" />
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-blue-600">
                        2
                      </Badge>
                    </div>
                    <Menu className="h-6 w-6 text-gray-600" />
                  </div>
                </div>

                {/* Hero Section */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 text-center">
                  <h1 className="text-2xl font-bold mb-3">Les Meilleurs Jouets</h1>
                  <p className="text-sm mb-4 opacity-90">Pour votre compagnon à quatre pattes</p>
                  <Button className="bg-white text-blue-600 hover:bg-gray-100">Découvrir</Button>
                </div>

                {/* Produits vedettes */}
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-4 text-center">Produits Vedettes</h2>
                  <div className="space-y-4">
                    {[
                      { name: "Balle rebondissante", price: "5,99 €", stock: 20 },
                      { name: "Corde à mâcher", price: "7,49 €", stock: 15 },
                    ].map((product, i) => (
                      <div key={i} className="border rounded-lg p-3">
                        <div className="flex space-x-3">
                          <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                            <span className="text-xs text-gray-500">Image</span>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-sm">{product.name}</h3>
                            <div className="flex items-center space-x-1 my-1">
                              {[...Array(5)].map((_, j) => (
                                <Star key={j} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              ))}
                              <span className="text-xs text-gray-500">4.8</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-bold text-blue-600">{product.price}</span>
                              <Badge className="bg-green-500 text-xs">Stock: {product.stock}</Badge>
                            </div>
                          </div>
                        </div>
                        <Button className="w-full mt-3 text-sm" size="sm">
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Ajouter au panier
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="bg-gray-50 p-4">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    {[
                      { icon: "🚚", title: "Livraison", desc: "Gratuite dès 50€" },
                      { icon: "⭐", title: "Qualité", desc: "Garantie" },
                      { icon: "↩️", title: "Retour", desc: "30 jours" },
                    ].map((feature, i) => (
                      <div key={i} className="space-y-1">
                        <div className="text-2xl">{feature.icon}</div>
                        <h3 className="text-xs font-semibold">{feature.title}</h3>
                        <p className="text-xs text-gray-600">{feature.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation bottom */}
                <div className="border-t p-4">
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { icon: "🏠", label: "Accueil" },
                      { icon: "📦", label: "Produits" },
                      { icon: "🛒", label: "Panier" },
                      { icon: "👤", label: "Compte" },
                    ].map((nav, i) => (
                      <div key={i} className="text-center py-2">
                        <div className="text-lg">{nav.icon}</div>
                        <span className="text-xs text-gray-600">{nav.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* Checklist finale */}
      <div className="bg-green-50 p-8 rounded-lg">
        <h3 className="text-2xl font-bold text-green-900 mb-4">✅ Checklist de Validation</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-green-800 mb-3">Design</h4>
            <div className="space-y-2">
              {[
                "Palette de couleurs respectée",
                "Typographie cohérente",
                "Espacements uniformes",
                "Composants réutilisables",
                "Responsive design",
                "Accessibilité (contrastes)",
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-green-600 rounded"></div>
                  <span className="text-sm text-green-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-green-800 mb-3">Fonctionnalités</h4>
            <div className="space-y-2">
              {[
                "Navigation claire",
                "Processus d'achat complet",
                "Gestion du panier",
                "Formulaires validés",
                "États de chargement",
                "Messages d'erreur",
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-green-600 rounded"></div>
                  <span className="text-sm text-green-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
