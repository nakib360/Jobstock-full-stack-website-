import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

const SkeletonLoader = () => {
    return (
        <div>
            <div className="relative bg-white rounded-xl p-5 max-w-100 border border-gray-200 space-y-2">
                <div className="flex flex-col items-center gap-2">
                    {/* Job Type Badge */}
                    <div className="absolute right-5">
                        <Skeleton width={80} height={30} />
                    </div>

                    {/* Job Image */}
                    <div className="mt-10">
                        <Skeleton circle width={90} height={90} />
                    </div>

                    {/* Company Name */}
                    <Skeleton width={100} height={15} />

                    {/* Job Title */}
                    <Skeleton width={150} height={20} />

                    {/* Skills */}
                    <div className="flex items-center flex-wrap gap-2 justify-center">
                        <Skeleton width={80} height={30} />
                        <Skeleton width={70} height={30} />
                        <Skeleton width={90} height={30} />
                        <Skeleton width={100} height={30} />
                        <Skeleton width={50} height={30} />
                    </div>
                </div>

                {/* Salary & Button */}
                <div className="flex justify-between items-center mt-4 w-full">
                    {/* Salary */}
                    <Skeleton width={110} height={20} />

                    {/* Button */}
                    <Skeleton width={150} height={55} />
                </div>
            </div>
        </div>
    );
};

export default SkeletonLoader;