import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/FHComponents/FHLogin.css'

class FHLogin extends Component {
    constructor(props) {
      super(props)
      this.state = {
        email: "",
        password: ""
      };
    }

    validateForm() {
      return this.state.email.length > 0 && this.state.password.length > 0;
    }
  
    handleTextChange = event => {      
      this.setState({
        [event.target.id]: event.target.value
      });
    }
  
    handleSubmit = event => {
      event.preventDefault();
      
    }

    render() {
        return (
            <div className="Login">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Tài khoản</label>
                  <input
                    id="email"
                    autoFocus
                    type="text"
                    value={this.state.email}
                    onChange={this.handleTextChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Mật khẩu</label>
                  <input
                    id="password"
                    value={this.state.password}
                    onChange={this.handleTextChange}
                    type="password"
                    className="form-control"
                  />
                </div>
                <button                  
                  type="submit"
                  className="btn btn-primary col-sm-12"
                >
                  Đăng nhập
                </button>
              </form>
            </div>
          );
    }

}

export default FHLogin;