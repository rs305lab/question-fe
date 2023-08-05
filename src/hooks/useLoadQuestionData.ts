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
import { resetPageInfo } from '../store/pageInfo'

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
    const { title = '', componentList = [], desc = '', js = '', css = '' } = data

    // 获取默认 selectedId
    let selectedId = ''
    if (componentList.length > 0) {
      selectedId = componentList[0].fe_id
    }

    // 将 ajax 获取的信息存储到组件状态库中
    dispatch(resetComponents({ componentList, selectedId, copiedComponent: null }))

    // 将 ajax 获取的信息存储到 pageInfo 状态库中
    dispatch(resetPageInfo({ title, desc, js, css }))
  }, [data])

  useEffect(() => {
    run(id)
  }, [id])

  return { loading, error }
}
export default useLoadQuestionData
