import { easeIn } from "motion";
import * as motion from "motion/react-client";

const Spetialities = () => {
    return (
        <div className="p-10 flex items-center gap-5">
            <div className="space-y-5 w-1/2">
                <p className="text-4xl font-semibold text-[#0b8260]">Our Spetialities</p>
                <p className="text-xl text-gray-500">Best Job Search platform Experience for you</p>
                <p className="text-justify">
                    We are committed to transforming the way people find jobs and employers discover talent. Our platform is designed with both job seekers and recruiters in mind, ensuring that every interaction leads to meaningful opportunities. For job seekers, we provide a seamless experience with advanced search filters, personalized recommendations, and easy-to-navigate dashboards that highlight opportunities best suited to their skills and career goals. Fresh graduates can access career guidance, resume-building tools, and entry-level opportunities, while experienced professionals can explore senior positions across multiple industries with confidence. On the other hand, our services for employers are tailored to simplify the recruitment process.
                </p>
            </div>

            <motion.div animate={{ y: [0, 30, 0] }} transition={{duration: 2, repeat: Infinity, ease: easeIn}} className="relative w-1/2 px-20">
                <img
                    src="https://images.unsplash.com/photo-1537511446984-935f663eb1f4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8b2ZmaWNlJTIwd29ya2VyfGVufDB8fDB8fHww"
                    alt="office worker"
                    className="h-80 w-80 object-cover absolute top-40 left-50"
                    style={{
                        borderRadius: "55% 45% 50% 50% / 40% 60% 35% 65% "
                    }}
                />

                <img
                    src="https://plus.unsplash.com/premium_photo-1661369539084-27dc45c82f15?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8b2ZmaWNlJTIwd29ya2VyfGVufDB8fDB8fHww"
                    alt="office worker"
                    className="h-80 w-80 object-cover"
                    style={{
                        borderRadius: "35% 65% 55% 45% / 50% 40% 60% 50%"
                    }}
                />

            </motion.div>
        </div>
    );
};

export default Spetialities;