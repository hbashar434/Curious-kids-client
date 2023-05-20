import React, { useEffect, useState } from "react";

const Pagination = () => {
  const [toys, setToys] = useState([]);
  useEffect(() => {
    fetch("https://curious-kids-server.vercel.app/all-toys")
      .then((res) => res.json())
      .then((data) => {
        setToys(data);
      });
  }, []);

  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(toys.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = toys.slice(indexOfFirstItem, indexOfLastItem);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex flex-col items-center md:my-24 my-10">
      <div className="mb-4 md:mb-10 md:w-6/12 md:mx-auto md:text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-purple-900 mb-4">
          Get Your Perfect Robot Toy
        </h2>
        <p className="md:text-lg text-gray-700 mt-4">
          Immerse yourself in a world of futuristic fun with our collection of
          robot toys.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentItems.map((toy) => (
          <div key={toy._id} className="p-4 bg-white shadow">
            <div className="card w-full bg-purple-100 shadow-xl">
              <figure className="px-10 pt-10">
                <img
                  src={toy?.pictureURL}
                  alt="Shoes"
                  className="rounded-xl h-36 md:h-48 w-72"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{toy.name}</h2>
                <div className="card-actions pt-2">
                  <button className="my-btn-indigoPurple">Purchase</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex-warp mt-6">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`px-8 py-1 mx-3 mt-2 rounded ${
              currentPage === index + 1 ? "my-bg-gr" : "bg-gray-200"
            }`}
            onClick={() => handleClick(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pagination;