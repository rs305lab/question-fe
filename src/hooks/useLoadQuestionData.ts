import { useParams } from 'react-router-dom'
import { getQuestionService } from '../services/question'
import { useRequest } from 'ahooks'

const useLoadQuestionData = () => {
  // const { id = '' } = useParams()
  // const [loading, setLoading] = useState(true)
  // const [questionData, setQuestionData] = useState({})

  // useEffect(() => {
  //   async function fetchData() {
  //     const data = await getQuestionService(id)
  //     setQuestionData(data)
  //     setLoading(false)
  //   }
  //   fetchData()
  // }, [])
  // return { questionData, loading }

  const { id = '' } = useParams()
  async function load() {
    const data = await getQuestionService(id)
    return data
  }
  const { loading, data, error } = useRequest(load)
  return { loading, data, error }
}
export default useLoadQuestionData
