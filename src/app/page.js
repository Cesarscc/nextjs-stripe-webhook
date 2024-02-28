"use client";
import Image from "next/image";
import { products } from "./products";

const App = () => {
  const handlePay = async (product) => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const session = await res.json();
    window.location = session.url;
  };

  return (
    <div className="px-44">
      <h1 className="text-4xl font-bold text-center my-10">Productos</h1>
      <div className="grid grid-cols-3 gap-10">
        {products.map((product, ix) => (
          <div
            key={ix}
            className="bg-slate-800 text-center p-4 rounded-md text-white"
          >
            <h2 className="font-bold text-lg">{product.name}</h2>
            <p className="text-3xl font-bold">S/.{product.price / 100}</p>
            <Image
              className="w-full"
              src={product.image}
              alt={product.name}
              width={150}
              height={150}
            />
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md mt-4 w-full"
              onClick={() => handlePay(product)}
            >
              Pagar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
