import { useFormConstructor } from '@/app/store/useFormConstructor'
import React, { type FC } from 'react'


type Props = {
    column: IConstructorColumn
}

const FormCol: FC<Props> = (props) => {

  const {column} = props
  const {fields} = useFormConstructor();


  return (
    <div>
      
    </div>
  )
}

export default FormCol
