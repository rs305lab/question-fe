import React, { FC } from 'react'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { ComponentPropsType, getComponentConfByType } from '../../../components/QuestionComponents'
import { useDispatch } from 'react-redux'
import { changeComponentProps } from '../../../store/componentsReducer'

const NoProp: FC = () => {
  return <div style={{ textAlign: 'center' }}>未选中</div>
}

const ComponentProps: FC = () => {
  const dispatch = useDispatch()
  const { selectedComponent } = useGetComponentInfo()
  if (selectedComponent == null) return <NoProp />

  const { type, props, isLocked, isHidden } = selectedComponent
  const componentConf = getComponentConfByType(type)

  if (componentConf == null) return <NoProp />

  function changeProps(newProps: ComponentPropsType) {
    if (selectedComponent == null) return
    const { fe_id } = selectedComponent

    dispatch(changeComponentProps({ fe_id, newProps }))
  }

  const { PropComponent } = componentConf
  return <PropComponent {...props} onChange={changeProps} disabled={isLocked || isHidden} />
}

export default ComponentProps
