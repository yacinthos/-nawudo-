import React, {Component} from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import {CardBox} from 'containers';
import Divider from '@material-ui/core/Divider';
import { push } from 'connected-react-router';
import _ from 'lodash';
import {renderRoutes} from 'react-router-config';
class IconLabelTabs extends Component {

    handleChange = (event, value) => {
        let pageUrl=this.props.tabs[value].pageUrl;
        if (this.props.state.router.location.pathname!==pageUrl){
            this.props.dispatch(push(this.props.tabs[value].pageUrl));
        }
    };
    render() {
        let index= _.findIndex(this.props.tabs, ['pageUrl',this.props.state.router.location.pathname]);
        return (
            <div className="row">
                <CardBox styleName="col-lg-12"
                     heading={
                         <Tabs
                            value={index}
                            onChange={this.handleChange}
                            //fullWidth
                            centered
                            indicatorColor="secondary"
                            textColor="secondary"
                            //scrollable
                            //scrollButtons="auto"
                         >
                            {this.props.tabs.map((tab, index) => {
                                    return <Tab  key={index} icon={tab.icon} label={tab.label} />
                                }
                            )}
                        </Tabs>
                     }
                >
                        <Divider/>
                    <SwipeableViews index={index}>
                        {this.props.tabs.map((tab, key) => {
                                return (
                                    <div key={key}>{ key===index && renderRoutes(this.props.routes)}</div>
                                );
                            }
                        )}
                    </SwipeableViews>
                </CardBox>
            </div>
        );
    }
}
IconLabelTabs.propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.object).isRequired
};
export default IconLabelTabs;

