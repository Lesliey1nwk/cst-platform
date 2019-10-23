import React, { useState } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { connect } from 'react-redux';
import { actions as userActions } from '@/redux/user';
import { createHashHistory } from 'history';
const history = createHashHistory();

const LoginPage = ({ handleLogin, isFetching }) => {
  const [userNameObj, setUserName] = useState({
    value: 'admin'
  });

  const [passworldObj, setPassworld] = useState({
    value: 'e10adc3949ba59abbe56e057f20f883e'
  });

  return (
    <div className="login-container">
      <Form className="login-form">
        <h2>登录系统</h2>
        <Form.Item>
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Username"
            onChange={e => {
              setUserName({
                value: e.target.value
              });
            }}
            value={userNameObj.value}
          />
        </Form.Item>
        <Form.Item>
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Password"
            value={passworldObj.value}
            onChange={e => {
              setPassworld({
                value: e.target.value
              });
            }}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={() => {
            if (userNameObj.value && passworldObj.value) {
              handleLogin(userNameObj.value, passworldObj.value);
            }
          }} block loading={isFetching} className="login-form-button">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const mapStateToProps = ({ userState }) => {
  return {
    isFetching: userState.isFetching
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleLogin: (name, passworld) => {
      dispatch(userActions.loginByUsername(name, passworld)).then(res => {
        history.push('/');
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
