const Contact = () => {
    return (
        <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
            <h2 className="text-[#00684b] sm:text-3xl font-bold text-center mb-6">
                Do you have any questions?
            </h2>
            <p className="text-gray-600 text-center max-w-xl mb-10">
                We’re here to help! Whether it’s about our services, pricing, or anything else, feel free to reach out.
            </p>

            {/* Optional contact form */}
            <form className="w-full max-w-lg flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Your Name"
                    className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#00684b]"
                />
                <input
                    type="email"
                    placeholder="Your Email"
                    className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#00684b]"
                />
                <textarea
                    placeholder="Your Message"
                    rows={5}
                    className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#00684b]"
                ></textarea>
                <button
                    type="submit"
                    className="bg-[#0b8260] hover:bg-[#3b6e6003] border border-[#ffffff00] hover:border-[#0b8260] hover:text-[#0b8260] p-10 py-4 rounded-sm text-white flex justify-center items-center gap-2 transition-all"
                >
                    Send Message
                </button>
            </form>
        </section>
    );
};

export default Contact;
