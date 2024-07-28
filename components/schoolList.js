"use client"
import { useEffect} from "react"
import { useState } from "react"
import { getSchools } from "@/actions/getSchools"
import { SchoolCards } from "./uiViews/schoolCards"
import PageHeader from "./pageHeader"
//show school listing

const SchoolList = () => {
    
    const [schools, setSchools] = useState([]);
    const getData = async()=>{
        const values = await getSchools();
        const resp = JSON.parse(values);
        setSchools([...resp]);
    }
    useEffect(() => {
        getData();
        console.log(schools);
    }, [])

    return (

        <div>
            <PageHeader title="Participating Schools"/>
            <SchoolCards schoolList={schools} />

        </div>




    )

}
export default SchoolList;
