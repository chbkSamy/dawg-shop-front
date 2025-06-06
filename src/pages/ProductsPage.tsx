import { useState, useMemo } from "react";
import { gql, useQuery } from "@apollo/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/hooks/use-cart";
import  Loader  from "@/components/loader.tsx";

type SortOption = "name-asc" | "name-desc" | "price-asc" | "price-desc";

const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      items {
        id
        name
        description
        slug
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
  }
`;

interface Product {
  id: string;
  name: string;
  description: string;
  slug: string;
  featuredAsset?: {
    preview: string;
    source: string;
  };
  variants: {
    id: string;
    priceWithTax: number;
    stockLevel: number;
  }[];
}

export default function ProductsPage() {
  const { addToCart } = useCart();
  const [sortBy, setSortBy] = useState<SortOption>("name-asc");

  const { loading, error, data } = useQuery(GET_PRODUCTS);

  const products: Product[] = data?.products?.items || [];

  const sortedProducts = useMemo(() => {
    const sorted = [...products];

    switch (sortBy) {
      case "name-asc":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case "price-asc":
        return sorted.sort((a, b) => (a.variants[0]?.priceWithTax || 0) - (b.variants[0]?.priceWithTax || 0));
      case "price-desc":
        return sorted.sort((a, b) => (b.variants[0]?.priceWithTax || 0) - (a.variants[0]?.priceWithTax || 0));
      default:
        return sorted;
    }
  }, [sortBy, products]);

  const handleAddToCart = (product: Product) => {
    const variant = product.variants[0];
    if (!variant) return;

    addToCart({
      id: product.id,
      name: product.name,
      description: product.description,
      price: variant.priceWithTax / 100,
      stock: variant.stockLevel,
      image: product.featuredAsset?.preview || product.featuredAsset?.source,
      variantId: variant.id
    });
  };

  if (loading) return <Loader />;
  if (error) {
    console.error("Erreur GraphQL:", error);
    return <p>Erreur lors du chargement des produits: {error.message}</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-700 mb-2">Tous nos Jouets</h1>
          <p className="text-gray-500">{products.length} produits disponibles</p>
        </div>

        <div className="mt-4 md:mt-0">
          <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
            <SelectTrigger className="w-[200px] border-gray-200">
              <SelectValue placeholder="Trier par..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name-asc">Nom (A-Z)</SelectItem>
              <SelectItem value="name-desc">Nom (Z-A)</SelectItem>
              <SelectItem value="price-asc">Prix croissant</SelectItem>
              <SelectItem value="price-desc">Prix décroissant</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedProducts.map((product) => {
          const variant = product.variants[0];
          const price = variant?.priceWithTax || 0;
          const stock = variant?.stockLevel || 0;
          const imageUrl = product.featuredAsset?.preview || product.featuredAsset?.source;

          return (
            <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 border-gray-100">
              <Link to={`/products/${product.id}`} className="block cursor-pointer text-inherit no-underline">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400">
                        Image manquante
                      </div>
                    )}
                    <Badge
                      className={`absolute top-3 right-3 border-0 ${
                        stock > 10
                          ? "bg-green-200 text-green-700"
                          : stock > 0
                          ? "bg-orange-200 text-orange-700"
                          : "bg-red-200 text-red-700"
                      }`}
                    >
                      {stock > 0 ? `Stock: ${stock}` : "Épuisé"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-lg mb-2 text-gray-700">{product.name}</CardTitle>
                  <p className="text-gray-500 text-sm mb-3 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-rose-400">{(price / 100).toFixed(2)} €</span>
                  </div>
                </CardContent>
              </Link>

              <CardFooter className="p-4 pt-0">
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}
                  className="w-full bg-rose-300 hover:bg-rose-400 text-white border-0"
                  disabled={stock === 0}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {stock === 0 ? "Épuisé" : "Ajouter au panier"}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
