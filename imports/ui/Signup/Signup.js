import React from 'react'
import Header from './Header';
import Card from './Card';
import { AdminCollection, UsersCollection } from '../../api/links';
import { LenderCollection } from '../../api/links';
import { BorrowerCollection } from '../../api/links';
import "../Login/style.css"



const Signup=()=>{

    const resData=UsersCollection.find().fetch();
    console.log(resData)

    return(
        <div className="container">
            <Header />
            <Card />
        </div>
    )
}


export default Signup;


