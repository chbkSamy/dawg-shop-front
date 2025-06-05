export interface Product {
  id: number
  name: string
  description: string
  price: number
  stock: number
}

export const products: Product[] = [
  {
    id: 1,
    name: "Balle rebondissante",
    description: "Balle en caoutchouc très résistante. Diamètre : 6 cm.",
    price: 5.99,
    stock: 20,
  },
  {
    id: 2,
    name: "Corde à mâcher",
    description: "Jouet en corde multicolore, longueur 25 cm.",
    price: 7.49,
    stock: 15,
  },
  {
    id: 3,
    name: "Anneau solide",
    description: "Anneau en plastique dur, parfait pour tirer et lancer.",
    price: 6.99,
    stock: 10,
  },
  {
    id: 4,
    name: "Peluche renard",
    description: "Jouet en peluche avec couineur. Taille : 20 cm.",
    price: 9.99,
    stock: 12,
  },
  {
    id: 5,
    name: "Frisbee en silicone",
    description: "Souple et léger, diamètre 22 cm.",
    price: 8.49,
    stock: 10,
  },
  {
    id: 6,
    name: "Jouet distributeur de friandises",
    description: "À remplir avec des croquettes.",
    price: 12.99,
    stock: 8,
  },
  {
    id: 7,
    name: "Os en nylon",
    description: "Pour chiens qui aiment mâcher.",
    price: 4.99,
    stock: 25,
  },
  {
    id: 8,
    name: "Balles lumineuses (lot de 2)",
    description: "Clignotent lorsqu'on les lance.",
    price: 10.99,
    stock: 14,
  },
  {
    id: 9,
    name: "Jouet en forme de donut",
    description: "Caoutchouc souple. Couleurs variées.",
    price: 6.49,
    stock: 18,
  },
  {
    id: 10,
    name: "Jouet flottant",
    description: "Idéal pour le jeu dans l'eau.",
    price: 11.49,
    stock: 9,
  },
]
