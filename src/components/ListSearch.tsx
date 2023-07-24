import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { Input } from 'antd'
import { LIST_SEARCH_PARAM_KEY } from '../const'

const { Search } = Input

const ListSearch: FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()
  const [val, setVal] = useState<string>('')
  const [searchParams] = useSearchParams()

  function handleSearch() {
    nav({
      pathname,
      search: `${LIST_SEARCH_PARAM_KEY}=${val}`,
    })
  }
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setVal(event.target.value)
  }

  useEffect(() => {
    const curVal = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
    setVal(curVal)
  }, [searchParams])

  return (
    <Search
      placeholder="请输入关键字"
      allowClear
      onSearch={handleSearch}
      onChange={handleChange}
      value={val}
      style={{ width: 200 }}
    />
  )
}

export default ListSearch
