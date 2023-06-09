import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import useTitle from "../../hooks/useTitle";

const MyToys = () => {
  const { user } = useContext(AuthContext);
  const [toys, setToys] = useState([]);

  useTitle("My Toys");

  useEffect(() => {
    fetch(`https://curious-kids-server.vercel.app/my-toys/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setToys(data);
        console.log(data);
      });
  }, [user]);

  const handleFilter = (value) => {
    fetch(
      `https://curious-kids-server.vercel.app/sorted-toys?email=${user?.email}&sort=${value}`
    )
      .then((res) => res.json())
      .then((data) => setToys(data));
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://curious-kids-server.vercel.app/my-toy-list/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire({
                icon: "success",
                title: "Deleted!",
                text: "Your Toy has been deleted",
                showConfirmButton: false,
                timer: 1500,
              });
              const remainingToys = toys.filter((toy) => toy._id !== id);
              setToys(remainingToys);
            }
          });
      }
    });
  };

  return (
    <div className="container mx-auto md:pb-24 py-8 px-4 md:px-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-purple-600">
        My Toys
      </h1>
      <div className="flex justify-end pb-4 pr-4">
        <select
          className="select select-primary w-36"
          defaultValue="filter"
          onChange={(e) => handleFilter(e.target.value)}
        >
          <option value="filter" disabled>
            Filter By
          </option>
          <option value="-1">High Price</option>
          <option value="1">Low Price</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-purple-100 rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="py-4 px-6 bg-blue-500 text-white">No.</th>
              <th className="py-4 px-6 bg-red-500 text-white">Seller</th>
              <th className="py-4 px-6 bg-green-500 text-white">Toy Name</th>
              <th className="py-4 px-6 bg-yellow-500 text-white">Category</th>
              <th className="py-4 px-6 bg-pink-500 text-white">Price</th>
              <th className="py-4 px-6 bg-indigo-500 text-white">Quantity</th>
              <th className="py-4 px-6 bg-orange-500 text-white">Details</th>
            </tr>
          </thead>
          <tbody>
            {toys.map((toy, idx) => (
              <tr key={toy._id}>
                <td className="py-4 px-6 border hover:bg-pink-200 transition-colors duration-300">
                  {idx + 1}
                </td>
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
                  <Link to={`/update/${toy._id}`}>
                    <button className="my-btn-indigoPurple"> Update</button>
                  </Link>
                  <button
                    onClick={() => handleDelete(toy._id)}
                    className="my-btn-cherry"
                  >
                    Delete
                  </button>
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
