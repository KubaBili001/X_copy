import { ObjectId } from "mongodb";

export default class User {
    constructor(public _id: ObjectId, public username: string, public email: string, public password: string, 
        public role: string, public name: string, public last_name: string, public birth_date: string, public join_date: string) {}
}