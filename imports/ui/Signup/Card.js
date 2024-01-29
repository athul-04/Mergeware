import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userActions } from '../store/userStore';
import { Link } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { UsersCollection } from "../../api/links";
import { Meteor } from 'meteor/meteor';

const Card = () => {
  const [ccName, setccName] = useState('visit-2-ad');
  const [progressval, setProgressval] = useState(0);
  const [allow, setAllow] = useState(0);
  const [userDataAvailable, setUserDataAvailable] = useState(false);
  const [resData,setresData]=useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await new Promise((resolve, reject) => {
          Meteor.call('users.getAll', (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          });
        });
        setresData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  
  console.log("Resdata is", resData);

  const formData = useSelector(state => ({
    username: state.user.username,
    password: state.user.password,
    confirmPassword: state.user.confirmPassword,
    type: state.user.type,
  }));


  useEffect(() => {
    var pass = formData.password;
    if (pass.match(/[A-Z]/)) {
      setProgressval((oldval) => oldval + 1);
    }
    if (pass.match(/\d/)) {
      setProgressval((oldval) => oldval + 1);
    }
    if (pass.length > 4) {
      setProgressval((oldval) => oldval + 1);
    }
    if (formData.password.length > 0 && formData.password === formData.confirmPassword) {
      setAllow(1);
    }
    const anyUser = resData.filter((item) => item.username === formData.username);
    console.log("Any user:", anyUser);
    if (anyUser.length > 0) {
      setAllow(0);
    }
  }, [formData.password, formData.confirmPassword, formData.username, formData.type, resData]);

  useEffect(() => {
    setccName(() => (progressval === 3 && allow === 1) ? "visit-2" : "visit-2 visit-2-ad");
  }, [progressval, allow, formData.confirmPassword]);

  const changeHandler = (e) => {
    setProgressval(0);
    setAllow(0);
    const { name, value } = e.target;
    if (name === "username") dispatch(userActions.assignName({ username: value }));
    else if (name === "password") dispatch(userActions.assignPassword({ password: value }))
    else if (name === "select") dispatch(userActions.assignType({ type: value }))
    else dispatch(userActions.assignConfirmPassword({ confirmPassword: value }));
  }

  const check = () => {
    return formData.password !== "";
  }

  const clickHandler = async (e) => {
    e.preventDefault();

    if (check()) {
      Meteor.call('users.create', {
        username: formData.username,
        password: formData.password,
        type: formData.type
      }, (err, res) => {
        if (err) {
          console.error("Error calling 'users.create' method:", err);
        } else {
          console.log("User inserted:", res);
          setUserDataAvailable(true);
        }
      });
      if(formData.type==="lender"){
        Meteor.call('lender.create', {
          username: formData.username,
          password: formData.password,
          type: formData.type
        }, (err, res) => {
          if (err) {
            console.error("Error calling 'lender.create' method:", err);
          } else {
            console.log("User inserted:", res);
            setUserDataAvailable(true);
          }
        });

      }
      else if(formData.type=="borrower"){
        Meteor.call('borrower.create', {
          username: formData.username,
          password: formData.password,
          type: formData.type
        }, (err, res) => {
          if (err) {
            console.error("Error calling 'borrower.create' method:", err);
          } else {
            console.log("User inserted:", res);
            setUserDataAvailable(true);
          }
        });

      }
      else{
        Meteor.call('admin.create', {
          username: formData.username,
          password: formData.password,
          type: formData.type
        }, (err, res) => {
          if (err) {
            console.error("Error calling 'admin.create' method:", err);
          } else {
            console.log("User inserted:", res);
            setUserDataAvailable(true);
          }
        });

      }
    }
    dispatch(userActions.reFrame());
  }


  useEffect(() => {
    if (userDataAvailable) {
      navigate('/');
    }
  }, [userDataAvailable, navigate]);

  return (
    <div className="box-container">
      <div className="box-1">
        <div className="inp">
          <h3 className="syt">LOAN</h3>
          <div className='dropdown-container'>
            <select name="select" value={formData.selectedValue} onChange={changeHandler}>
              <option value="">Select...</option>
              <option value="lender">Lender</option>
              <option value="admin">Admin</option>
              <option value="borrower">Borrower</option>
            </select>
          </div>
          <input className="inp-1" placeholder="Username" name="username" value={formData.username} onChange={changeHandler} type="text" />
          <input className="inp-2" placeholder="Password" name="password" value={formData.password} onChange={changeHandler} type="password" />
          <progress className="inp-3" value={progressval} max={3} varient="progressColor" />
          <input className="inp-2" placeholder="Confirm Password" name="confirmPassword" value={formData.confirmPassword} onChange={changeHandler} type="password" />
          <Link onClick={clickHandler} className={ccName} >SignUp</Link>
        </div>
      </div>
    </div>
  )
}

export default Card;
