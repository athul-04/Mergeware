import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import { Meteor } from 'meteor/meteor';

const Card = () => {
    const [resData, setResData] = useState([]);
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [ccName, setccName] = useState('visit visit-2-ad');
    const [currUser, setCurrUser] = useState({});
    const [id, setId] = useState(null);
    const [clicked, setClicked] = useState(null);
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
                setResData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const anyUser = resData.find(
            (user) => user.username === formData.username && user.password === formData.password
        );

        if (anyUser) {
            setId(anyUser._id);
            setccName('visit');
        } else {
            setId(null);
            setccName('visit visit-2-ad');
        }
    }, [formData.username, formData.password, resData]);

    const changeHandler = (e) => {
        setccName('visit visit-2-ad');
        const { name, value } = e.target;
        setFormData((oldval) => ({
            ...oldval,
            [name]: value,
        }));
    };

    useEffect(() => {
        
        const fetchData = async () => {
                try {
                    const result = await new Promise((resolve, reject) => {
                        Meteor.call('users.findOne', { id: id }, (error, result) => {
                            if (error) {
                                reject(error);
                            } else {
                                resolve(result);
                            }
                        });
                    });
                    setCurrUser(result);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };

            fetchData();
    }, [id, clicked]);

    const clickHandler = (e) => {
        e.preventDefault();
        setFormData({ username: '', password: '' });
        setClicked(1);
        const userType = currUser[0].type;
        console.log(currUser);
        navigate(`/home/${userType}/${id}`);
    };

    return (
        <div className="box-container">
            <div className="box-1">
                <div className="inp">
                    <h3 className="syt">LOAN</h3>
                    <input
                        className="inp-1"
                        placeholder="Username"
                        name="username"
                        value={formData.username}
                        onChange={changeHandler}
                        type="text"
                    />
                    <input
                        className="inp-2"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={changeHandler}
                        type="password"
                    />
                    <Link to={``} className={ccName} onClick={clickHandler}>
                        Visit
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Card;
