import React, { PureComponent } from 'react';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import { vars, ViewStyles, screenHeight, TextStyles } from '../../../styles';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { ImageUpload, Image, Heading, Text, Loading, Button } from '../../../common';
import moment from "moment";
let vi = require('moment/locale/vi.js');

class Avatar extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            image: null,
        };
    }

    closeModal = () => {
        this.setState({
            visible: false
        })
    }

    onSuccessGetImage = (image) => {
        this.setState({
            image
        });
        this.props.onSuccess(image);
        this.closeModal();
    }

    render() {
        let { avatarUrl, userFullName, userDOB, loading, avatarLoading } = this.props;
        let { visible, image } = this.state;
        image && (image = image.path);
        userDOB = userDOB && moment(userDOB).locale('vi', vi).format('DD MMM, YYYY');
        loading = loading && <Loading dot />
        let color = loading ? vars.borderColorDarker : vars.orange;
        return (
            <View style={[ViewStyles.flexCenterHorrizontal]}>
                <View style={{ position: 'relative' }}>
                    <View style={[styles.imgContainer]}>
                        <Image
                            loading={avatarLoading}
                            lightbox
                            style={[ViewStyles.container]}
                            uri={image || avatarUrl}
                            resizeMode="cover"
                        />
                    </View>
                    <ImageUpload
                        customSelector={
                            <TouchableOpacity
                                disabled={loading && true}
                                style={styles.btn}
                                onPress={() => this.setState({ visible: true })}
                            >
                                <Icon
                                    name="camera"
                                    color={color}
                                    size={vars.fontSizeLarge}
                                />
                            </TouchableOpacity>
                        }
                        visible={visible}
                        onClose={this.closeModal}
                        onSuccess={this.onSuccessGetImage}
                        onError={this.closeModal}
                    />
                </View>
                {loading ||
                    <React.Fragment>
                        <Heading style={[TextStyles.boldFont, styles.name]}>
                            {userFullName}
                        </Heading>
                        <Text>
                            {userDOB}
                        </Text>
                    </React.Fragment>
                }

            </View>
        );
    }
}

const styles = StyleSheet.create({
    btnContainer: {
        width: '100%',
        alignItems: 'center',
        flex: 1
    },
    name: {
        fontSize: vars.fontSizeStandard * 2,
        lineHeight: vars.fontSizeStandard * 2,
        marginBottom: vars.margin / 3
    },
    imgContainer: {
        borderRadius: vars.borderRadius * 4,
        borderWidth: vars.padding / 3,
        borderColor: vars.bg,
        backgroundColor: vars.borderColorDarker,
        width: screenHeight / 3,
        height: screenHeight / 3,
        maxWidth: 300,
        maxHeight: 300,
        overflow: 'hidden',
        marginVertical: vars.margin
    },
    btn: {
        backgroundColor: vars.white,
        borderRadius: vars.borderRadius,
        padding: vars.padding / 2,
        position: 'absolute',
        bottom: vars.margin * 2,
        right: vars.margin * 2,
        maxWidth: 140
    }
})

export default Avatar;