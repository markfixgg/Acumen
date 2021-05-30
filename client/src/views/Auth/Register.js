import { Layout, Form, Input, Button, Row, Spin } from 'antd';
import { blue } from '@ant-design/colors';
import {useState, useEffect} from "react";
const { Header, Content, Footer } = Layout;

const Register = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const onChange = () => {

    }

    const onFinish = (values) => {
        console.log('Success:', values);

        setLoading(true)

        setTimeout(() => {setLoading(false)}, 2000)

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
        size: 'middle'
    };

    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };


    return (
        <Layout className="layout" style={{ minHeight: '100vh' }}>
           <Header style={{backgroundColor: blue.primary, borderBottom: '1px solid gray'}}>
               <h1 style={{fontSize: '24px'}}>Acumen</h1>
           </Header>

            <Content style={{ padding: '20px 0px 10px 0px', margin: '0 auto'}}>
                <div style={{display: 'flex', justifyContent: 'center'}} className={"title"}>
                    <h1>Register</h1>
                </div>

                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="First Name"
                        name="first_name"
                        rules={[{ required: true, message: 'Please input your first name!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Last Name"
                        name="second_name"
                        rules={[{ required: true, message: 'Please input your second name!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                        style={{marginBottom: '8px'}}
                    >
                        <Input.Password />
                    </Form.Item>

                    <div style={{display: 'flex', justifyContent: 'center', marginBottom: '5px'}} className={"title"}>
                        <h4>Already registered? <a>Sign in!</a></h4>
                    </div>

                    <Row type="flex" justify="center">
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                {loading ? "Loading..." : "Register"}
                            </Button>
                        </Form.Item>
                    </Row>
                </Form>
            </Content>
        </Layout>
    )
}

export default Register