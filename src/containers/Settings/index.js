import React, { Component } from 'react'
import { object } from 'prop-types'
import { get } from 'lodash'
// components
import { Button, Card, CardContent, CardActions, CardHeader, Divider, Grid, InputAdornment } from '@material-ui/core'
import { Avatar, withStyles, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import ReactCopyToClipBoard from 'react-copy-to-clipboard'
// redux
import { compose } from 'recompose';
import { connect } from 'react-redux'
// helpers
import { downloadWallet, getAddress } from 'helpers/wallet';

import CustomInput from 'components/MaterialDashboardPro/CustomInput';
import InfoArea from 'components/MaterialDashboardPro/InfoArea'
import PictureUpload from 'components/MaterialDashboardPro/PictureUpload'


// icons
import Email from '@material-ui/icons/Email';
import Face from '@material-ui/icons/Face';
import DownloadIcon from '@material-ui/icons/FileDownload'
import UserIcon from '@material-ui/icons/Person'
import WalletIcon from '@material-ui/icons/AccountBalanceWallet'
import ProfileIcon from '@material-ui/icons/AccountCircle'
import KeyIcon from '@material-ui/icons/Lock'
import AccountBoxIcon from '@material-ui/icons/AccountBox'


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
  card: {
    margin: '30px'
  }
});

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSubmenu: "wallet"
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(button) {
    if (button === 'profile') {
      this.setState({activeSubmenu: "profile"})
    }
    else if (button === 'wallet') {
      this.setState({activeSubmenu: "wallet"})
    }
  }


  static propTypes = {
    wallet: object
  }



  handleDownload = () => downloadWallet(this.props.wallet)

  render () {
    const { wallet, classes } = this.props

    return <Card className={classes.card}>
        <CardHeader
            avatar={<Avatar><AccountBoxIcon/></Avatar>}
            subheader='Your Profile and Wallet Settings'
        />

        <CardActions>
            <Button variant='raised' color="default" onClick={() => this.handleClick('profile')} className={classes.button}>
               My Profile<ProfileIcon className={classes.rightIcon}/>
            </Button>
            <Button variant='raised' color="primary" onClick={() => this.handleClick('wallet')} className={classes.button}>
              My Wallet<WalletIcon className={classes.rightIcon}/>
            </Button>
        </CardActions>

        <Divider/>
        <CardContent>

        {this.renderProfile()}
        {this.renderWallet()}

        </CardContent>
      </Card>
  }

  renderProfile(){
    if (this.state.activeSubmenu !== "profile") return undefined;
    const { wallet, classes } = this.props
    return (
        <Card className={classes.card}>
          <CardHeader
            avatar={<Avatar><ProfileIcon/></Avatar>}
            title='Profile'
            subheader='Your Profile Page'
          />
          <CardContent>
            {this.renderUser()}
          </CardContent>
        </Card>
      )
    }




  renderWallet(){
    if (this.state.activeSubmenu !== "wallet") return undefined;
    const { wallet, classes } = this.props
    const address = getAddress(wallet)
    const didId = get(wallet, 'did.publicDidDocument.id', '')
    const didPrivateKey = get(wallet, 'did.privateKeyBase58', '')

    return (
        <Card className={classes.card}>
          <CardHeader
            avatar={<Avatar><WalletIcon/></Avatar>}
            title='Wallet'
            subheader='Your Distributed Identity and Bitcoin Funds'
          />
          <CardContent>
            <List dense disablePadding>
              <ReactCopyToClipBoard text={didId}>
                <ListItem button>
                    <ListItemIcon><UserIcon/></ListItemIcon>
                    <ListItemText
                        primary='Distributed Identity (DID)'
                        secondary={`${didId} - Click to copy to clipboard`}
                    />
                </ListItem>
              </ReactCopyToClipBoard>
              <ReactCopyToClipBoard text={didPrivateKey}>
                <ListItem button>
                    <ListItemIcon><KeyIcon/></ListItemIcon>
                    <ListItemText
                        primary='DID Private Key'
                        secondary='Click to copy to clipboard'
                    />
                </ListItem>
              </ReactCopyToClipBoard>
              <ReactCopyToClipBoard text={address}>
                <ListItem button>
                    <ListItemIcon><WalletIcon/></ListItemIcon>
                    <ListItemText
                        primary='Your Bitcoin Address (testnet)'
                        secondary={`${address} - Click to copy to clipboard`}
                    />
                </ListItem>
              </ReactCopyToClipBoard>
            </List>
          </CardContent>
          <CardActions>
            <Button variant='raised' onClick={this.handleDownload}>
              <DownloadIcon/> Download Wallet
            </Button>
          </CardActions>
        </Card>
      )
  }


  renderUser() {

    const { classes } = this.props;

    return (
      <Grid container justify='center' spacing={16}>
        <Grid item xs={12} sm={12} md={12}>
          <PictureUpload />
          <div className={classes.description}>Upload Photo</div>
        </Grid>
        <Grid item xs={12} sm={12} md={5}>
          <CustomInput
            success={this.state.emailState === 'success'}
            error={this.state.emailState === 'error'}
            labelText={
              <span>
                Email <small>(required)</small>
              </span>
            }
            id='email'
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              onChange: event => this.change(event, 'email', 'length', 3),
              endAdornment: (
                <InputAdornment position='end' className={classes.inputAdornment}>
                  <Email className={classes.inputAdornmentIcon} />
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={5}>
          <CustomInput
            success={this.state.usernameState === 'success'}
            error={this.state.usernameState === 'error'}
            labelText={
              <span>
                User Name <small>(required)</small>
              </span>
            }
            id='username'
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              onChange: event => this.change(event, 'username', 'length', 3),
              endAdornment: (
                <InputAdornment position='end' className={classes.inputAdornment}>
                  <Face className={classes.inputAdornmentIcon} />
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={5}>
          <CustomInput
            success={this.state.firstnameState === 'success'}
            error={this.state.firstnameState === 'error'}
            labelText={
              <span>
                First Name <small>(optional)</small>
              </span>
            }
            id='firstname'
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              onChange: event => this.change(event, 'firstname', 'length', 3),
              endAdornment: (
                <InputAdornment position='end' className={classes.inputAdornment}>
                  <Face className={classes.inputAdornmentIcon} />
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={5}>
          <CustomInput
            success={this.state.lastnameState === 'success'}
            error={this.state.lastnameState === 'error'}
            labelText={
              <span>
                Last Name <small>(optional)</small>
              </span>
            }
            id='lastname'
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              onChange: event => this.change(event, 'lastname', 'length', 3),
              endAdornment: (
                <InputAdornment position='end' className={classes.inputAdornment}>
                  <Face className={classes.inputAdornmentIcon} />
                </InputAdornment>
              )
            }}
          />
        </Grid>
      </Grid>
    )
  }


}

const mapStateToProps = store => ({
  wallet: store.data.wallet
})

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(Settings)
