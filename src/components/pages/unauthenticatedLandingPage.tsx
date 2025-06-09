import Link from "next/link";

export default function UnauthenticatedLandingPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-800/90 backdrop-blur-sm border-b border-gray-700">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="#" className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-white">Formly</span>
          </Link>

          <div className="flex items-center space-x-5">
            <Link href="/signin" className="bg-gray-700 text-white px-5 py-2 rounded-lg border border-gray-600 hover:bg-gray-600 font-medium transition-colors shadow-sm">
              Sign In
            </Link>
            <Link href="/signup" className="bg-gradient-to-br from-green-500 to-green-600 text-white px-5 py-2 rounded-lg hover:from-green-600 hover:to-green-700 font-medium transition-colors shadow-lg">
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Create Beautiful Forms <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">Effortlessly</span>
              </h1>
              <p className="text-xl text-gray-400 max-w-lg">
                Design, share, and analyze forms with our intuitive drag-and-drop builder.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link href="/signup" className="bg-gradient-to-br from-green-500 to-green-600 text-white px-7 py-3.5 rounded-lg hover:from-green-600 hover:to-green-700 font-semibold text-lg transition-colors shadow-lg text-center">
                  Get Started Free
                </Link>
                <Link href="/signin" className="bg-gray-800 text-white px-7 py-3.5 rounded-lg border border-gray-700 hover:bg-gray-700 font-semibold text-lg transition-colors text-center shadow-sm">
                  Sign In
                </Link>
              </div>
            </div>

            {/* Form Preview */}
            <div className="lg:w-1/2">
              <div className="relative bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700 hover:scale-[1.02] transition-transform duration-300">
                <div className="h-11 bg-gray-700 border-b border-gray-700 flex items-center px-4 space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <form className="p-6 md:p-8 space-y-5">
                  <h3 className="text-2xl font-semibold text-white mb-1">Customer Feedback</h3>
                  <p className="text-gray-400 mb-6">Help us improve our services</p>

                  <div className="space-y-5">
                    <div>
                      <label htmlFor="satisfaction" className="block text-gray-300 text-sm font-medium mb-2">How satisfied are you with our service?</label>
                      <select
                        id="satisfaction"
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-green-500"
                      >
                        <option value="">Select an option</option>
                        <option value="very-satisfied">Very satisfied</option>
                        <option value="satisfied">Satisfied</option>
                        <option value="neutral">Neutral</option>
                        <option value="dissatisfied">Dissatisfied</option>
                        <option value="very-dissatisfied">Very dissatisfied</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="features" className="block text-gray-300 text-sm font-medium mb-2">Which features do you use most?</label>
                      <div className="space-y-2">
                        {['Dashboard', 'Analytics', 'Form Builder', 'Templates', 'Integrations'].map((feature) => {
                          const id = `feature-${feature.toLowerCase().replace(/\s+/g, '-')}`;
                          return (
                            <div key={feature} className="flex items-center">
                              <input
                                id={id}
                                type="checkbox"
                                className="w-4 h-4 bg-gray-700 border-gray-600 rounded focus:ring-green-500"
                              />
                              <label htmlFor={id} className="ml-2 text-sm text-gray-300">
                                {feature}
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="suggestions" className="block text-gray-300 text-sm font-medium mb-2">Suggestions for improvement</label>
                      <textarea
                        id="suggestions"
                        rows={3}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-green-500 placeholder-gray-500"
                        placeholder="What can we do better?"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full bg-gradient-to-br from-green-500 to-green-600 text-white py-3.5 rounded-lg hover:from-green-600 hover:to-green-700 font-semibold border border-green-600 shadow-lg"
                      >
                        Submit Feedback
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The rest of your code (How It Works, FAQ, CTA, Footer) remains unchanged */}
      {/* How It Works Section */}
      <section className="py-16 px-6 bg-gray-800/50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">How It Works</h2>
            <p className="text-xl text-gray-400 mt-4 max-w-2xl mx-auto">Create forms in just a few simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Create",
                description: "Use our drag-and-drop builder to design your perfect form with various field types.",
                icon: (
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                )
              },
              {
                title: "Share",
                description: "Publish your form with a unique link or embed it directly on your website.",
                icon: (
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                )
              },
              {
                title: "Analyze",
                description: "View real-time responses and insights with our powerful analytics dashboard.",
                icon: (
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                )
              }
            ].map((step, index) => (
              <div key={index} className="bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-green-500 transition-colors">
                <div className="flex items-center justify-center w-14 h-14 bg-gray-700 rounded-lg mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-400 mt-4">Find answers to common questions about Formly</p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "Is there a free plan available?",
                answer: "Yes, we offer a free plan that includes basic form creation and up to 100 monthly responses."
              },
              {
                question: "Can I customize the look of my forms?",
                answer: "Absolutely! Our form builder allows you to customize colors, fonts, and layouts to match your brand."
              },
              {
                question: "How do I collect responses?",
                answer: "Responses are collected in real-time and can be viewed in your dashboard, downloaded as CSV, or sent to your email."
              },
              {
                question: "Is my data secure?",
                answer: "We take security seriously. All data is encrypted in transit and at rest, and we comply with major privacy regulations."
              },
              {
                question: "Can I integrate with other tools?",
                answer: "Yes, Formly integrates with popular tools like Google Sheets, Slack, and Zapier for seamless workflows."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                <details className="group">
                  <summary className="list-none cursor-pointer p-6 focus:outline-none">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium text-white">{faq.question}</h3>
                      <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </summary>
                  <div className="px-6 pb-6 text-gray-400">
                    {faq.answer}
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to create your first form?</h2>
          <p className="text-xl text-gray-400 mb-8">Join thousands of creators who use Formly to collect data effortlessly.</p>
          <Link href="/signup" className="inline-block bg-gradient-to-br from-green-500 to-green-600 text-white px-8 py-4 rounded-lg hover:from-green-600 hover:to-green-700 font-semibold text-lg transition-colors shadow-lg">
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 py-8 text-center">
        <p className="text-gray-500 text-sm">Made by Enigma❤</p>
      </footer>
    </div>
  );
}
