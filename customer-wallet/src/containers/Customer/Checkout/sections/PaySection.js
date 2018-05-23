import React from 'react'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
// assets
import { buttonsData } from '../assets/data'
import { FormControlLabel } from '@material-ui/core';

const Product = () => {
  const selectedRadio = buttonsData[0].value ? buttonsData[0].value : null

  return (
    <div className='payment section-content'>
      <RadioGroup
        name='payment-method'
        value={selectedRadio}
      >
        {buttonsData.map(({ icon, label, disabled, value }, idx) => (
          <FormControlLabel
            control={<Radio className='payment-item container-border-bottom'/>}
            key={idx}
            value={value}
            label={label}
          />
        ))}
      </RadioGroup>
    </div>
  )
}

export default Product
