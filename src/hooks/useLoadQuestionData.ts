/**
 * @description 获取单个问卷信息
 * @author rs305
 */

import { useParams } from 'react-router-dom'
import { getQuestionService } from '../services/question'
import { useRequest } from 'ahooks'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { resetComponents } from '../store/componentsReducer'

const useLoadQuestionData = () => {
  const { id = '' } = useParams()
  const dispatch = useDispatch()

  const { error, loading, run, data } = useRequest(
    async (id: string) => {
      const data = await getQuestionService(id)
      return data
    },
    {
      manual: true,
    }
  )

  useEffect(() => {
    if (!data) return
    const { title = '', componentList = [] } = data

    // 获取默认 selectedId
    let selectedId = ''
    if (componentList.length > 0) {
      selectedId = componentList[0].fe_id
    }

    dispatch(resetComponents({ componentList, selectedId }))
  }, [data])

  useEffect(() => {
    run(id)
  }, [id])

  return { loading, error }
}
export default useLoadQuestionData
