"use client"
import { useEffect, useState} from "react"
import { getCourse } from "@/actions/manageCourses"
import Image from "next/image"
import Link from "next/link"
import PageHeader from "@/components/pageHeader"
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

const IndividualCourse = ({params})=> {

const [courseData, setCourseData] = useState({});

useEffect(()=> {
    const getData = async ()=> {
        const data = await getCourse(params.id);
        const parseCourse = JSON.parse(data);
        setCourseData(parseCourse);
        console.log("Here is the data",parseCourse)
    }

if(params?.id) getData();
},[params.id]);

return (



    
<div>
<PageHeader title={courseData?.crn + ": " + courseData?.title} />

<div className="flex flex-wrap text-lg">
<div className="md:w-1/2 sm:w-full px-30 flex flex-column justify-end pr-20 items-start"> 
        <Image src={courseData?.schoolId?.photo} alt={courseData?.schoolId?.name} width={400} height={400} className="rounded hidden sm:block" /> 

    </div>
    <div className="md:w-1/2 sm:w-full px-5 flex flex-col justify-center items-start ">
    <div className="w-3/4">
    <p className="mb-2"><span className="font-semibold">Description: </span> {courseData?.desc}</p>
    <p className="mb-2"><span className="font-semibold">Number of TAs Needed: </span> {courseData?.nTA}</p>
    <p className="mb-2"><span className="font-semibold">College: </span>{courseData?.schoolId?.name}</p>

        <p className="mb-2"><span className="font-semibold">Professor: </span> {courseData?.userId?.firstName} {courseData?.userId?.lastName} </p>
       <p className="font-semibold">Contact Information:</p> 
       
        <div className="ml-2"> <span className="font-semibold">Email:</span> <Link href={"mailto:"+courseData?.userId?.email}>{courseData?.userId?.email} </Link> 
        <p><span className="font-semibold">Phone:</span> {courseData?.userId?.phone}</p>

        </div>
        <p className="mt-4">
            <Link href={"/schools/"+courseData?.schoolId?._id}>  <Button variant="custom" >Back to School Listing </Button> </Link>
        </p>
    </div>
</div>
</div>

</div>
)





}
export default IndividualCourse;