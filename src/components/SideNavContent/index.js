import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import 'jquery-slimscroll/jquery.slimscroll.min';


class SideNavContent extends Component {

    activeCurrentNav(){
        const pathname = `/${this.props.location.pathname.split('/')[1]}`;// get current path
        const slideDuration = 250;
        const activeLi = $('a[href="' + pathname + '"]');// select current a element
        $('ul.nav-menu > li.menu').not(activeLi.parent()).removeClass('open');
        const activeNav = activeLi.closest('ul'); // select closest ul
        if (activeNav.hasClass('sub-menu')) {
            activeNav.slideDown(slideDuration);
            activeNav.parent().addClass('open');
            activeLi.parent().addClass('active');
        } else {
            activeLi.parent().addClass('open');
        }
    }
    componentDidUpdate(){
        this.activeCurrentNav();
    }
    componentDidMount() {
        const $nav = $(this.nav);
        const slideDuration = 250;

        $nav.slimscroll({
            height: '100%'
        });

        $('ul.nav-menu > li.menu').click(function () {
            const menuLi = this;
            $('ul.nav-menu > li.menu').not(menuLi).removeClass('open');
            $('ul.nav-menu > li.menu ul').not($('ul', menuLi)).slideUp(slideDuration);
            $('> ul', menuLi).slideToggle(slideDuration);
            $(menuLi).toggleClass('open');
        });

        $('ul.sub-menu li').click(function (e) {
            let superSubMenu = $(this).parent();
            if (superSubMenu.parent().hasClass('active')) {
                $('li', superSubMenu).not($(this)).removeClass('active');
            }
            else {
                $('ul.sub-menu li').not($(this)).removeClass('active');
            }

            $(this).toggleClass('active');
            e.stopPropagation();
        });
       this.activeCurrentNav();
    }

    render() {
        return (
            <ul className="nav-menu" ref={(c) => {
                this.nav = c;
            }}>
                {this.props.children}
            </ul>
        );
    }
}

export default SideNavContent;
