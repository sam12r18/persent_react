import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import PageTitle from "../../Components/public/PageTitle.jsx";
import {apiGet, apiPost} from "../../services/AxiosClient.jsx";
import TasksCard from "../../Components/public/TasksCard.jsx";
import useAlert from "../../hook/Alert.jsx";
import {useSearchParams} from "react-router-dom";
export default function ViewEmployeeTask() {
    const [tasksData , setTasksData] = useState([]);
    const [searchParams] = useSearchParams();

    const name = searchParams.get("name");
    const alert = useAlert();
    const fetchData = async ()=>{
        try {
            const response = await apiGet(``)
            console.log("this is response for employees tasks");
            setTasksData(response?.data);
        }catch (error) {
            console.log(error)
        }
    }
    // useEffect(() => {
    //     fetchData();
    // }, []);
    const endTask = async (id) => {
        alert({
            title: "هشدار",
            text: `آیا مطمئن هستید میخواهید این وظیفه را به اتمام برسانید؟`,
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "بله، تأیید می‌کنم",
            cancelButtonText: "خیر، لغو کن",
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    apiPost(``, { task_id: id })
                    alert({
                        title: "موفقیت",
                        text: `وظیفه شما به اتمام رسید`,
                        icon: "success",
                    });
                }catch (error) {
                    console.log(error)
                }
            }
        });
    }
    const myTasks = [
        {
            id:1,
            project_name:"پروژه 1",
            name:"کامل کردن صفحه لاگین",
            deadline: "1404/06/13",
            description:"لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای"
        },
        {
            id:2,
            project_name:"پروژه 1",
            name:"کامل کردن صفحه لاگین",
            deadline: "1404/06/13",
            description:"لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای"
        },
        {
            id:3,
            project_name:"پروژه 1",
            name:"کامل کردن صفحه لاگین",
            deadline: "1404/06/13",
            description:"لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای"
        }
    ]
  return (
    <Container className="container-sm mt-3" style={{ direction: "rtl" }}>
      <PageTitle title={`وظیفه های ${name}`}/>
      <TasksCard data={myTasks} isAdmin={true} endTask={endTask} />
    </Container>
  );
}
