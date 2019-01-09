import React from 'react';
import {Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

class PageHeader extends React.Component {
    render(){
        return (
            <div className="page-heading d-sm-flex justify-content-sm-between align-items-sm-center">
                <h2 className="title mb-3 mb-sm-0">{this.props.title}</h2>

                <Breadcrumb className="mb-0" tag="nav">
                    {this.props.breadcrumbs.map((breadcrumbItem, index) => {
                            return <BreadcrumbItem active={this.props.breadcrumbs === index + 1} tag='span' key={index}>
                                <Link to={breadcrumbItem.link}>
                                    {breadcrumbItem.title}
                                </Link>
                            </BreadcrumbItem>
                        }
                    )}
                </Breadcrumb>
            </div>
        )
    }
}
PageHeader.propTypes = {
    title: PropTypes.string.isRequired,
    breadcrumbs: PropTypes.arrayOf(PropTypes.object).isRequired
};
export default PageHeader;

