import React, { Component } from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import ModalSelector from 'react-native-modal-selector';
import { screenHeight } from '../../styles';

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
        let { visible } = this.props;
        const data = [
            { key: 0, label: 'Mở Camera' },
            { key: 1, label: 'Mở trong thư viện' },
        ];
        return (
            <ModalSelector
                visible={visible}
                style={{ opacity: 0 }}
                data={data}
                overlayStyle={{ height: screenHeight }}
                cancelText={"Hủy"}
                onChange={this.cameraPicker}
                onModalClose={this.props.onClose}
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