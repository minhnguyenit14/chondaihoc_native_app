import React, { Component } from 'react';
import { AppContainer, Text, Heading, Title, Caption } from '../../../common';
import { View, StyleSheet } from 'react-native';
import { ROUTES } from '../../../constants';
import { connect } from 'react-redux';
import ResultKind from './ResultKind';
import { Icon } from 'react-native-elements';
import { vars, TextStyles } from '../../../styles';
import Divider from 'react-native-divider';

class TestResult extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: ROUTES.TEST_RESULT.header,
        }
    };
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderKinds = (result) => {
        let data = []
        result.map((r, i) => {
            let type = "";
            let icon = <Icon type="font-awesome" name="heart" />;
            switch (i) {
                case 0:
                    type = "first";
                    // icon = <span className={classnames(cls.trophy, cls.second)}>
                    //     {icon}
                    // </span>;
                    break;
                case 1:
                    type = "second";
                    // icon = <span className={classnames(cls.trophy, cls.first)}>
                    //     {icon}
                    // </span>;
                    break;
                case 2:
                    type = "third";
                    // icon = <span className={classnames(cls.trophy, cls.third)}>
                    //     {icon}
                    // </span>;
                    break;
                default:
                    break;
            }
            data.push(
                <ResultKind
                    icon={icon}
                    key={r.CharacterKindID}
                    type={type}
                    data={r}
                />
            )
        })
        return data;
    }

    render() {
        let { result, kindCode, testMsg } = this.props.uniTest;
        let kinds = this.renderKinds(result);
        return (
            <AppContainer>
                <Divider
                    borderColor={vars.borderColorDarker}
                    orientation="center"
                >
                    <Title style={[TextStyles.boldFont]}>
                        Mã tính cách của bạn là
                        </Title>
                </Divider>
                <View style={styles.code}>
                    <Title style={[TextStyles.boldFont, styles.textCode]}>
                        {kindCode}
                    </Title>
                </View>
                <Caption style={styles.testMsg}>
                    {testMsg && `(${testMsg})`}
                </Caption>
                {kinds}
            </AppContainer>
        );
    }
}

const styles = StyleSheet.create({
    code: {
        width: 100,
        marginTop: vars.margin,
        paddingVertical: vars.padding / 2,
        borderRadius: vars.borderRadius / 4,
        backgroundColor: vars.primaryActive
    },
    testMsg: {
        fontStyle: 'italic',
        marginBottom: vars.margin
    },
    textCode: {
        fontWeight: vars.fontBold,
        textAlign: 'center',
        color: vars.white,
        textShadowOffset: vars.textShadowOffset,
        textShadowRadius: vars.textShadowRadius
    }
})

const mapStateToProps = state => (
    {
        uniTest: state.uniTest
    }
)

export default connect(
    mapStateToProps
)(TestResult);