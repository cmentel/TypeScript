import { Breadcrumb, Layout, Menu } from 'antd';
import { ConsoleSqlOutlined, DesktopOutlined, FileOutlined, UserOutlined, } from '@ant-design/icons';
import React  from "react";
import Grid from '@material-ui/core/Grid';
import { Button, Form, ListGroup } from 'react-bootstrap';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { toast } from 'react-toastify';
import axios from 'axios';
import SFile from '../../../grade-nope/src/SFile'
import TextCompare from '../../../grade-nope/src/TextCompare'
import * as fs from 'fs';
import * as path from 'path';



/* Server related content is taken from
 https://programmingwithmosh.com/javascript/react-file-upload-proper-server-side-nodejs-easy/ */
const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;


let path_view = '../Upload';

let jsCodeOne = `
function blocksContains(bs, b) {
    for (var i = 0; i < blocksCount(bs); i++) {
        if (block.blocksEqual(b, bs[i]))
            return true;
    }
    return false;
}`;

let jsCodeTwo = `
// does blockset bs contain b?
function blocksContains(bs, b) {
  for (var i = 0; i < blocksCount(bs); i++) {
      if (block.blocksEqual(b, bs[i]))
          return true;
  }
  return false;
}`;


class Homepage extends React.Component<{}, any>{
  

    onCollapse = (collapsed: any) => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    constructor(props) {
         super(props);
          this.state = {
            selectedFile: null,
            collapsed: false, 
            files: []
          } 
          console.log(this.props);

          this.onClickHandler = this.onClickHandler.bind(this);
          this.onChangeHandler = this.onChangeHandler.bind(this);
          this.getFiles = this.getFiles.bind(this);
      };

    

    checkMimeType=(event)=>{
        //getting file object
        let files = event.target.files 
        //define message container
        let err = []
        // list allow mime type
       const types = ['text/javascript','text/plain', 'text/python']
        // loop access array
        for(var x = 0; x<files.length; x++) {
         // compare file type find doesn't matach
             if (types.every(type => files[x].type !== type)) {
             // create error message and assign to container   
             err[x] = files[x].type+' is not a supported format\n';
           }
         };
         for(var z = 0; z<err.length; z++) {// if message not same old that mean has error 
             // discard selected file
            toast.error(err[z])
            event.target.value = null
        }
       return true;
      }

      maxSelectFile=(event)=>{
        let files = event.target.files
            if (files.length > 3) { 
               const msg = 'Only 3 images can be uploaded at a time'
               event.target.value = null
               toast.warn(msg)
               return false;
          }
        return true;
     }


    checkFileSize=(event)=>{
        let files = event.target.files
        let size = 2000000 
        let err = []; 
        for(var x = 0; x<files.length; x++) {
        if (files[x].size > size) {
         err[x] = files[x].type+'is too large, please pick a smaller file\n';
       }
      };
      for(var z = 0; z<err.length; z++) {// if message not same old that mean has error 
        // discard selected file
       toast.error(err[z])
       event.target.value = null
      }
      return true;
      }

      onChangeHandler=event=>{
        var files = event.target.files
        console.log("MEMEMEM" + event.target.files);
        if(this.maxSelectFile(event) && this.checkMimeType(event) &&    this.checkFileSize(event)){ 
        // if return true allow to setState
           this.setState({
           selectedFile: files,
           loaded:0
        })
      }
      }

      onClickHandler = () => {
        const data = new FormData();
        if (!this.state.selectedFile) { return; }
        for(var x = 0; x<this.state.selectedFile.length; x++) {
          data.append('file', this.state.selectedFile[x]);
        } 
        
        axios.post("http://localhost:8000/upload", data, {
          onUploadProgress: ProgressEvent => {
            this.setState({
              loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
            })
          },
        })
          .then(res => { // then print response status
            toast.success('upload success')
          })
          .catch(err => { // then print response status
            toast.error('upload fail')
          })
        }

        getFiles = () => {
          console.log("PISSSSSSSSS");
          const data = new FormData();
          axios.post(`http://localhost:8000/upload`, data)
          .then(res => {
            console.log("what is this" + res);
            console.log("More " + res.data);
          })
        //  console.log("on god" + this.state.files[0])
      }
        

        

    render() {
        const { collapsed } = this.state;
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                    <div className="logo" />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1" icon={<FileOutlined />}>
                            New Submission
                        </Menu.Item>
                        <SubMenu key="sub2" icon={<DesktopOutlined />} title="Past Submission">
                            <Menu.Item key="3">Homework 1</Menu.Item>
                            <Menu.Item key="4">Homework 2</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub1" icon={<UserOutlined />} title="Account">
                            <Menu.Item key="5">Info</Menu.Item>
                            <Menu.Item key="6">Settings</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }} />
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Minecraft Steve</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        <Grid container spacing={3}>
                        <Grid item sm={6}>
                            <Form>
                                    <Form.Label>Submit for Assignment 3</Form.Label>
                                <Form.Group controlId="File Submit">
                                    <Form.Label>File Submit</Form.Label>
                                    <input type="file" className="form-control" multiple onChange={this.onChangeHandler}/>
                                </Form.Group>
                                <Button variant="primary" type="submit" onClick={this.onClickHandler}>
                                    Submit
                                </Button>
                                <Form.Group>
                                <Button variant="primary" type="submit" onClick={this.getFiles}>
                                    Check files
                                </Button>
                                </Form.Group>
                            </Form>
                            </Grid>  
                            <Grid item sm={6}>
                                    <ListGroup>
                                    <ListGroup.Item>hw03.ts</ListGroup.Item>
                                    <ListGroup.Item>homework2.ts</ListGroup.Item>
                                    </ListGroup>
                                </Grid>
                                </Grid>

                            <Grid container spacing={4}>
                             <Grid item sm={4}>
                             <Button variant="primary" type="submit" >
                                    Previous
                                </Button>                
                             </Grid>
                             <Grid item sm={4}>
                                4 Cases of Plagarism found!
                             </Grid>

                             <Grid item sm={4}>
                             <Button variant="primary" type="submit" >
                                    Next
                                </Button>   
                             </Grid>
                         </Grid>       

                         <Grid container spacing={4}>
                             <Grid item sm={6}>
                             <SyntaxHighlighter language="typescript" style={dark} showLineNumbers={true} startingLineNumber={6}>
                                {jsCodeOne}
                             </SyntaxHighlighter>
                             </Grid>
                             <Grid item sm={6}>
                             <SyntaxHighlighter language="javascript" style={dark} showLineNumbers={true} startingLineNumber={23}>
                                {jsCodeTwo}
                             </SyntaxHighlighter>
                             </Grid>
                         </Grid>       
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default Homepage;