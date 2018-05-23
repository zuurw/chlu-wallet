import React from 'react'
import { func } from 'prop-types'
// libs
import { reduxForm, Field } from 'redux-form'
// components
import Input from 'components/Form/Input'

const ImportWalletForm = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <Field
      placeholder='Your mnemonic here...'
      name='mnemonic'
      type='text'
      component={Input}
      multiLine
    />
  </form>
)

ImportWalletForm.propTypes = {
  submit: func
}

export default reduxForm({ form: 'import-wallet-form' })(ImportWalletForm)
