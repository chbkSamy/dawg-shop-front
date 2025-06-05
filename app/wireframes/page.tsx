"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function WireframesPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Wireframes - Structure des Pages</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Wireframes basse fidélité pour comprendre la structure et l'organisation du contenu de chaque page. Ces
          modèles serviront de base pour créer les maquettes haute fidélité dans Figma.
        </p>
      </div>

      {/* Page d'accueil */}
      <section>
        <h2 className="text-3xl font-bold mb-6">🏠 Page d'Accueil</h2>
        <Card>
          <CardContent className="p-8">
            <div className="border-2 border-dashed border-gray-300 p-6 space-y-6">
              {/* Header */}
              <div className="border border-gray-300 p-4 flex justify-between items-center">
                <div className="w-32 h-8 bg-gray-200 rounded"></div>
                <div className="flex space-x-4">
                  <div className="w-20 h-8 bg-gray-200 rounded"></div>
                  <div className="w-20 h-8 bg-gray-200 rounded"></div>
                  <div className="w-12 h-8 bg-gray-200 rounded"></div>
                </div>
              </div>

              {/* Hero Section */}
              <div className="border border-gray-300 p-8 text-center bg-blue-50">
                <div className="w-3/4 h-12 bg-gray-300 rounded mx-auto mb-4"></div>
                <div className="w-1/2 h-6 bg-gray-200 rounded mx-auto mb-4"></div>
                <div className="w-1/2 h-6 bg-gray-200 rounded mx-auto mb-6"></div>
                <div className="w-40 h-12 bg-blue-300 rounded mx-auto"></div>
              </div>

              {/* Produits vedettes */}
              <div className="space-y-4">
                <div className="w-64 h-8 bg-gray-300 rounded mx-auto"></div>
                <div className="grid grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="border border-gray-300 p-4 space-y-2">
                      <div className="w-full h-32 bg-gray-200 rounded"></div>
                      <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
                      <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
                      <div className="w-full h-8 bg-blue-200 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-6 py-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="text-center space-y-2">
                    <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto"></div>
                    <div className="w-32 h-4 bg-gray-200 rounded mx-auto"></div>
                    <div className="w-40 h-3 bg-gray-100 rounded mx-auto"></div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="border border-gray-300 p-6 bg-gray-100">
                <div className="grid grid-cols-4 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="space-y-2">
                      <div className="w-24 h-4 bg-gray-300 rounded"></div>
                      <div className="space-y-1">
                        <div className="w-full h-3 bg-gray-200 rounded"></div>
                        <div className="w-3/4 h-3 bg-gray-200 rounded"></div>
                        <div className="w-1/2 h-3 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* Page catalogue */}
      <section>
        <h2 className="text-3xl font-bold mb-6">📦 Page Catalogue</h2>
        <Card>
          <CardContent className="p-8">
            <div className="border-2 border-dashed border-gray-300 p-6 space-y-6">
              {/* Header */}
              <div className="border border-gray-300 p-4 flex justify-between items-center">
                <div className="w-32 h-8 bg-gray-200 rounded"></div>
                <div className="flex space-x-4">
                  <div className="w-20 h-8 bg-gray-200 rounded"></div>
                  <div className="w-20 h-8 bg-gray-200 rounded"></div>
                  <div className="w-12 h-8 bg-gray-200 rounded"></div>
                </div>
              </div>

              {/* Titre et filtres */}
              <div className="flex justify-between items-center">
                <div className="space-y-2">
                  <div className="w-48 h-8 bg-gray-300 rounded"></div>
                  <div className="w-32 h-4 bg-gray-200 rounded"></div>
                </div>
                <div className="w-48 h-10 bg-gray-200 rounded"></div>
              </div>

              {/* Grille de produits */}
              <div className="grid grid-cols-4 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="border border-gray-300 p-4 space-y-3">
                    <div className="relative">
                      <div className="w-full h-40 bg-gray-200 rounded"></div>
                      <div className="absolute top-2 right-2 w-16 h-6 bg-green-200 rounded"></div>
                    </div>
                    <div className="w-3/4 h-5 bg-gray-300 rounded"></div>
                    <div className="w-full h-3 bg-gray-200 rounded"></div>
                    <div className="w-1/2 h-3 bg-gray-200 rounded"></div>
                    <div className="flex justify-between items-center">
                      <div className="w-16 h-6 bg-blue-300 rounded"></div>
                      <div className="w-12 h-4 bg-yellow-200 rounded"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="w-full h-8 bg-gray-200 rounded"></div>
                      <div className="w-full h-8 bg-blue-200 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* Fiche produit */}
      <section>
        <h2 className="text-3xl font-bold mb-6">🎾 Fiche Produit</h2>
        <Card>
          <CardContent className="p-8">
            <div className="border-2 border-dashed border-gray-300 p-6 space-y-6">
              {/* Header */}
              <div className="border border-gray-300 p-4 flex justify-between items-center">
                <div className="w-32 h-8 bg-gray-200 rounded"></div>
                <div className="flex space-x-4">
                  <div className="w-20 h-8 bg-gray-200 rounded"></div>
                  <div className="w-20 h-8 bg-gray-200 rounded"></div>
                  <div className="w-12 h-8 bg-gray-200 rounded"></div>
                </div>
              </div>

              {/* Breadcrumb */}
              <div className="w-64 h-4 bg-gray-200 rounded"></div>

              {/* Contenu principal */}
              <div className="grid grid-cols-2 gap-8">
                {/* Image */}
                <div className="space-y-4">
                  <div className="relative">
                    <div className="w-full h-96 bg-gray-200 rounded"></div>
                    <div className="absolute top-4 right-4 w-20 h-6 bg-green-200 rounded"></div>
                  </div>
                </div>

                {/* Informations */}
                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="w-3/4 h-8 bg-gray-300 rounded"></div>
                    <div className="w-32 h-4 bg-yellow-200 rounded"></div>
                    <div className="w-24 h-8 bg-blue-300 rounded"></div>
                  </div>

                  <div className="w-full h-px bg-gray-200"></div>

                  <div className="space-y-2">
                    <div className="w-20 h-4 bg-gray-300 rounded"></div>
                    <div className="w-full h-16 bg-gray-100 rounded p-3">
                      <div className="w-full h-3 bg-gray-200 rounded mb-2"></div>
                      <div className="w-3/4 h-3 bg-gray-200 rounded"></div>
                    </div>
                  </div>

                  <div className="w-full h-px bg-gray-200"></div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="w-16 h-4 bg-gray-300 rounded"></div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-200 rounded"></div>
                        <div className="w-8 h-6 bg-gray-300 rounded"></div>
                        <div className="w-8 h-8 bg-gray-200 rounded"></div>
                      </div>
                    </div>

                    <div className="w-full h-12 bg-blue-300 rounded"></div>
                  </div>

                  {/* Informations livraison */}
                  <div className="border border-gray-200 p-4 space-y-2">
                    <div className="w-32 h-4 bg-gray-300 rounded"></div>
                    <div className="space-y-1">
                      <div className="w-full h-3 bg-gray-200 rounded"></div>
                      <div className="w-3/4 h-3 bg-gray-200 rounded"></div>
                      <div className="w-1/2 h-3 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* Page panier */}
      <section>
        <h2 className="text-3xl font-bold mb-6">🛒 Page Panier</h2>
        <Card>
          <CardContent className="p-8">
            <div className="border-2 border-dashed border-gray-300 p-6 space-y-6">
              {/* Header */}
              <div className="border border-gray-300 p-4 flex justify-between items-center">
                <div className="w-32 h-8 bg-gray-200 rounded"></div>
                <div className="flex space-x-4">
                  <div className="w-20 h-8 bg-gray-200 rounded"></div>
                  <div className="w-20 h-8 bg-gray-200 rounded"></div>
                  <div className="w-12 h-8 bg-gray-200 rounded"></div>
                </div>
              </div>

              {/* Titre */}
              <div className="flex items-center space-x-4">
                <div className="w-32 h-6 bg-gray-200 rounded"></div>
                <div className="w-48 h-8 bg-gray-300 rounded"></div>
              </div>

              <div className="grid grid-cols-3 gap-8">
                {/* Articles */}
                <div className="col-span-2 space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="border border-gray-300 p-6">
                      <div className="flex gap-4">
                        <div className="w-24 h-24 bg-gray-200 rounded"></div>
                        <div className="flex-1 space-y-2">
                          <div className="w-3/4 h-5 bg-gray-300 rounded"></div>
                          <div className="w-full h-3 bg-gray-200 rounded"></div>
                          <div className="w-20 h-5 bg-blue-300 rounded"></div>
                        </div>
                        <div className="space-y-2 text-right">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gray-200 rounded"></div>
                            <div className="w-8 h-6 bg-gray-300 rounded"></div>
                            <div className="w-8 h-8 bg-gray-200 rounded"></div>
                          </div>
                          <div className="w-16 h-5 bg-gray-300 rounded"></div>
                          <div className="w-20 h-6 bg-red-200 rounded"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Résumé */}
                <div className="border border-gray-300 p-6 space-y-4 h-fit">
                  <div className="w-32 h-6 bg-gray-300 rounded"></div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <div className="w-20 h-4 bg-gray-200 rounded"></div>
                      <div className="w-16 h-4 bg-gray-200 rounded"></div>
                    </div>
                    <div className="flex justify-between">
                      <div className="w-24 h-4 bg-gray-200 rounded"></div>
                      <div className="w-12 h-4 bg-green-300 rounded"></div>
                    </div>
                  </div>
                  <div className="w-full h-px bg-gray-200"></div>
                  <div className="flex justify-between">
                    <div className="w-16 h-5 bg-gray-300 rounded"></div>
                    <div className="w-20 h-5 bg-gray-300 rounded"></div>
                  </div>
                  <div className="w-full h-12 bg-blue-300 rounded"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* Tunnel de commande */}
      <section>
        <h2 className="text-3xl font-bold mb-6">📋 Tunnel de Commande</h2>
        <Card>
          <CardContent className="p-8">
            <div className="border-2 border-dashed border-gray-300 p-6 space-y-6">
              {/* Header */}
              <div className="border border-gray-300 p-4 flex justify-between items-center">
                <div className="w-32 h-8 bg-gray-200 rounded"></div>
                <div className="flex space-x-4">
                  <div className="w-20 h-8 bg-gray-200 rounded"></div>
                  <div className="w-20 h-8 bg-gray-200 rounded"></div>
                  <div className="w-12 h-8 bg-gray-200 rounded"></div>
                </div>
              </div>

              {/* Stepper */}
              <div className="flex items-center justify-center space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full ${i === 1 ? "bg-blue-300" : "bg-gray-200"}`}></div>
                    <div className="w-16 h-4 bg-gray-200 rounded mx-2"></div>
                    {i < 4 && <div className="w-4 h-4 bg-gray-200 rounded"></div>}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-8">
                {/* Formulaire */}
                <div className="col-span-2 border border-gray-300 p-6 space-y-6">
                  <div className="w-48 h-6 bg-gray-300 rounded"></div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="w-16 h-4 bg-gray-200 rounded"></div>
                      <div className="w-full h-10 bg-gray-100 rounded"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="w-12 h-4 bg-gray-200 rounded"></div>
                      <div className="w-full h-10 bg-gray-100 rounded"></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="w-16 h-4 bg-gray-200 rounded"></div>
                    <div className="w-full h-10 bg-gray-100 rounded"></div>
                  </div>

                  <div className="space-y-2">
                    <div className="w-20 h-4 bg-gray-200 rounded"></div>
                    <div className="w-full h-10 bg-gray-100 rounded"></div>
                  </div>

                  <div className="space-y-2">
                    <div className="w-16 h-4 bg-gray-200 rounded"></div>
                    <div className="w-full h-10 bg-gray-100 rounded"></div>
                  </div>

                  <div className="flex justify-between">
                    <div className="w-24 h-10 bg-gray-200 rounded"></div>
                    <div className="w-20 h-10 bg-blue-300 rounded"></div>
                  </div>
                </div>

                {/* Résumé */}
                <div className="border border-gray-300 p-6 space-y-4 h-fit">
                  <div className="w-20 h-6 bg-gray-300 rounded"></div>
                  {[1, 2].map((i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <div className="w-24 h-3 bg-gray-200 rounded"></div>
                      <div className="w-12 h-3 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                  <div className="w-full h-px bg-gray-200"></div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <div className="w-20 h-4 bg-gray-200 rounded"></div>
                      <div className="w-16 h-4 bg-gray-200 rounded"></div>
                    </div>
                    <div className="flex justify-between">
                      <div className="w-16 h-4 bg-gray-200 rounded"></div>
                      <div className="w-12 h-4 bg-green-300 rounded"></div>
                    </div>
                  </div>
                  <div className="w-full h-px bg-gray-200"></div>
                  <div className="flex justify-between">
                    <div className="w-16 h-5 bg-gray-300 rounded"></div>
                    <div className="w-20 h-5 bg-gray-300 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* Confirmation */}
      <section>
        <h2 className="text-3xl font-bold mb-6">✅ Page Confirmation</h2>
        <Card>
          <CardContent className="p-8">
            <div className="border-2 border-dashed border-gray-300 p-6 space-y-6">
              {/* Header */}
              <div className="border border-gray-300 p-4 flex justify-between items-center">
                <div className="w-32 h-8 bg-gray-200 rounded"></div>
                <div className="flex space-x-4">
                  <div className="w-20 h-8 bg-gray-200 rounded"></div>
                  <div className="w-20 h-8 bg-gray-200 rounded"></div>
                  <div className="w-12 h-8 bg-gray-200 rounded"></div>
                </div>
              </div>

              <div className="max-w-2xl mx-auto text-center space-y-8">
                {/* Confirmation */}
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-green-200 rounded-full mx-auto"></div>
                  <div className="w-64 h-8 bg-gray-300 rounded mx-auto"></div>
                  <div className="w-80 h-4 bg-gray-200 rounded mx-auto"></div>
                </div>

                {/* Numéro de commande */}
                <div className="border border-gray-300 p-6 space-y-4">
                  <div className="w-32 h-6 bg-gray-300 rounded mx-auto"></div>
                  <div className="w-20 h-4 bg-gray-200 rounded mx-auto"></div>
                  <div className="w-32 h-8 bg-blue-300 rounded mx-auto"></div>
                  <div className="w-64 h-3 bg-gray-200 rounded mx-auto"></div>
                </div>

                {/* Suivi */}
                <div className="border border-gray-300 p-6 space-y-4">
                  <div className="w-40 h-6 bg-gray-300 rounded mx-auto"></div>
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full ${i === 1 ? "bg-green-300" : "bg-gray-200"}`}></div>
                        <div className="flex-1 text-left space-y-1">
                          <div className="w-32 h-4 bg-gray-300 rounded"></div>
                          <div className="w-48 h-3 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-4">
                  <div className="w-48 h-12 bg-blue-300 rounded mx-auto"></div>
                  <div className="w-40 h-10 bg-gray-200 rounded mx-auto"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Instructions */}
      <div className="bg-blue-50 p-8 rounded-lg">
        <h3 className="text-2xl font-bold text-blue-900 mb-4">📋 Instructions pour Figma</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-blue-800 mb-2">Étapes de création</h4>
            <ul className="space-y-1 text-sm text-blue-700">
              <li>1. Créer un nouveau projet Figma</li>
              <li>2. Définir les frames (375px mobile, 1440px desktop)</li>
              <li>3. Créer les composants de base (boutons, cartes, etc.)</li>
              <li>4. Appliquer le design system défini</li>
              <li>5. Créer les pages selon ces wireframes</li>
              <li>6. Ajouter les interactions et transitions</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-blue-800 mb-2">Points d'attention</h4>
            <ul className="space-y-1 text-sm text-blue-700">
              <li>• Respecter la hiérarchie visuelle</li>
              <li>• Utiliser des images de jouets pour chien</li>
              <li>• Maintenir la cohérence entre les pages</li>
              <li>• Prévoir les états (hover, focus, disabled)</li>
              <li>• Optimiser pour mobile et desktop</li>
              <li>• Documenter les interactions dans Figma</li>
              <li>• Tester l'accessibilité des contrastes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
