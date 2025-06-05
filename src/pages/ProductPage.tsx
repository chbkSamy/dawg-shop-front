import { useQuery } from "@apollo/client";
import { useParams, Link } from "react-router-dom";
import { useCart } from "@/hooks/use-cart";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Plus, Minus, ShoppingCart } from "lucide-react";
import { gql } from "@apollo/client";

export const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      id
      name
      description
      featuredAsset {
        preview
        source
      }
      variants {
        id
        priceWithTax
        stockLevel
      }
    }
  }
`;

export default function ProductPage() {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();

  const { data, loading, error } = useQuery(GET_PRODUCT, {
    variables: { id: id as string },
  });

  const product = data?.product;
  const variant = product?.variants?.[0];
  const imageUrl = product?.featuredAsset?.preview || product?.featuredAsset?.source;

  if (loading) return <div className="p-8">Chargement...</div>;
  if (error || !product || !variant) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Produit non trouvé</h1>
        <p className="text-gray-600 mb-8">Le produit que vous recherchez n'existe pas.</p>
        <Link to="/products">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux produits
          </Button>
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        description: product.description,
        price: variant.priceWithTax / 100,
        stock: variant.stockLevel ?? 0,
        image: imageUrl,
      });
    }
  };

  const incrementQuantity = () => {
    if (quantity < (variant.stockLevel ?? 0)) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/products"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour aux produits
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="relative">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />
          ) : (
            <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
              Pas d'image disponible
            </div>
          )}
          <Badge
            className={`absolute top-4 right-4 ${
              variant.stockLevel > 10
                ? "bg-green-500"
                : variant.stockLevel > 0
                ? "bg-orange-500"
                : "bg-red-500"
            }`}
          >
            {variant.stockLevel > 0
              ? `En stock: ${variant.stockLevel}`
              : "Rupture de stock"}
          </Badge>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            <p className="text-4xl font-bold text-blue-600 mb-4">
              {(variant.priceWithTax / 100).toFixed(2)} €
            </p>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          <Separator />

          <div className="space-y-4">
            <div>
              <label className="text-lg font-semibold mb-2 block">
                Quantité
              </label>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-xl font-semibold w-12 text-center">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={incrementQuantity}
                  disabled={quantity >= variant.stockLevel}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Button
              onClick={handleAddToCart}
              className="w-full py-3 text-lg"
              disabled={variant.stockLevel === 0}
              size="lg"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              {variant.stockLevel === 0
                ? "Rupture de stock"
                : `Ajouter au panier - ${(
                    (variant.priceWithTax / 100) *
                    quantity
                  ).toFixed(2)} €`}
            </Button>
          </div>

          <Card>
            <CardContent className="p-4">
              <h4 className="font-semibold mb-2">Informations de livraison</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Livraison standard : 4,99 €</li>
                <li>• Livraison gratuite à partir de 50 €</li>
                <li>• Délai de livraison : 2-3 jours ouvrés</li>
                <li>• Retour gratuit sous 30 jours</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
