import { ArrowLeft, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "../Context/CartContext";
import { Link } from "react-router-dom";
import { flavors } from "../constants/Products";
const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    getTotalPrice,
  } = useCart();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center  gap-5 mb-8">
            <Link
              to="/"
              className="  text-gray-700 gap-2 hover:underline font-medium text-lg "
            >
              <ArrowLeft className="w-8 h-8" />
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          </div>

          {cartItems.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-10 text-center">
              <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-6" />
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Your cart is empty
              </h2>
              <p className="text-gray-500 mb-6">
                Add some delicious hydration packs to get started!
              </p>
              <Link to="/product">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition">
                  Shop Now
                </button>
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md">
              <div className="max-h-[60vh] overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                {cartItems.map((item) => (
                  <div
                    key={item.cartId}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-6 border-gray-200"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-16 h-16 ${
                          item.flavor
                            ? flavors[item.flavor].accent
                            : "bg-blue-500"
                        } rounded-lg flex items-center justify-center`}
                      >
                        <span className="text-white font-bold text-sm">
                          <img
                            src={
                              item.id === "fokus-mixed-pack"
                                ? "/3bottle.webp"
                                : flavors[item.flavor]?.img
                            }
                            alt={item.id}
                            className="w-full h-full object-contain"
                          />
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {item.name}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          Rs. {item.price}.00 each
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decreaseQuantity(item.cartId)}
                        className="p-1 text-gray-500 hover:text-gray-700"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-1 bg-gray-900 rounded text-center min-w-[40px]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increaseQuantity(item.cartId)}
                        className="p-1 text-gray-500 hover:text-gray-700"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        Rs. {item.price * item.quantity}.00
                      </p>
                      <button
                        onClick={() => removeFromCart(item.cartId)}
                        className="text-red-500 hover:text-red-700 mt-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 p-6 rounded-b-xl border-t">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-gray-900">
                    Total:
                  </span>
                  <span className="text-2xl font-bold text-gray-900">
                    Rs. {getTotalPrice()}.00
                  </span>
                </div>
                <button className="w-full bg-green-600 text-white font-semibold py-3 rounded-md hover:bg-green-700 transition">
                  Proceed to Checkout
                </button>
                <div className="mt-4 text-center text-sm text-gray-600 leading-relaxed">
                  <p>• Free Shipping on all orders for 24 Hours</p>
                  <p>• Delivery in 10–15 working days</p>
                  <p>• Prepaid orders only</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
