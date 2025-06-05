import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Star, Heart, Search, Plus, Minus } from "lucide-react"

export default function DesignSystemPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Design System - Dawg Store</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Guide simplifié du design system pour la boutique Dawg Store. Design épuré avec des couleurs pastel douces et
          une interface minimaliste.
        </p>
      </div>

      {/* Palette de couleurs pastel */}
      <section>
        <h2 className="text-3xl font-bold mb-6">🎨 Palette de Couleurs Pastel</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Couleurs Primaires</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="w-full h-16 bg-rose-300 rounded flex items-center justify-center text-white font-semibold">
                  Rose 300
                </div>
                <p className="text-sm text-gray-600">#FDA4AF - Boutons principaux</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-16 bg-rose-400 rounded flex items-center justify-center text-white font-semibold">
                  Rose 400
                </div>
                <p className="text-sm text-gray-600">#FB7185 - Hover states</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Couleurs Secondaires</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="w-full h-16 bg-blue-200 rounded flex items-center justify-center text-gray-700 font-semibold">
                  Blue 200
                </div>
                <p className="text-sm text-gray-600">#BFDBFE - Accents, liens</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-16 bg-purple-200 rounded flex items-center justify-center text-gray-700 font-semibold">
                  Purple 200
                </div>
                <p className="text-sm text-gray-600">#DDD6FE - Highlights</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Couleurs d'État</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="w-full h-16 bg-green-200 rounded flex items-center justify-center text-gray-700 font-semibold">
                  Green 200
                </div>
                <p className="text-sm text-gray-600">#BBF7D0 - Succès, stock</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-16 bg-orange-200 rounded flex items-center justify-center text-gray-700 font-semibold">
                  Orange 200
                </div>
                <p className="text-sm text-gray-600">#FED7AA - Attention</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Couleurs Neutres</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="w-full h-16 bg-gray-700 rounded flex items-center justify-center text-white font-semibold">
                  Gray 700
                </div>
                <p className="text-sm text-gray-600">#374151 - Titres</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-16 bg-gray-500 rounded flex items-center justify-center text-white font-semibold">
                  Gray 500
                </div>
                <p className="text-sm text-gray-600">#6B7280 - Texte</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-16 bg-gray-50 rounded flex items-center justify-center text-gray-700 font-semibold">
                  Gray 50
                </div>
                <p className="text-sm text-gray-600">#F9FAFB - Arrière-plans</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      {/* Typographie simplifiée */}
      <section>
        <h2 className="text-3xl font-bold mb-6">📝 Typographie Simplifiée</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Hiérarchie des Titres</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-700 mb-2">Titre Principal - 30px</h1>
                <p className="text-sm text-gray-500">Pages principales</p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">Titre Section - 24px</h2>
                <p className="text-sm text-gray-500">Sections importantes</p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-700 mb-2">Titre Produit - 20px</h3>
                <p className="text-sm text-gray-500">Noms de produits</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Corps de Texte</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="text-base text-gray-700 mb-2">Texte Normal - 16px</p>
                <p className="text-sm text-gray-500">Contenu principal</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Texte Petit - 14px</p>
                <p className="text-xs text-gray-400">Informations secondaires</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-2">Texte Très Petit - 12px</p>
                <p className="text-xs text-gray-400">Détails, mentions</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      {/* Boutons simplifiés */}
      <section>
        <h2 className="text-3xl font-bold mb-6">🔘 Boutons Simplifiés</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Boutons Primaires</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button size="lg" className="w-full bg-rose-300 hover:bg-rose-400 text-white">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Ajouter au panier
              </Button>
              <Button size="default" className="w-full bg-rose-300 hover:bg-rose-400 text-white">
                Commander
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Boutons Secondaires</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" size="lg" className="w-full border-blue-200 text-blue-600 hover:bg-blue-50">
                <Heart className="mr-2 h-5 w-5" />
                Favoris
              </Button>
              <Button
                variant="outline"
                size="default"
                className="w-full border-purple-200 text-purple-600 hover:bg-purple-50"
              >
                Voir détails
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Boutons d'Action</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-center space-x-3">
                <Button variant="outline" size="sm" className="border-gray-200">
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-medium">2</span>
                <Button variant="outline" size="sm" className="border-gray-200">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      {/* Cartes de produits simplifiées */}
      <section>
        <h2 className="text-3xl font-bold mb-6">🃏 Cartes Produits Simplifiées</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="group hover:shadow-md transition-shadow duration-300 border-gray-100">
            <CardHeader className="p-0">
              <div className="relative overflow-hidden rounded-t-lg">
                <div className="w-full h-48 bg-gradient-to-br from-rose-100 to-purple-100 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">🎾 Balle douce</span>
                </div>
                <Badge className="absolute top-3 right-3 bg-green-200 text-green-700 border-0">En stock</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Balle rebondissante</h3>
              <p className="text-gray-500 text-sm mb-3">Balle douce et résistante</p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-semibold text-rose-400">5,99 €</span>
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-300 text-yellow-300" />
                  <span className="text-sm text-gray-400 ml-1">4.8</span>
                </div>
              </div>
              <Button className="w-full bg-rose-300 hover:bg-rose-400 text-white border-0">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Ajouter
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-md transition-shadow duration-300 border-gray-100">
            <CardHeader className="p-0">
              <div className="relative overflow-hidden rounded-t-lg">
                <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">🪢 Corde colorée</span>
                </div>
                <Badge className="absolute top-3 right-3 bg-orange-200 text-orange-700 border-0">Stock faible</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Corde à mâcher</h3>
              <p className="text-gray-500 text-sm mb-3">Corde multicolore douce</p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-semibold text-rose-400">7,49 €</span>
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-300 text-yellow-300" />
                  <span className="text-sm text-gray-400 ml-1">4.6</span>
                </div>
              </div>
              <Button className="w-full bg-rose-300 hover:bg-rose-400 text-white border-0">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Ajouter
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-md transition-shadow duration-300 border-gray-100 opacity-60">
            <CardHeader className="p-0">
              <div className="relative overflow-hidden rounded-t-lg">
                <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">🧸 Peluche</span>
                </div>
                <Badge className="absolute top-3 right-3 bg-red-200 text-red-700 border-0">Épuisé</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <h3 className="text-lg font-medium text-gray-500 mb-2">Peluche renard</h3>
              <p className="text-gray-400 text-sm mb-3">Peluche douce avec couineur</p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-semibold text-gray-400">9,99 €</span>
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-300 text-yellow-300" />
                  <span className="text-sm text-gray-400 ml-1">4.9</span>
                </div>
              </div>
              <Button className="w-full bg-gray-300 text-gray-500 border-0" disabled>
                Épuisé
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      {/* Badges simplifiés */}
      <section>
        <h2 className="text-3xl font-bold mb-6">🏷️ Badges Simplifiés</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Stock</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Badge className="bg-green-200 text-green-700 border-0">En stock</Badge>
              <Badge className="bg-orange-200 text-orange-700 border-0">Stock faible</Badge>
              <Badge className="bg-red-200 text-red-700 border-0">Épuisé</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Promotions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Badge className="bg-rose-200 text-rose-700 border-0">-20%</Badge>
              <Badge className="bg-purple-200 text-purple-700 border-0">Nouveau</Badge>
              <Badge className="bg-blue-200 text-blue-700 border-0">Populaire</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Livraison</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Badge className="bg-blue-200 text-blue-700 border-0">Préparation</Badge>
              <Badge className="bg-orange-200 text-orange-700 border-0">Expédiée</Badge>
              <Badge className="bg-green-200 text-green-700 border-0">Livrée</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Qualité</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Badge className="bg-green-200 text-green-700 border-0">Bio</Badge>
              <Badge className="bg-purple-200 text-purple-700 border-0">Premium</Badge>
              <Badge className="bg-blue-200 text-blue-700 border-0">Résistant</Badge>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      {/* Formulaires simplifiés */}
      <section>
        <h2 className="text-3xl font-bold mb-6">📋 Formulaires Simplifiés</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Champs de Base</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-gray-600">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  className="border-gray-200 focus:border-rose-300 focus:ring-rose-200"
                />
              </div>
              <div>
                <Label htmlFor="name" className="text-gray-600">
                  Nom
                </Label>
                <Input
                  id="name"
                  placeholder="Jean Dupont"
                  className="border-gray-200 focus:border-rose-300 focus:ring-rose-200"
                />
              </div>
              <div>
                <Label htmlFor="search" className="text-gray-600">
                  Recherche
                </Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="Rechercher..."
                    className="pl-10 border-gray-200 focus:border-rose-300 focus:ring-rose-200"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>États des Champs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="valid" className="text-gray-600">
                  Champ valide
                </Label>
                <Input
                  id="valid"
                  value="jean.dupont@email.com"
                  className="border-green-200 focus:border-green-300 focus:ring-green-200"
                />
                <p className="text-sm text-green-600 mt-1">✓ Email valide</p>
              </div>
              <div>
                <Label htmlFor="error" className="text-gray-600">
                  Champ en erreur
                </Label>
                <Input
                  id="error"
                  value="email-invalide"
                  className="border-red-200 focus:border-red-300 focus:ring-red-200"
                />
                <p className="text-sm text-red-500 mt-1">✗ Format invalide</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      {/* Guide simplifié */}
      <section>
        <h2 className="text-3xl font-bold mb-6">📚 Guide Simplifié</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Principes de Design</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-rose-600 mb-2">✨ Simplicité</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Interface épurée et minimaliste</li>
                    <li>• Couleurs pastel douces</li>
                    <li>• Espaces blancs généreux</li>
                    <li>• Navigation intuitive</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-blue-600 mb-2">🎨 Couleurs</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Rose pastel comme couleur principale</li>
                    <li>• Bleu et violet pour les accents</li>
                    <li>• Vert pour les succès</li>
                    <li>• Gris doux pour le texte</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Éléments Clés</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-purple-600 mb-2">🏪 Dawg Store</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Nom moderne et friendly</li>
                    <li>• Logo simple avec emoji 🐕</li>
                    <li>• Ton décontracté et chaleureux</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-green-600 mb-2">📱 Responsive</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Mobile: 375px</li>
                    <li>• Desktop: 1200px max</li>
                    <li>• Grille simple et flexible</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer du design system */}
      <div className="text-center py-8 border-t border-gray-100">
        <p className="text-gray-500">
          Design system simplifié pour Dawg Store - Couleurs pastel et interface épurée
          <br />
          Parfait pour créer des maquettes Figma douces et modernes
        </p>
      </div>
    </div>
  )
}
