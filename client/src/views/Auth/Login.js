import { Layout, Form, Input, Button, Row, Spin } from 'antd';
import { blue } from '@ant-design/colors';
import {useState, useEffect} from "react";
const { Header, Content, Footer } = Layout;

const Login = () => {
    const [loading, setLoading] = useState(false)

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

    return (
        <Layout className="layout" style={{ minHeight: '100vh' }}>
            <Header style={{backgroundColor: blue.primary, borderBottom: '1px solid gray'}}>
                <h1 style={{fontSize: '24px'}}>Acumen</h1>
            </Header>

            <Content style={{ padding: '20px 0px 10px 0px', margin: '0 auto'}}>
                <div style={{display: 'flex', justifyContent: 'center'}} className={"title"}>
                    <h1>Login</h1>
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
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                        style={{marginBottom: '8px'}}
                    >
                        <Input.Password />
                    </Form.Item>

                    <div style={{display: 'flex', justifyContent: 'center', marginBottom: '5px'}} className={"title"}>
                        <h4>Not registered yet? <a>Register!</a></h4>
                    </div>

                    <Row type="flex" justify="center">
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                {loading ? "Loading..." : "Login"}
                            </Button>
                        </Form.Item>
                    </Row>
                </Form>
            </Content>
        </Layout>
    )
}

export default Login