import React from 'react'
// redux
import { connect } from 'react-redux'
import { compose } from 'redux'
// hoc
import withFxRates from 'containers/Hoc/withFxRates';
// components
import { Card, CardHeader, Avatar, withStyles, CircularProgress } from '@material-ui/core';
import TransactionInfo from './TransactionInfo'
// icons
import ErrorIcon from '@material-ui/icons/ErrorOutline'

const styles = {
  card: {
    margin: '30px'
  }
}

function TransactionLog({ classes, loading, error, transactions, address, reviews, ...props }) {
  if (error) {
    return <Card className={classes.card}>
      <CardHeader
        avatar={<Avatar><ErrorIcon/></Avatar>}
        title={error || 'Something went wrong'}
      />
    </Card>
  } else if (loading) {
    return  <Card className={classes.card}>
      <CardHeader
        avatar={<CircularProgress/>}
        title='Fetching transactions...'
      />
    </Card>
  } else if (transactions.length === 0) {
    return <Card className={classes.card}>
      <CardHeader
        avatar={<Avatar>?</Avatar>}
        title='No transactions to show'
      />
    </Card>
  } else {
    return <div>
      {transactions.map((item, index) => (
        <TransactionInfo
          key={index}
          address={address}
          transaction={item}
          convertSatoshiToBits={props.convertSatoshiToBits}
          convertSatoshiToBTC={props.convertSatoshiToBTC}
          convertFromBtcToUsd={props.convertFromBtcToUsd}
          convertFromBitsToUsd={props.convertFromBitsToUsd}
          review={reviews[item.hash]}
        />
      ))}
    </div>
  }
}

const mapStateToProps = store => ({
  reviews: store.data.transactions.reviews
})

export default compose(
  withStyles(styles),
  withFxRates,
  connect(mapStateToProps)
)(TransactionLog)