'use client'
import React from 'react'
import { ComboBox_SelectCategoryType } from '../components/ComboBox_SelectCategoryType'

type Props = {}

type CategoryType = 'FIXED' | 'VARIANT'

const CreatePurchaseForm = (props: Props) => {
  const [categoryType, setCategoryType] = React.useState<CategoryType>()
  return (
    <div className=''>
      <ComboBox_SelectCategoryType setCategoryType={setCategoryType} />
    </div>
  )
}

export default CreatePurchaseForm