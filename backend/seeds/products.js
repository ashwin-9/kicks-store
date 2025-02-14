import { sql } from "../config/db.js";

const SAMPLE_PRODUCTS = [
  {
    name: "Asics Gel Running Shoes",
    price: 13489.00,
    image:
      "https://images.unsplash.com/photo-1575456456278-936c89ccdb7b?w=800&auto=format&fit=crop&q=60",
  },
  {
    name: "Adidas Sneakers",
    price: 14990.00,
    image:
        "https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8??w=800&auto=format&fit=crop&q=60",
  },
  {
    name: "Adidas Grey Running Shoes",
    price: 7899.00,
    image:
      "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?w=800&auto=format&fit=crop&q=60",
  },
  {
    name: "Nike Running Shoes",
    price: 12499.99,
    image:
        "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&auto=format&fit=crop&q=60",
  },
  {
    name: "Nike Red Sneakers",
    price: 10399.00,
    image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=60",
  },
  {
    name: "White Puma Sneakers",
    price: 6499.99,
    image:
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&auto=format&fit=crop&q=60",
  },
  {
    name: "Nike Air Jordan",
    price: 18499.99,
    image:
      "https://images.unsplash.com/photo-1612724189298-89d36b10b26d?w=800&auto=format&fit=crop&q=60",
  },
  {
    name: "New Balance Sneakers",
    price: 14449.99,
    image:
      "https://images.unsplash.com/photo-1539185441755-769473a23570??w=800&auto=format&fit=crop&q=60",
  },
];

async function seedDatabase() {
  try {
    // first, clear existing data
    await sql`TRUNCATE TABLE products RESTART IDENTITY`;

    // insert all products
    for (const product of SAMPLE_PRODUCTS) {
      await sql`
        INSERT INTO products (name, price, image)
        VALUES (${product.name}, ${product.price}, ${product.image})
      `;
    }

    console.log("Database seeded successfully");
    process.exit(0); // success code
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1); // failure code
  }
}

seedDatabase();