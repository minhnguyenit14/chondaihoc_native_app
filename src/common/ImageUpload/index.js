import React, { Component } from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import ModalSelector from 'react-native-modal-selector';
import { screenHeight, vars } from '../../styles';

type ImageUploadProps = {
    visible?: Boolean,
    onSuccess?: Function,
    onError?: Function,
    onClose?: Function
}

class ImageUpload extends Component<ImageUploadProps> {
    constructor(props) {
        super(props);
        this.state = {};
    }

    cameraPicker = (type) => {
        switch (type.key) {
            case 0:
                ImagePicker.openCamera({
                    width: 300,
                    height: 400,
                    cropping: true,
                }).then(image => {
                    this.props.onSuccess(image);
                }).catch(err => {
                    // alert(
                    //     'Lỗi',
                    //     err,
                    //     [{ text: 'OK' }],
                    //     { cancelable: true },
                    // );
                    this.props.onError();
                });
                break;
            case 1:
                ImagePicker.openPicker({
                    width: 300,
                    height: 400,
                    cropping: true
                }).then(image => {
                    this.props.onSuccess(image);

                }).catch(err => {
                    // alert(
                    //     'Lỗi',
                    //     err,
                    //     [{ text: 'OK' }],
                    //     { cancelable: true },
                    // );
                    this.props.onError();
                });
        }
    }

    render() {
        let { visible, customSelector } = this.props;
        const data = [
            { key: 0, label: 'Mở Camera' },
            { key: 1, label: 'Mở trong thư viện' },
        ];
        return (
            <ModalSelector
                customSelector={customSelector}
                animationType="fade"
                visible={visible}
                cancelTextStyle={{ color: vars.red }}
                backdropPressToClose
                data={data}
                cancelText={"Hủy"}
                onChange={this.cameraPicker}
                onModalClose={this.props.onClose}
                overlayStyle={{height: screenHeight, width: '100%', position: 'absolute'}}
            />
        );
    }
}

ImageUpload.defaultProps = {
    visible: false,
    onSuccess: () => { },
    onError: () => { },
    onClose: () => { }
}

export default ImageUpload;