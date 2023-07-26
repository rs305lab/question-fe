import { useRequest } from 'ahooks'
import { useSearchParams } from 'react-router-dom'
import { LIST_SEARCH_PARAM_KEY } from '../const'
import { getQuestionListService } from '../services/question'

type OptionType = {
  isStar: boolean
  isDeleted: boolean
}

function useLoadQuestionListData(opt: Partial<OptionType> = {}) {
  const { isStar, isDeleted } = opt
  const [searchParams] = useSearchParams()

  const { error, loading, data } = useRequest(
    async () => {
      const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''

      const data = await getQuestionListService({ keyword, isStar, isDeleted })
      return data
    },
    {
      refreshDeps: [searchParams],
      // 只依赖 url 查询参数变化
      // list 依赖 url 中的 query string 获取数据
      // 搜索组件只改变 url 中的查询参数
    }
  )

  return { error, loading, data }
}

export default useLoadQuestionListData
