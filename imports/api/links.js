import { Mongo } from 'meteor/mongo';

export const LinksCollection = new Mongo.Collection('links');
export const AdminCollection = new Mongo.Collection('admins');
export const LenderCollection = new Mongo.Collection('lenders');
export const BorrowerCollection = new Mongo.Collection('borrowers');
export const UsersCollection=new Mongo.Collection('users');
export const BorrowRequests=new Mongo.Collection('borrowrequests');
export const satisfiedRequests=new Mongo.Collection('satisfiedRequests');



