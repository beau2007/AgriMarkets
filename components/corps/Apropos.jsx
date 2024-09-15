import React from 'react';

export default function CompanyDescription() {
  return (
    <div id="apropos" className="bg-gray-100 min-h-screen">

      {/* Main Section */}
      <main className="container mx-auto py-12 px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-green-700 mb-6">Welcome to AgriMarket</h2>
          <p className="text-lg text-gray-700">
            AgriMarket is a leading provider of high-quality agricultural products. We connect local farmers with
            businesses and consumers looking for fresh and organic produce. Our mission is to foster sustainable farming
            practices and promote healthy, eco-friendly food sources.
          </p>
        </div>

        {/* Features Section */}
        <div className="mt-12">
          <h3 className="text-3xl font-semibold text-green-600 text-center mb-8">Our patner</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h4 className="text-2xl font-semibold mb-4">Fresh Vegetables</h4>
              <p className="text-gray-700">
                We offer a variety of fresh, locally grown vegetables. From leafy greens to root vegetables, all our
                produce is harvested at peak freshness.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h4 className="text-2xl font-semibold mb-4">Organic Fruits</h4>
              <p className="text-gray-700">
                Our selection of organic fruits includes apples, berries, citrus fruits, and more. Grown without
                pesticides, ensuring they are safe and healthy.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h4 className="text-2xl font-semibold mb-4">Farm Equipment</h4>
              <p className="text-gray-700">
                We also supply modern farming equipment to support farmers in improving productivity and efficiency in
                their operations.
              </p>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <section className="mt-16 text-center">
          <h3 className="text-3xl font-semibold text-green-600 mb-6">Our Mission</h3>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto">
            At AgriMarket, our mission is to bridge the gap between local farmers and consumers, promoting sustainable
            farming practices that benefit the environment and provide nutritious food to everyone. We are committed to
            supporting the agricultural community through fair trade, education, and innovation.
          </p>
        </section>
      </main>
    </div>
  );
}
