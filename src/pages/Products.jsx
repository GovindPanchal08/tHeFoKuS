import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingCart,
  ShoppingCartIcon,
  Star,
} from "lucide-react";
import { useCart } from "../Context/CartContext";
import { useState } from "react";
import { flavors } from "../constants/Products";
import { Link, useNavigate } from "react-router-dom";
const ProductsPage = () => {
  const navigate = useNavigate()
  const { addToCart } = useCart();
  const [packType, setPackType] = useState("mixed");
  const [quantity, setQuantity] = useState(1);
  const [selectedFlavor, setSelectedFlavor] = useState("mango");

  const currentFlavor = flavors[selectedFlavor];

  const handleQuantityChange = (type) => {
    if (type === "increment") {
      setQuantity((prev) => prev + 1);
    } else if (type === "decrement" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    const product = {
      id:
        packType === "mixed"
          ? "fokus-mixed-pack"
          : `fokus-${selectedFlavor}-pack`,
      name:
        packType === "mixed"
          ? "Fokus Hydration Pack of 3 (Mixed Flavors)"
          : `Fokus Hydration Pack of 3 (${currentFlavor.name})`,
      price: 450,
      quantity: quantity,
      type: packType,
      flavor: packType === "single" ? selectedFlavor : null,
      image: packType === "mixed" ? "🥭🥝🍓" : currentFlavor.image,
    };
    addToCart(product);
    alert("Added to cart!");
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${currentFlavor.color} transition-all duration-700 ease-in-out`}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 p-6 lg:p-12">
              <div className="space-y-6 order-2 lg:order-1">
                <div>
                  <button
                    onClick={() => navigate("/")}
                    className="  text-gray-500 gap-2 hover:underline font-medium text-lg flex items-center"
                  >
                    <ArrowLeft className="w-5 h-5" /> Go to Home
                  </button>
                  <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                    Fokus Hydration Pack of 3
                  </h1>
                  <p className="text-xl text-gray-600 mb-2">
                    <strong>3 Bottles Per Pack</strong>
                  </p>
                  <p className="text-lg text-gray-500 mb-6">
                    Premium Hydration Experience
                  </p>

                  <div className="flex items-center space-x-2 mb-6">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      (4.8/5 - 234 reviews)
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    Choose Your Pack
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div
                      onClick={() => setPackType("mixed")}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                        packType === "mixed"
                          ? "bg-blue-500 text-white border-transparent shadow-lg transform scale-105"
                          : "bg-gray-50 border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-2xl mb-2">🥭🥝🍓</div>
                        <div
                          className={`font-medium ${
                            packType === "mixed"
                              ? "text-white"
                              : "text-gray-700"
                          }`}
                        >
                          Mixed Pack
                        </div>
                        <div
                          className={`text-sm ${
                            packType === "mixed"
                              ? "text-white/80"
                              : "text-gray-500"
                          }`}
                        >
                          1 of Each Flavor
                        </div>
                      </div>
                    </div>

                    <div
                      onClick={() => setPackType("single")}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                        packType === "single"
                          ? `${currentFlavor.accent} text-white border-transparent shadow-lg transform scale-105`
                          : "bg-gray-50 border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-2xl mb-2">
                          {currentFlavor.image}
                          {currentFlavor.image}
                          {currentFlavor.image}
                        </div>
                        <div
                          className={`font-medium ${
                            packType === "single"
                              ? "text-white"
                              : "text-gray-700"
                          }`}
                        >
                          Single Flavor Pack
                        </div>
                        <div
                          className={`text-sm ${
                            packType === "single"
                              ? "text-white/80"
                              : "text-gray-500"
                          }`}
                        >
                          3 of Same Flavor
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {packType === "single" && (
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                      Choose Your Flavor
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {Object.entries(flavors).map(([key, flavor]) => (
                        <div
                          key={key}
                          onClick={() => setSelectedFlavor(key)}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                            selectedFlavor === key
                              ? `${flavor.accent} text-white border-transparent shadow-lg transform scale-105`
                              : "bg-gray-50 border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="text-center">
                            <div className="text-3xl mb-2">{flavor.image}</div>
                            <div
                              className={`font-medium ${
                                selectedFlavor === key
                                  ? "text-white"
                                  : "text-gray-700"
                              }`}
                            >
                              {flavor.name}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {packType === "mixed" && (
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                      Our Flavours
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {Object.entries(flavors).map(([key, flavor]) => (
                        <div
                          key={key}
                          className="p-4 rounded-xl bg-gray-50 border border-gray-200"
                        >
                          <div className="text-center">
                            <div className="text-3xl mb-2">{flavor.image}</div>
                            <div className="font-medium text-gray-700">
                              {flavor.name}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-baseline space-x-3 mb-4">
                    <span className="text-3xl font-bold text-gray-900">
                      Rs. 450.00
                    </span>
                    <span className="text-lg text-gray-500">(Rs. 150×3)</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-6">
                    Tax included. Shipping calculated at checkout
                  </p>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Quantity
                    </label>
                    <div className="flex items-center  space-x-4">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => handleQuantityChange("decrement")}
                          className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-l-lg transition-colors"
                          disabled={quantity <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 text-lg font-semibold text-gray-900 min-w-[60px] text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange("increment")}
                          className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-r-lg transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <Link
                        to="/cart"
                        className="flex items-center gap-2  text-gray-600 hover:underline font-medium"
                      >
                        <ShoppingCartIcon className="w-5 h-5" />
                        View Cart
                      </Link>
                    </div>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className={`w-full ${
                      packType === "mixed"
                        ? "bg-blue-500"
                        : currentFlavor.accent
                    } hover:opacity-90 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02]`}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <div className="relative h-96 lg:h-full flex items-center justify-center">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${
                      packType === "mixed"
                        ? "from-blue-400 to-blue-600"
                        : currentFlavor.color
                    } rounded-2xl opacity-20`}
                  ></div>
                  <div className="relative z-10 text-center">
                    {packType === "mixed" ? (
                      <div className="flex items-center justify-center">
                        <div
                          className={`lg:w-full lg:h-full w-full h-full sm:w-1/2 sm:h-1/2  md:w-1/2 md:h-1/2  rounded-2xl relative  px-5 `}
                        >
                          <div className="text-4xl lg:text-6xl">
                            <img
                              className="w-full h-full object-cover rounded-2xl"
                              src="/3bottle.webp"
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="relative mx-auto">
                        <div
                          className={`w-full h-full lg:w-full lg:h-full sm:w-1/2 sm:h-1/2  md:w-1/2 md:h-1/2   ${currentFlavor.accent} rounded-2xl relative mx-auto shadow-2xl`}
                        >
                          {/* <div className="text-4xl lg:text-6xl"> */}
                          <img src={currentFlavor.img} alt="" />
                          {/* </di/v> */}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-6 lg:px-12 py-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">
                    Free Shipping on all orders for 24 Hours
                  </span>
                </div>
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">
                    Orders will be delivered in 10-15 working days
                  </span>
                </div>
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">
                    Prepaid orders only
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
