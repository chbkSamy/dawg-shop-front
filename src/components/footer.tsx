export function Footer() {
  return (
    <footer className="bg-gray-700 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">🐕 Dawg Store</h3>
            <p className="text-gray-300 text-sm">
              Votre boutique de jouets doux et colorés pour chien. Qualité garantie et livraison rapide.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="/" className="hover:text-rose-300 transition-colors">
                  Accueil
                </a>
              </li>
              <li>
                <a href="/products" className="hover:text-rose-300 transition-colors">
                  Produits
                </a>
              </li>
              <li>
                <a href="/cart" className="hover:text-rose-300 transition-colors">
                  Panier
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>📞 01 23 45 67 89</li>
              <li>✉️ hello@dawgstore.fr</li>
              <li>🕒 Lun-Ven 9h-18h</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Livraison</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>🚚 Livraison 2-3 jours</li>
              <li>🆓 Gratuite dès 50€</li>
              <li>↩️ Retour gratuit 30j</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
