import React, { Component } from 'react';
import { RefreshControl as RNRefreshControl } from 'react-native';
import PropTypes from 'prop-types';
import { vars } from '../../styles';

type RefreshControlProps = {
    onRefresh?: Function,
    refreshing?: Boolean,
    colors?: Array
}

class RefreshControl extends Component<RefreshControlProps> {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        let { refreshing, colors } = this.props;
        return (
            <RNRefreshControl
                onRefresh={() => this.props.onRefresh()}
                refreshing={refreshing}
                colors={colors}
            />
        );
    }
}

RefreshControl.propTypes = {
    onRefresh: PropTypes.func,
    refreshing: PropTypes.bool,
    colors: PropTypes.array
}

RefreshControl.defaulProps = {
    onRefresh: () => { },
    refreshing: false,
    colors: [vars.orange]
}

export default RefreshControl;