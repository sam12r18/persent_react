import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import {apiGet, apiPost} from "../../services/AxiosClient.jsx";
import PageTitle from "../../Components/public/PageTitle.jsx";
import useAlert from "../../hook/Alert.jsx";
import TasksCard from "../../Components/public/TasksCard.jsx";

export default function MyTasks() {
  const [tasks, setTasks] = useState();
  const alert = useAlert();
  const fetchData = async () => {
    const response = await apiGet(``, {});
    console.log("this is response for tasks", response);
    setTasks(response?.data);
  };
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
const updatePage = async ()=>{
        fetchData();
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
            id:1,
            project_name:"پروژه 1",
            name:"کامل کردن صفحه لاگین",
            deadline: "1404/06/13",
            description:"لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای"
        },
        {
            id:1,
            project_name:"پروژه 1",
            name:"کامل کردن صفحه لاگین",
            deadline: "1404/06/13",
            description:"لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای"
        }
    ]
  return (
    <Container className="container-sm mt-3" style={{ direction: "rtl" }}>
        <PageTitle title={"لیست وظیفه های من"}/>
        <TasksCard data={myTasks} endTask={endTask} updatePage={updatePage} />
    </Container>
  );
}
