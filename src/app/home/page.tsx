import React from "react";

const Home = () => {
  return (
    <div className=" bg-gray">
      <div className="mx-auto flex justify-center">
        <div className="w-full mx-3 bg-gray-900 text-white max-w-9xl py-20 mt-4 rounded-lg shadow-2xl">
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
        </div>
      </section>

      {/* Footer */}
    </div>
  );
};

export default Home;
