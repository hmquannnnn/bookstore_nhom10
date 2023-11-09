// import { Avatar, Button, Col, Divider, Form, Input, Row, Upload, message } from "antd";
// import { AiOutlineUser, AiOutlineMail } from "react-icons/ai";
// import { FiSmartphone, FiLock } from "react-icons/fi"
// import { BiPencil } from "react-icons/bi"
// import { useDispatch, useSelector } from "react-redux";
// import "./UserProfile.scss"
// import { callChangeAvatar, callFetchAccount } from "../../services/api";
// import { useEffect, useState } from "react";
// import { doGetAccountAction, updateAvatar } from "../../redux/counter/accountSlice";

// // const props = {
// //     beforeUpload: (file) => {
// //         const isPNG = file.type === 'image/jpg';
// //         if (!isPNG) {
// //             message.error(`${file.name} is not a png file`);
// //         }
// //         return isPNG || Upload.LIST_IGNORE;
// //     },
// //     onChange: (info) => {
// //         console.log(info.fileList);
// //     },
// // };

// const UserProfile = () => {
//     const dispatch = useDispatch();
//     const user = useSelector(state => state.account.user);
//     // console.log(">>>url: ", user.image_url);
//     const [ imageURL, setImageURL ] = useState(user.image_url);
//     // setImageURL(user.image_url);
//     console.log(">>>user: ", user);
//     const [ key, setKey ] = useState(0);
//     // console.log(">>>old image url: ", imageURL);
//     const handleImageURL = (newURL) => {
//         setImageURL(newURL);
//     }
//     useEffect(() => {
//         // Khi imageURL thay đổi, sẽ thực hiện cập nhật trên giao diện
//         setImageURL(user.image_url)
//     }, [user.image_url]);
//     useEffect(() => {
//         // Khi updatedUser thay đổi, cập nhật imageURL dựa trên updatedUser.image_url
//         setImageURL(updatedUser.image_url);
//     }, [updatedUser]);
//     const onFinish = () => {

//     }
//     const customRequest = async ({ file, onSuccess, onError }) => {
//         try {
//             const formData = new FormData();
//             formData.append("file", file);

//             const response = await callChangeAvatar(formData); 
//             if(response && response.payload) {
//                 console.log(">>>success");
//                 const updatedUser = await callFetchAccount(); 
//                 if (updatedUser) {
//                     console.log(">>>updated user: ", updatedUser.image_url);
//                     dispatch(doGetAccountAction(updatedUser));
//                     handleImageURL(updatedUser.image_url);
//                     console.log(">>>new user: ", imageURL, "vs ", response.payload)
//                     setKey(1);
//                     dispatch(updateAvatar(response.payload));
//                 }
//                 // handleImageURL(response.payload);
                
                
                
//             }
//             // console.log(">>>new image url: ", imageURL);
//             // Gọi hàm callChangeAvatar với đối tượng FormData
//             // console.log(">>>check res: ", response);
//             // console.log(">>>file: ", file);
//             // Handle the success response here if needed
//             onSuccess(response, file);
//         } catch (error) {
//             // Handle any errors or display an error message
//             console.error("Error uploading avatar:", error);
//             onError(error);
//         }
//     };
//     const getAccount = async () => {
//         const res = await callFetchAccount();
//         console.log(">>> check fetchAccount: ", res)
//         if (res) {
//             dispatch(doGetAccountAction(res));
//         }
//     }
//     useEffect(() => {
//         getAccount();
//     }, [])

//     return (
//         <>
//             <div className="profile-page" style={{ margin: "auto", width: "1440px", height: "800px" }}>
//                 <h3 style={{ fontFamily: "Arial, Helvetica, sans-serif", fontSize: "22px" }}>Thông tin tài khoản</h3>
//                 <div className="main" style={{ backgroundColor: "white", borderRadius: "5px", height: "550px" }}>
//                     <Row>
//                         <Col className="info" md={14} style={{ height: "500px" }}>
//                             <h4 style={{ fontSize: "20px", color: "#64646D", fontWeight: "400", margin: "5px 0 0 10px" }}>Thông tin cá nhân</h4>
//                             {/* <Divider/> */}
//                             <Row>
//                                 <Col className="avatar" span={5} >
//                                     <Avatar
//                                         key={key}
//                                         size={128}
//                                         icon={<AiOutlineUser />}
//                                         style={{ margin: "25px" }}
//                                         src={user.image_url}
//                                     />
//                                     <Upload
//                                         customRequest={customRequest}
//                                         showUploadList={false}
//                                     >
//                                         {/* <Button type="primary">Chọn ảnh đại diện</Button> */}
//                                         <BiPencil className="upload-file" />
//                                     </Upload>

