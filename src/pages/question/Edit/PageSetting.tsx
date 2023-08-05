import React, { FC, useEffect } from 'react'
import { Form, Input } from 'antd'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { useDispatch } from 'react-redux'
import { resetPageInfo } from '../../../store/pageInfo'

const { TextArea } = Input

const PageSetting: FC = () => {
  const pageInfo = useGetPageInfo()
  const dispatch = useDispatch()

  const [form] = Form.useForm()

  function handleValuesChange() {
    dispatch(resetPageInfo(form.getFieldsValue()))
  }

  useEffect(() => {
    form.setFieldsValue(pageInfo)
  }, [pageInfo])

  return (
    <Form
      layout="vertical"
      initialValues={pageInfo}
      onValuesChange={handleValuesChange}
      form={form}
    >
      <Form.Item label="页面标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="页面描述" name="desc">
        <TextArea placeholder="页面描述..." />
      </Form.Item>
      <Form.Item label="样式代码" name="css">
        <TextArea placeholder="请输入 css 样式代码..." />
      </Form.Item>
      <Form.Item label="脚本代码" name="js">
        <TextArea placeholder="请输入 js 脚本代码..." />
      </Form.Item>
    </Form>
  )
}

export default PageSetting
