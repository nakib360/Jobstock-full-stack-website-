const Services = () => {
    const jobTypes = ["Full-Time Jobs", "Part-Time Jobs", "Freelance / Contract Jobs", "Internships", "Remote Jobs", "Entry-Level Jobs", "Senior / Management Positions", "Temporary / Seasonal Jobs", "Remote Freelance Projects"];
    return (
        <div>
            <div className="mt-25 p-10 space-y-6">
                <p className="text-end text-4xl font-semibold text-[#0b8260]">Our Services</p>
                <p className="text-end text-xl text-gray-500">
                    We provide a wide range of services to help you find the perfect job.
                </p>

                <ul className="flex flex-col items-end gap-1">
                    {jobTypes.map((type, index) => (
                        <li key={index} className="flex items-center justify-end gap-3">
                            <span className="text-gray-700 font-medium">{type}</span>
                            <span className="inline-block w-3 h-3 bg-[#0b8260] rounded-full"></span>
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    );
};

export default Services;