//                                 </Col>
//                                 <Col className="user-info" span={19} >
//                                     <Form
//                                         name="form"
//                                         onFinish={onFinish}
//                                     >
//                                         <Form.Item
//                                             name="name"
//                                             label="Tên tài khoản"
//                                             labelCol={{ span: 24 }}
//                                         >
//                                             <Input placeholder={user.name} style={{ borderRadius: "2px" }} />
//                                         </Form.Item>
//                                         {/* <Form.Item
//                                             name="email"
//                                             label="Email"
//                                             labelCol={{ span: 24 }}
//                                         >
//                                             <Input placeholder={user.email} style={{ borderRadius: "2px" }} />
//                                         </Form.Item>
//                                         <Form.Item
//                                             name="phone"
//                                             label="Số điện thoại"
//                                             labelCol={{ span: 24 }}
//                                         >
//                                             <Input placeholder={user.phone} style={{ borderRadius: "2px" }} />
//                                         </Form.Item> */}
//                                         <Form.Item
//                                             name="address"
//                                             label="Địa chỉ"
//                                             labelCol={{ span: 24 }}
//                                         >
//                                             <Input placeholder={user.address} style={{ borderRadius: "2px" }} />
//                                         </Form.Item>
//                                         <Button type="primary" htmlType="submit">Lưu thay đổi</Button>
//                                     </Form>
//                                 </Col>

//                             </Row>

//                         </Col>
//                         <Divider type="vertical" style={{ height: "500px" }} />
//                         <Col className="abc" md={9} style={{ height: "500px" }}>
//                             <Row>
//                                 <div>
//                                     <h4 style={{ fontSize: "20px", color: "#64646D", fontWeight: "400", margin: "5px 0 0 0" }}>Email và Số điện thoại</h4>
//                                     <div style={{display: "flex", justifyContent: "space-between"}}>
//                                         <div className="container">
//                                             <AiOutlineMail className="icon" style={{ top: "14px" }} />
//                                             <div className="text">
//                                                 <p>Email</p>
//                                                 <p>{user.email}</p>
//                                             </div>
//                                         </div>
//                                         <Button style={{position: "relative", left: "320px", top: "10px"}}>Cập nhật</Button>
//                                     </div>
//                                     <div style={{ display: "flex", justifyContent: "space-between" }}>
//                                         <div className="container">
//                                             <FiSmartphone className="icon" style={{ top: "12px" }} />
//                                             <div className="text">
//                                                 <p>Số điện thoại</p>
//                                                 <p>{user.phone}</p>
//                                             </div>

//                                         </div>
//                                         <Button style={{ position: "relative", left: "320px", top: "10px" }}>Cập nhật</Button>
//                                     </div>
                                    
//                                 </div>

//                             </Row>
//                             <Divider />
//                             <Row>
//                                 <div>
//                                     <h4 style={{ fontSize: "20px", color: "#64646D", fontWeight: "400", margin: "5px 0 0 0" }}>Bảo mật</h4>
//                                     <div style={{ display: "flex", justifyContent: "space-between" }}>
//                                         <div className="container">
//                                             <FiLock className="icon" style={{ top: "12px" }} />
//                                             <p className="text">Đổi mật khẩu</p>
//                                         </div>
//                                         <Button style={{ position: "relative", left: "342px", top: "10px" }}>Cập nhật</Button>
//                                     </div>
                                    
//                                 </div>
//                             </Row>
//                         </Col>
//                     </Row>
//                 </div>

//             </div>
//         </>
//     )
// }

// export default UserProfile;
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateAvatar, doGetAccountAction } from '../../redux/counter/accountSlice';
import { callChangeAvatar, callFetchAccount } from '../../services/api';
import { Avatar, Button, Col, Divider, Form, Input, Row, Upload } from 'antd';
import { AiOutlineUser, AiOutlineMail } from 'react-icons/ai';
import { FiSmartphone, FiLock } from 'react-icons/fi';
import { BiPencil } from 'react-icons/bi';
import './UserProfile.scss';

