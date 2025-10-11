import { easeIn } from "motion";
import * as motion from "motion/react-client";


const Services = () => {
    const jobTypes = ["Full-Time Jobs", "Part-Time Jobs", "Freelance / Contract Jobs", "Internships", "Remote Jobs", "Entry-Level Jobs", "Senior / Management Positions", "Temporary / Seasonal Jobs", "Remote Freelance Projects"];
    return (
        <div className=" mb-40 md:my-30 flex flex-col-reverse md:flex-row items-center gap-5 px-5 md:px-10">
            <div className="relative w-full md:w-1/2 flex justify-center items-center">
                <motion.div
                    animate={{ y: [0, 30, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: easeIn }}
                    className="relative w-64 h-64 md:w-80 md:h-80"
                >
                    <img
                        src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=500&auto=format&fit=crop&q=60"
                        alt="office worker"
                        className="absolute -top-10 -left-20 w-full h-full object-cover rounded-[45%_55%_65%_35%_/60%_40%_50%_50%]"
                    />
                    <img
                        src="https://plus.unsplash.com/premium_photo-1661725357418-fb09ff7c0aae?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8b2ZmaWNlJTIwd29ya2VyfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500https://media.istockphoto.com/id/2168922157/photo/partnership-and-collaboration-in-office-group-discussion-for-feedback.webp"
                        alt="office worker"
                        className="absolute top-20 md:top-30 left-20 md:left-30 w-full h-full object-cover rounded-[60%_40%_35%_65%_/50%_60%_40%_50%]"
                    />
                </motion.div>
            </div>

            <div className="mt-10 md:mt-0 space-y-6 w-full md:w-1/2 flex flex-col items-end text-end">
                <p className="text-4xl font-semibold text-[#0b8260]">Our Services</p>
                <p className="text-xl text-gray-500">
                    We provide a wide range of services to help you find the perfect job.
                </p>
                <ul className="flex flex-col items-end gap-2">
                    {jobTypes.map((type, index) => (
                        <li key={index} className="flex items-center justify-end gap-3">
                            <span className="text-gray-700 font-medium">{type}</span>
                            <span className="inline-block w-3 h-3 bg-[#0b8260] rounded-full"></span>
                        </li>
                    ))}
                </ul>
                <button className="bg-[#0b8260] hover:bg-transparent border border-[#0b8260] hover:text-[#0b8260] px-6 py-3 rounded-sm text-white transition-all">
                    Get started
                </button>
            </div>
        </div>

    );
};

export default Services;