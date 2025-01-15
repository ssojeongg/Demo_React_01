import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import './App.css'
import Home from './pages/Home'
import New from './pages/New'
import Diary from './pages/Diary'
import Edit from './pages/Edit'
import { useEffect, useReducer, useRef, useState, createContext } from 'react'

const mockData = [
  {
    id: "mock1",
    date:new Date().getTime() - 1,
    content: "mock1",
    emotionId: 1,
  },
  {
    id: "mock2",
    date:new Date().getTime() - 2,
    content: "mock2",
    emotionId: 2,
  },
  {
    id: "mock3",
    date:new Date().getTime() - 3,
    content: "mock3",
    emotionId: 3,
  },
]


function reducer(state, action) {
  switch (action.type) {
    case "INIT": {
      return action.data
    }
    case "CREATE": {
      return [action.data, ...state];
    }
    default: {
      return state;
    }
    case "UPDATE": {
      return state.map((it)=> 
      String(it.id) === String(action.data.id) ? { ...action.data } : it
      )
    }
    case "DELETE": {
      return state.filter((it) => String(it.id) !== String(action.targetId))
    }
  }
}

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0)

  useEffect(()=> {
    dispatch({
      type: "INIT",
      data: mockData,
    })
    setIsDataLoaded(true);
  }, [])

  const onCreate = (date, content, emotionId) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current,
        date: new Date(date).getTime(),
        content,
        emotionId
      }
    })
    idRef.current += 1;
  }
  const onUpdate = (targetId, date, content, emotionId) => {
    dispatch({
      type: "UPDATE",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotionId
      }
    })
  }
  const onDelete = (targetId) => {
    dispatch({
      type: "DELETE",
      targetId,
    })
  }
  if (!isDataLoaded) {
    return <div>데이터를 불러오는 중입니다.</div>
  } else {
    return (
    <BrowserRouter basename={import.meta.env.BASE_URL }>
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider
          value={
            {
              onCreate,
              onUpdate,
              onDelete
            }
          }
        >
          <Routes>
            <Route path='/' exact element={<Home />}/>
            <Route path='/new' element={<New/>}/>
            <Route path='/diary/:id' element={<Diary />}/>
            <Route path='/edit/:id' element={<Edit />}/>
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </BrowserRouter>
    )
  }
}
export default App
