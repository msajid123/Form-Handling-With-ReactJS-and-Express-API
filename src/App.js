import React from 'react';
import axios from 'axios';
// import logo from './logo.svg';
// import './App.css';

const instance = axios.create({
  baseURL: 'http://localhost:8089/api',
  headers: {'Content-Type': 'multipart/form-data'}
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  console.log(`${config.baseURL}${config.url}`)
  console.log(config)
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hobbies: [],
    };
  }

  handleInputFields = (e) => {
    const { name, value } = e.target;
    console.log(name);
    if (name === 'Hobbies') {
      let hb = this.state.hobbies;
      if (!hb.includes(value)) {
        hb.push(value);
        this.setState({
          hobbies: hb,
        });
      } else {
        hb.pop(value);
        this.setState({
          hobbies: hb,
        });
      }
    } else if (name === 'resume') {
      this.setState({
        [name]: e.target.files[0],
      });
    } else {
      this.setState({
        [name]: value,
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      name,
      password,
      email,
      mobile,
      gender,
      resume,
      degree,
      address,
    } = this.state;
    if (
      name &&
      password &&
      email &&
      mobile &&
      gender &&
      resume &&
      degree &&
      address
    ) {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('password', password);
      formData.append('email', email);
      formData.append('mobile', mobile);
      formData.append('gender', gender);
      formData.append('file', resume);
      console.log(resume)
      for(const d of formData.entries()) {
        console.log(d)
      }
      const config = {
        headers: { 'content-type': 'multipart/form-data'},
      };

      instance({
        method: 'POST',
        url: '/form',
        headers: {'Content-Type': 'multipart/form-data'},
        data: formData
      })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log('error');
    }
  };

  render() {
    return (
      <div>
        <meta charSet="utf-8" />
        <title>Form Example</title>
        <form
          method="POST"
          align="center"
          style={{ backgroundColor: '#CCFF66' }}
          onSubmit={this.handleSubmit.bind(this)}
        >
          <h3 style={{ color: '#F00' }}>Personal Details</h3>
          Name:
          <input
            type="text"
            name="name"
            id="dd"
            onChange={this.handleInputFields.bind(this)}
          />
          <br />
          <br />
          Password:
          <input
            type="password"
            name="password"
            id="password"
            onChange={this.handleInputFields.bind(this)}
          />
          <br />
          <br />
          E-mail id:{' '}
          <input
            type="text"
            name="email"
            id="email"
            onChange={this.handleInputFields.bind(this)}
          />
          <br />
          <br />
          Gender:{' '}
          <input
            type="radio"
            name="gender"
            defaultValue="male"
            onChange={this.handleInputFields.bind(this)}
            id="radiogroup1"
          />{' '}
          Male
          <input
            type="radio"
            name="gender"
            defaultValue="female"
            onChange={this.handleInputFields.bind(this)}
            id="radiogroup2"
          />{' '}
          Female
          <br />
          <br />
          Contact#:{' '}
          <input
            type="text"
            name="mobile"
            id="mobile"
            onChange={this.handleInputFields.bind(this)}
          />
          <h3 style={{ color: '#F00' }}>Educational Qualification</h3>
          Degree:{' '}
          <select
            name="degree"
            id="degree"
            defaultValue="none"
            onChange={this.handleInputFields.bind(this)}
          >
            <option value="none">-- Select Group --</option>
            <option>B.Com</option>
            <option>B.sc</option>
            <option>B.com Computers</option>
            <option>B.A</option>
          </select>
          <br />
          <br />
          <br />
          Hobbies:{' '}
          <input
            type="checkbox"
            name="Hobbies"
            defaultValue="Playing Chess"
            id="CheckboxGroup1"
            onChange={this.handleInputFields.bind(this)}
          />
          Playing chess
          <input
            type="checkbox"
            name="Hobbies"
            defaultValue="Reading Books"
            id="CheckboxGroup2"
            onChange={this.handleInputFields.bind(this)}
          />
          Reading Books
          <br />
          <br />
          <h3 style={{ color: '#F00' }}>Address</h3>
          <textarea
            name="address"
            onChange={this.handleInputFields.bind(this)}
            cols={35}
            rows={5}
            id="textarea"
            defaultValue={''}
          />
          <br />
          <br />
          Attch Resume:{' '}
          <input
            type="file"
            accept="application/pdf"
            name="resume"
            id="fileField"
            onChange={this.handleInputFields.bind(this)}
          />
          <br />
          <br />
          <input type="submit" defaultValue="Submit" />
        </form>
      </div>
    );
  }
}

export default App;
