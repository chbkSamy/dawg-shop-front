"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Star, ShoppingCart, Heart, Search, User, Menu } from "lucide-react"

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

      {/* Maquette Desktop - Catalogue */}
      <section>
        <h2 className="text-3xl font-bold mb-6">💻 Version Desktop - Catalogue</h2>
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-white">
              {/* Header */}
              <div className="border-b px-8 py-4">
                <div className="flex justify-between items-center">
                  <div className="text-3xl font-bold text-blue-600">🐕 DogToys</div>
                  <nav className="flex items-center space-x-8">
                    <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">
                      Accueil
                    </a>
                    <a href="#" className="text-blue-600 font-medium border-b-2 border-blue-600 pb-1">
                      Produits
                    </a>
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Rechercher..."
                          className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="relative">
                        <ShoppingCart className="h-6 w-6 text-gray-600" />
                        <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-blue-600">
                          3
                        </Badge>
                      </div>
                      <User className="h-6 w-6 text-gray-600" />
                    </div>
                  </nav>
                </div>
              </div>

              {/* Breadcrumb et filtres */}
              <div className="px-8 py-6 border-b bg-gray-50">
                <div className="flex justify-between items-center">
                  <div>
                    <nav className="text-sm text-gray-600 mb-2">
                      <span>Accueil</span> <span className="mx-2">></span>{" "}
                      <span className="text-gray-900">Produits</span>
                    </nav>
                    <h1 className="text-3xl font-bold text-gray-900">Tous nos Jouets</h1>
                    <p className="text-gray-600 mt-1">10 produits disponibles</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <select className="border rounded-lg px-4 py-2 bg-white">
                      <option>Trier par...</option>
                      <option>Prix croissant</option>
                      <option>Prix décroissant</option>
                      <option>Nom (A-Z)</option>
                    </select>
                    <div className="flex border rounded-lg">
                      <button className="px-3 py-2 bg-blue-600 text-white rounded-l-lg">
                        <div className="grid grid-cols-2 gap-1">
                          <div className="w-2 h-2 bg-white rounded"></div>
                          <div className="w-2 h-2 bg-white rounded"></div>
                          <div className="w-2 h-2 bg-white rounded"></div>
                          <div className="w-2 h-2 bg-white rounded"></div>
                        </div>
                      </button>
                      <button className="px-3 py-2 text-gray-600 rounded-r-lg">
                        <div className="space-y-1">
                          <div className="w-4 h-1 bg-gray-400 rounded"></div>
                          <div className="w-4 h-1 bg-gray-400 rounded"></div>
                          <div className="w-4 h-1 bg-gray-400 rounded"></div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Grille de produits */}
              <div className="px-8 py-8">
                <div className="grid grid-cols-4 gap-6">
                  {[
                    { name: "Balle rebondissante", price: "5,99 €", stock: 20, status: "high" },
                    { name: "Corde à mâcher", price: "7,49 €", stock: 15, status: "medium" },
                    { name: "Anneau solide", price: "6,99 €", stock: 10, status: "medium" },
                    { name: "Peluche renard", price: "9,99 €", stock: 12, status: "medium" },
                    { name: "Frisbee silicone", price: "8,49 €", stock: 10, status: "medium" },
                    { name: "Distributeur friandises", price: "12,99 €", stock: 8, status: "low" },
                    { name: "Os en nylon", price: "4,99 €", stock: 25, status: "high" },
                    { name: "Balles lumineuses", price: "10,99 €", stock: 14, status: "medium" },
                  ].map((product, i) => (
                    <Card key={i} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <CardContent className="p-0">
                        <div className="relative overflow-hidden">
                          <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                            <span className="text-gray-500 text-sm">Image {product.name}</span>
                          </div>
                          <Badge
                            className={`absolute top-3 right-3 ${
                              product.status === "high"
                                ? "bg-green-500"
                                : product.status === "medium"
                                  ? "bg-orange-500"
                                  : "bg-red-500"
                            }`}
                          >
                            Stock: {product.stock}
                          </Badge>
                          <button className="absolute top-3 left-3 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                            <Heart className="h-4 w-4 text-gray-600" />
                          </button>
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                          <p className="text-gray-600 text-sm mb-3">
                            Description du produit avec ses caractéristiques principales.
                          </p>
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-2xl font-bold text-blue-600">{product.price}</span>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, j) => (
                                <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              ))}
                              <span className="text-sm text-gray-500 ml-1">4.8</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Button variant="outline" className="w-full">
                              Voir détails
                            </Button>
                            <Button className="w-full">
                              <ShoppingCart className="mr-2 h-4 w-4" />
                              Ajouter au panier
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-12">
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      Précédent
                    </Button>
                    <Button size="sm" className="bg-blue-600">
                      1
                    </Button>
                    <Button variant="outline" size="sm">
                      2
                    </Button>
                    <Button variant="outline" size="sm">
                      3
                    </Button>
                    <Button variant="outline" size="sm">
                      Suivant
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* Guide de création Figma */}
      <section>
        <h2 className="text-3xl font-bold mb-6">🎨 Guide de Création Figma</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Étapes de Création</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-blue-600">1. Préparation</h4>
                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                  <li>• Créer un nouveau projet Figma</li>
                  <li>• Définir les frames (375px mobile, 1440px desktop)</li>
                  <li>• Importer les polices (Inter ou similaire)</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-green-600">2. Design System</h4>
                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                  <li>• Créer la palette de couleurs</li>
                  <li>• Définir les styles de texte</li>
                  <li>• Créer les composants de base</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-purple-600">3. Composants</h4>
                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                  <li>• Boutons (primaire, secondaire, outline)</li>
                  <li>• Cartes produits avec variants</li>
                  <li>• Header et navigation</li>
                  <li>• Formulaires et champs de saisie</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-orange-600">4. Pages</h4>
                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                  <li>• Accueil avec hero et produits vedettes</li>
                  <li>• Catalogue avec grille et filtres</li>
                  <li>• Fiche produit détaillée</li>
                  <li>• Panier et tunnel de commande</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ressources et Assets</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-blue-600">Images Suggérées</h4>
                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                  <li>• Photos de jouets pour chien (Unsplash)</li>
                  <li>• Images de chiens heureux</li>
                  <li>• Icônes Lucide React ou Heroicons</li>
                  <li>• Illustrations vectorielles simples</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-green-600">Plugins Utiles</h4>
                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                  <li>• Content Reel (textes et images)</li>
                  <li>• Unsplash (photos gratuites)</li>
                  <li>• Iconify (icônes)</li>
                  <li>• Auto Layout (mise en page)</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-purple-600">Interactions</h4>
                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                  <li>• Hover states sur les boutons</li>
                  <li>• Transitions entre pages</li>
                  <li>• Animations de chargement</li>
                  <li>• États des formulaires</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-orange-600">Export</h4>
                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                  <li>• Assets en PNG/SVG</li>
                  <li>• Spécifications CSS</li>
                  <li>• Prototype interactif</li>
                  <li>• Documentation des composants</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

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
