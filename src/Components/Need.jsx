const Need = () => {
    const needs = [
        {
            oparation: "Create An Account",
            explain:
                "Sign up easily with your email to unlock all features. Manage your profile, and connect with top companies."
        },
        {
            oparation: "Search Jobs",
            explain:
                "Browse thousands of job listings by category, location, or skills. Use filters to quickly find opportunities that match your career goals."
        },
        {
            oparation: "Apply & Get Hired",
            explain:
                "Submit your application with one click. Chat with recruiters, attend interviews, and get hired faster with our smart matching system."
        }
    ];


    return (
        <div className="mt-10">
            <div className="bg-[#04343a] p-5 md:p-10 space-y-4">
                <p className="text-center font-semibold text-3xl text-white">Choose What You Need</p>

                <div className="flex flex-col md:flex-row items-center gap-4 justify-center md:px-5">
                    {
                        needs.map((need, idx) => (
                            <div key={idx} className="bg-white/20 p-10 rounded-xl min-h-60 space-y-4">
                                <p className="text-4xl font-semibold text-green-500">0{idx + 1}.</p>
                                <p className="text-xl text-white">{need?.oparation}</p>
                                <p className="text-sm text-gray-300">{need?.explain}</p>
                                <button className="bg-[#0b8260] hover:bg-[#3b6e6003] border border-[#ffffff00] hover:border-white p-10 py-4 rounded-sm text-white flex justify-center items-center gap-2 transition-all">Get start</button>
                            </div>
                        ))
                    }

                </div>
            </div>
        </div>
    );
};

export default Need;