import React, { useContext, useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const MyToys = () => {
  const { user } = useContext(AuthContext);
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch(`https://curious-kids-server.vercel.app/my-toys/${user?.email}`)
      .then((res) => res.json())
      .then((data) => setToys(data));
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-purple-600">
        My Toys
      </h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-purple-50 rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="py-4 px-6 bg-blue-500 text-white">Seller</th>
              <th className="py-4 px-6 bg-green-500 text-white">Toy Name</th>
              <th className="py-4 px-6 bg-yellow-500 text-white">Category</th>
              <th className="py-4 px-6 bg-pink-500 text-white">Price</th>
              <th className="py-4 px-6 bg-indigo-500 text-white">Quantity</th>
              <th className="py-4 px-6 bg-orange-500 text-white">Details</th>
            </tr>
          </thead>
          <tbody>
            {toys.map((toy, index) => (
              <tr key={index}>
                <td className="py-4 px-6 border hover:bg-pink-200 transition-colors duration-300">
                  {toy.sellerName || "N/A"}
                </td>
                <td className="py-4 px-6 border hover:bg-pink-200 transition-colors duration-300">
                  {toy.name}
                </td>
                <td className="py-4 px-6 border hover:bg-pink-200 transition-colors duration-300">
                  {toy.subcategory}
                </td>
                <td className="py-4 px-6 border hover:bg-pink-200 transition-colors duration-300">
                  {toy.price} $
                </td>
                <td className="py-4 px-6 border hover:bg-pink-200 transition-colors duration-300">
                  {toy.availableQuantity} pcs
                </td>
                <td className="py-4 px-4 border flex justify-around gap-2 md:gap-0">
                  <Link>
                    <button className="my-btn-indigoPurple"> Update</button>
                  </Link>
                  <Link>
                    <button className="my-btn-cherry">Delete</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyToys;
