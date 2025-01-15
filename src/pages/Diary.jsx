import { useParams, useNavigate } from "react-router-dom";
import Header from "../component/Header";
import Button from "../component/Button";
import Viewer from "../component/Viewer";
import useDiary from "../hooks/useDiary";
import { getFormattedDate } from "../util/constants";

const Diary = () => {
  const params = useParams();
  const navigate = useNavigate();
  
  
  const data = useDiary(params.id);
  if (!data) {
    return <div>일기를 불러오고 있습니다...</div>
  }
  const { date, emotionId, content } = data;
  const dateValue = Number(date) || Date.now();
  const title = `${getFormattedDate(new Date(dateValue))} 기록`;
  
  const goBack = () => {
    navigate(-1)
  }
  
  const goEdit = () => {
    navigate(`/edit/${id}`);
  };
  
    return (
      <div>
        <Header
          title={title}
          leftChild={<Button text={"< 뒤로가기"} onClick={goBack}/>}
          rightChild={<Button text={"수정하기"} onClick={goEdit}/>}
        />
        <Viewer emotionId={emotionId} content={content} />
      </div>
    )
  }
export default Diary;