const UserProfile = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.account.user);
    const [imageURL, setImageURL] = useState(user.image_url);

    const customRequest = async ({ file, onSuccess, onError }) => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await callChangeAvatar(formData);
            if (response && response.payload) {
                const updatedUser = await callFetchAccount();
                if (updatedUser) {
                    console.log('>>>updated user: ', updatedUser.image_url);
                    dispatch(doGetAccountAction(updatedUser));
                }

                setImageURL(updatedUser.image_url);
                console.log(">>>imageURL: ", imageURL);
                dispatch(updateAvatar(response.payload));
            }

            onSuccess(response, file);
        } catch (error) {
            console.error('Error uploading avatar:', error);
            onError(error);
        }
    };

    const getAccount = async () => {
        const res = await callFetchAccount();
        console.log('>>> check fetchAccount: ', res);
        if (res) {
            dispatch(doGetAccountAction(res));
        }
    };

    useEffect(() => {
        getAccount();
    }, []);

    useEffect(() => {
        setImageURL(user.image_url);
    }, [user.image_url]);

    const onFinish = () => {
        // Your form submission logic here
    };

    return (
        <div className="profile-page" style={{ margin: 'auto', width: '1440px', height: '800px' }}>
            <h3 style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '22px' }}>Thông tin tài khoản</h3>
            <div className="main" style={{ backgroundColor: 'white', borderRadius: '5px', height: '550px' }}>
                <Row>
                    <Col className="info" md={14} style={{ height: '500px' }}>
                        <h4 style={{ fontSize: '20px', color: '#64646D', fontWeight: '400', margin: '5px 0 0 10px' }}>Thông tin cá nhân</h4>
                        <Row>
                            <Col className="avatar" span={5}>
                                <Avatar
                                    size={128}
                                    icon={<AiOutlineUser />}
                                    style={{ margin: '25px' }}
                                    src={imageURL}
                                />
                                <Upload customRequest={customRequest} showUploadList={false}>
                                    <BiPencil className="upload-file" />
                                </Upload>
                            </Col>
                            <Col className="user-info" span={19}>
                                <Form name="form" onFinish={onFinish}>
                                    <Form.Item name="name" label="Tên tài khoản" labelCol={{ span: 24 }}>
                                        <Input placeholder={user.name} style={{ borderRadius: '2px' }} />
                                    </Form.Item>
                                    <Form.Item name="address" label="Địa chỉ" labelCol={{ span: 24 }}>
                                        <Input placeholder={user.address} style={{ borderRadius: '2px' }} />
                                    </Form.Item>
                                    <Button type="primary" htmlType="submit">Lưu thay đổi</Button>
                                </Form>
                            </Col>
                        </Row>
                    </Col>
                    <Divider type="vertical" style={{ height: '500px' }} />
                    <Col className="abc" md={9} style={{ height: '500px' }}>
                        <Row>
                            <div>
                                <h4 style={{ fontSize: '20px', color: '#64646D', fontWeight: '400', margin: '5px 0 0 0' }}>Email và Số điện thoại</h4>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div className="container">
                                        <AiOutlineMail className="icon" style={{ top: '14px' }} />
                                        <div className="text">
                                            <p>Email</p>
                                            <p>{user.email}</p>
                                        </div>
                                    </div>
                                    <Button style={{ position: 'relative', left: '320px', top: '10px' }}>Cập nhật</Button>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div className="container">
                                        <FiSmartphone className="icon" style={{ top: '12px' }} />
                                        <div className="text">
                                            <p>Số điện thoại</p>
                                            <p>{user.phone}</p>
                                        </div>
                                    </div>
                                    <Button style={{ position: 'relative', left: '320px', top: '10px' }}>Cập nhật</Button>
                                </div>
                            </div>
                        </Row>
                        <Divider />
                        <Row>
                            <div>
                                <h4 style={{ fontSize: '20px', color: '#64646D', fontWeight: '400', margin: '5px 0 0 0' }}>Bảo mật</h4>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div className="container">
                                        <FiLock className="icon" style={{ top: '12px' }} />
                                        <p className="text">Đổi mật khẩu</p>
                                    </div>
                                    <Button style={{ position: 'relative', left: '342px', top: '10px' }}>Cập nhật</Button>
                                </div>
                            </div>
                        </Row>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default UserProfile;
