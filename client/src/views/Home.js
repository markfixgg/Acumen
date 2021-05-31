import { Layout, Row, Avatar } from 'antd';
import { blue } from '@ant-design/colors';
const { Header, Content } = Layout;
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
    size: 'middle'
};
const Home = () => {
    return (
        <Layout {...layout} className="layout" style={{ minHeight: '100vh' }}>
            <Header style={{backgroundColor: blue.primary, borderBottom: '1px solid gray'}}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <span style={{fontSize: '20px', fontWeight: 'bold'}}>Acumen</span>

                    <div>
                        <Avatar style={{ backgroundColor: 'gray', verticalAlign: 'middle' }}   size={38} src={"https://aif-s3.aif.ru/images/016/679/13a2510c8ebdec5b300a58eb96705b7d.jpg"} />
                    </div>
                </div>
            </Header>
            <Content>
               <Row type="flex" justify="center" >
                   {/*<Col span={15}>*/}
                       <h1>Home page</h1>
                   {/*</Col>*/}
               </Row>
            </Content>
        </Layout>
    )
}

export default Home