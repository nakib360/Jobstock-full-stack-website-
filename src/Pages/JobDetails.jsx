import { useLoaderData } from "react-router";
import DetailsCard from "../Components/DetailsCard";
import { useEffect } from "react";

const JobDetails = () => {
    const loadedData = useLoaderData();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [])

  return (
    <div className="p-10">
      <DetailsCard data={loadedData}/>
    </div>
  );
};

export default JobDetails;