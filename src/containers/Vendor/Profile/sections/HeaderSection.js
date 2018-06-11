import React from 'react'
import { string, number, func, bool } from 'prop-types'
// components
import StarRatingComponent from 'react-star-rating-component'
import Search from '@material-ui/icons/Search'
import Close from '@material-ui/icons/Close'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
// helpers
import { formatCurrency } from 'helpers/currencyFormat'

const starCount = 5

const ProfileHeader = ({ name, rating, totalBitsSold, reviewCount, handleToggleSearchShow, isSearchFieldOpen }) => (
  <div className='profile-header container'>
    <div className='section-head'>
      <div className='profile-header__info'>
        <div className='avatar'>
          {name[0].toUpperCase()}
        </div>
        <div className='profile-info'>
          <div className='profile-info__name'>{name}</div>
          <StarRatingComponent
            className='profile-info__rating'
            name='rate2'
            starCount={starCount}
            value={rating}
            editing={false}
          />
          <div className='profile-info__title color-light'>
            <div className='title-reviews'>{reviewCount} Reviews</div>
            <div className='title-sold'>{formatCurrency(totalBitsSold)} bits</div>
          </div>
        </div>
      </div>
      <div className='profile-header__search'>
        {isSearchFieldOpen && <TextField fullWidth={true} name='search'/>}
        <IconButton onClick={handleToggleSearchShow} >
          {isSearchFieldOpen ? <Close /> : <Search /> }
        </IconButton>
      </div>
    </div>
  </div>
)

ProfileHeader.propTypes = {
  name: string,
  rating: number,
  titleReviews: string,
  titleSold: string,
  handleToggleSearchShow: func.isRequired,
  isSearchFieldOpen: bool
}

export default ProfileHeader