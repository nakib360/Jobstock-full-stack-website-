import { easeIn } from "motion";
import * as motion from "motion/react-client";

const Spetialities = () => {
    return (
        <div className="mb-20 p-6 md:p-10 flex flex-col md:flex-row items-center gap-10">
            {/* ---- Text Section ---- */}
            <div className="space-y-5 w-full md:w-1/2">
                <p className="text-4xl font-semibold text-[#0b8260]">Our Specialities</p>
                <p className="text-xl text-gray-500">
                    Best Job Search Platform Experience for You
                </p>
                <p className="text-justify leading-relaxed text-gray-600">
                    We are committed to transforming the way people find jobs and employers
                    discover talent. Our platform is designed with both job seekers and
                    recruiters in mind, ensuring that every interaction leads to meaningful
                    opportunities. For job seekers, we provide a seamless experience with
                    advanced search filters, personalized recommendations, and easy-to-navigate
                    dashboards that highlight opportunities best suited to their skills and
                    career goals. Fresh graduates can access career guidance, resume-building
                    tools, and entry-level opportunities, while experienced professionals can
                    explore senior positions across multiple industries with confidence. On the
                    other hand, our services for employers are tailored to simplify the
                    recruitment process.
                </p>
            </div>

            {/* ---- Image Section ---- */}
            <div className="flex justify-center items-center w-full md:w-1/2">
  <motion.div
    animate={{ y: [0, 30, 0] }}
    transition={{ duration: 2, repeat: Infinity, ease: easeIn }}
    className="relative w-64 h-64 md:w-80 md:h-80"
    >
    {/* Back Image */}
    <img
      src="https://plus.unsplash.com/premium_photo-1661369539084-27dc45c82f15?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0"
      alt="office worker"
      className="absolute -top-10 -left-20 max-w-none w-[18rem] h-[18rem] md:w-[22rem] md:h-[22rem] object-cover rounded-[55%_45%_50%_50%_/40%_60%_35%_65%]"
    />

    {/* Front Image */}
    <img
      src="https://images.unsplash.com/photo-1537511446984-935f663eb1f4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0"
      alt="office worker"
      className="absolute top-20 md:top-30 left-20 md:left-30 max-w-none w-[18rem] h-[18rem] md:w-[22rem] md:h-[22rem] object-cover rounded-[35%_65%_55%_45%_/50%_40%_60%_50%]"
    />
  </motion.div>
</div>


        </div>
    );
};

export default Spetialities;
