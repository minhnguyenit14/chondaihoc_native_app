import React, { Component } from 'react';
import { NavigationEvents as RNNavigationEvents } from 'react-navigation';
import { ROUTES } from '../../constants';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    setNextTab,
    setCurrentTab
} from '../../actions/navigationEvents';
import * as Animatable from 'react-native-animatable';

type NavigationEventsProps = {
    screen?: React.Node
}

class NavigationEvents extends Component<NavigationEventsProps> {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillReceiveProps(nextProps) {
        // let { currentTab, nextTab } = this.props.navigationEvents;
        // console.log(currentTab, nextTab)
        // if (currentTab !== nextTab) {
        this.makeAnimate()
        // }
    }

    makeAnimate = () => {
        let { tabs, currentTab, nextTab } = this.props.navigationEvents;
        if (currentTab || nextTab) {
            if (currentTab !== nextTab) {
                let currentRouteIndex = 0;
                let screenIndex = 0;
                tabs.map((t, i) => {
                    t.route === currentTab.route && (currentRouteIndex = i);
                    t.route === nextTab.route && (screenIndex = i);
                })
                if (screenIndex < currentRouteIndex) {
                    this.appAnimate.fadeInRight(1000);
                } else if (screenIndex > currentRouteIndex) {
                    this.appAnimate.fadeInLeft(1000);
                } else {
                    this.appAnimate.fadeIn(1000);
                }
                this.props.setCurrentTab(nextTab);
            }
        }
    }

    render() {
        return (
            <React.Fragment>
                <Animatable.View
                    useNativeDriver
                    style={{ width: '100%', height: '100%' }}
                    ref={inst => this.appAnimate = inst}
                >
                    {this.props.children}
                </Animatable.View>
            </React.Fragment>

        )
    }
}

NavigationEvents.defaultProps = {
    screen: null
}

NavigationEvents.propTypes = {
    screen: PropTypes.any
}

const mapStateToProps = state => ({
    navigationEvents: state.navigationEvents
})

const mapDispatchToProps = dispatch => ({
    setCurrentTab: (currentTab) => dispatch(setCurrentTab(currentTab)),
    setNextTab: (nextTab) => dispatch(setNextTab(nextTab)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavigationEvents);