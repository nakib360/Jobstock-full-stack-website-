import { easeIn } from "motion";
import * as motion from "motion/react-client";


const Services = () => {
    const jobTypes = ["Full-Time Jobs", "Part-Time Jobs", "Freelance / Contract Jobs", "Internships", "Remote Jobs", "Entry-Level Jobs", "Senior / Management Positions", "Temporary / Seasonal Jobs", "Remote Freelance Projects"];
    return (
        <div className="flex items-center gap-5">
            <div className="w-1/2 px-5">
                <motion.div
                    animate={{ y: [0, 30, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: easeIn }}
                    className="relative w-1/2"
                >
                    <img
                        src="https://media.istockphoto.com/id/2168922157/photo/partnership-and-collaboration-in-office-group-discussion-for-feedback.webp?a=1&b=1&s=612x612&w=0&k=20&c=J8bnSbqkyViFy7S99_XkemYX-d_FruNwYjTsUlW-8zY="
                        alt="office worker"
                        className="h-80 w-80 object-cover absolute top-40 left-50"
                        style={{
                            borderRadius: "60% 40% 35% 65% / 50% 60% 40% 50%" 
                        }}
                    />

                    <img
                        src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8am9ifGVufDB8fDB8fHww"
                        alt="office worker"
                        className="h-80 w-80 object-cover"
                        style={{
                            borderRadius: "45% 55% 65% 35% / 60% 40% 50% 50%" 
                        }}
                    />
                </motion.div>

            </div>
            <div className="mt-25 p-10 space-y-6 w-1/2 flex flex-col items-end">
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
                <button className="bg-[#0b8260] hover:bg-[#3b6e6003] border border-[#ffffff00] hover:border-[#0b8260] hover:text-[#0b8260] p-10 py-4 rounded-sm text-white flex justify-center items-center gap-2 transition-all ">Get started</button>
            </div>
        </div>
    );
};

export default Services;