import React from "react";

const Home = () => {
  return (
    <div className=" bg-gray-100">
      <div className="mx-auto flex justify-center">
        <div className="w-full mx-9 bg-gray-900 text-white max-w-9xl py-20 mt-4 rounded-lg shadow-2xl">
          <div className="px-1 text-center">
            <h1 className="text-2xl font-bold mb-4">Welcome to My Website</h1>
            <p className="text-sm mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit Nullam
              euismod nisi vel tincidunt feugiat.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded">
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center">
              <svg
                className="mx-auto h-12 w-12 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <h3 className="text-xl font-semibold mt-4">Feature One</h3>
              <p className="mt-2 text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <svg
                className="mx-auto h-12 w-12 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
              <h3 className="text-xl font-semibold mt-4">Feature Two</h3>
              <p className="mt-2 text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <svg
                className="mx-auto h-12 w-12 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <h3 className="text-xl font-semibold mt-4">Feature Three</h3>
              <p className="mt-2 text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
    </div>
  );
};

export default Home;
