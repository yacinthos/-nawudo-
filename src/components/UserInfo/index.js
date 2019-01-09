import React from 'react';
import Avatar from '@material-ui/core/Avatar'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {UserApi} from'sdk/services';

class UserInfo extends React.Component {

    state = {
        anchorEl: null,
        open: false,
    };

    handleClick = event => {
        this.setState({open: true, anchorEl: event.currentTarget});
    };

    handleRequestClose = () => {
        this.setState({open: false});
    };
    logout = (e) => {
        new UserApi().logout()
            .then(response=>{
                this.props.userLogout();
            })
            .catch(error=>{
                throw(error);
            });
    };
    render() {
        return (
            <div className="user-profile d-flex flex-row align-items-center">
                <Avatar
                    alt='...'
                    src='http://via.placeholder.com/256x256'
                    className="user-avatar "
                />
                <div className="user-detail">
                    <h4 className="user-name" onClick={this.handleClick}>{this.props.state.token.user.lastname+' '+this.props.state.token.user.firstname}<i
                        className="zmdi zmdi-caret-down zmdi-hc-fw align-middle"/>
                    </h4>
                </div>
                <Menu className="user-info"
                      id="simple-menu"
                      anchorEl={this.state.anchorEl}
                      open={this.state.open}
                      onClose={this.handleRequestClose}
                      PaperProps={{
                          style: {
                              paddingTop: 0,
                              paddingBottom: 0
                          }
                      }}
                >
                    <MenuItem onClick={this.handleRequestClose}><i
                        className="zmdi zmdi-account zmdi-hc-fw mr-2"/>
                        Profile </MenuItem>
                    <MenuItem onClick={this.handleRequestClose}><i
                        className="zmdi zmdi-settings zmdi-hc-fw mr-2"/>Paramètres
                    </MenuItem>
                    <MenuItem onClick={this.logout}><i
                        className="zmdi zmdi-sign-in zmdi-hc-fw mr-2"/>Déconnecter
                    </MenuItem>
                </Menu>
            </div>
        );
    }
}

export default UserInfo;

