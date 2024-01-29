import { Meteor } from 'meteor/meteor';
import { UsersCollection, AdminCollection, BorrowerCollection, LenderCollection } from '../imports/api/links';
import { check } from 'meteor/check';
import {useTracker} from 'meteor/react-meteor-data'; 


Meteor.methods({
  "users.create":function(data){
    return UsersCollection.insert({username:data.username,password:data.password,type:data.type});
  },
  "admin.create":function(data){
    return AdminCollection.insert({username:data.username,password:data.password,type:data.type});
  },
  "borrower.create":function(data){
    return BorrowerCollection.insert({username:data.username,password:data.password,type:data.type});
  },
  "lender.create":function(data){
    return LenderCollection.insert({username:data.username,password:data.password,type:data.type});
  },

  "users.findOne":function(data){
    console.log("hello")
    console.log("data_id"+data.id)
    return UsersCollection.find({_id:data.id}).fetch();
  },

  'users.getAll': function () {
    const users = useTracker(() => UsersCollection.find().fetch());
    return users;
  },
})

