import React from 'react'

const Home = () => {
  return (
    <div>
      <section className="bg-gradient-to-r from-purple-600 to-pink-500 text-white p-8 rounded-b-2xl shadow-md">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-2xl font-bold">AI Career Coach Agent</h1>
          <p className="mt-2 text-sm md:text-base">
            “Smarter career decisions start here — get tailored advice, real-time market insights,
            and a roadmap built just for you with the power of AI.”
          </p>
          <button className="mt-4 px-6 py-2 bg-white text-purple-600 font-semibold rounded-lg shadow hover:bg-gray-100">
            Let’s Get Started
          </button>
        </div>
      </section>
    </div>
  )
}

export default Home