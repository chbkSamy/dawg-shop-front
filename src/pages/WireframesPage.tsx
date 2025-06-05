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
