import { addData, retrieveDataByField } from '@/lib/firebase/service';
import bcrypt from 'bcrypt';
import { collection, query } from 'firebase/firestore';

interface DataUser {
    name: string;
    email: string;
    password: string;
    passwordRepeat: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}

// export async function createNewMember(userData: DataUser, callback: Function) {
//     const query = query(collection(fire))
// }
