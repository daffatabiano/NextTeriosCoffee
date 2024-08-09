import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    getFirestore,
    query,
    updateDoc,
    where,
} from 'firebase/firestore';
import app from './firebase';
import bcrypt from 'bcrypt';

const firebase = getFirestore(app);

export async function retrieveData(collectionName: string) {
    const snapshot = await getDocs(collection(firebase, collectionName));
    const data = snapshot.docs.map((doc) => {
        return {
            id: doc.id,
            ...doc.data(),
        };
    });
    return data;
}

export async function retrieveDataById(collectionName: string, id: string) {
    const q = query(
        collection(firebase, collectionName),
        where('id', '==', id)
    );
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    return data[0];
}

export async function retrieveDataByField(
    collectionName: string,
    field: string,
    value: string
) {
    const q = query(
        collection(firebase, collectionName),
        where(field, '==', value)
    );
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    return data;
}

export async function addData(
    collectionName: string,
    data: any,
    callback: Function
) {
    await addDoc(collection(firebase, collectionName), data)
        .then((res: any) => {
            callback(true, res);
        })
        .catch((error) => {
            callback(false, error);
        });
}

export async function createProduct(products: any) {
    try {
        const q = query(
            collection(firebase, 'products'),
            where('id', '==', products.id)
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        if (data.length === 0) {
            await addDoc(collection(firebase, 'products'), {
                ...products,
                id: products.id,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        } else {
            console.log('Product already exists');
            return;
        }
    } catch (error) {
        console.error('Error adding document: ', error);
        throw error;
    }
}

export async function createAccount(
    userData: any
): Promise<{ status: boolean; message: string }> {
    const queryUsers = query(collection(firebase, 'users'));
    const snapshotUsers = await getDocs(queryUsers);
    const usersData = snapshotUsers.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    if (usersData.length >= 5 && userData.role === 'admin') {
        return { status: false, message: 'Maximum admin reached' };
    }
    const userQuery = query(
        collection(firebase, 'users'),
        where('email', '==', userData.email)
    );
    const snapshot = await getDocs(userQuery);
    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    userData.role = 'member';
    userData.created_At = new Date();
    userData.updated_At = new Date();
    userData.password = await bcrypt.hash(userData.password, 10);
    userData.passwordRepeat = await bcrypt.hash(userData.passwordRepeat, 10);
    if (data.length === 0) {
        try {
            await addDoc(collection(firebase, 'users'), userData);
            return { status: true, message: 'User created successfully' };
        } catch (error) {
            return { status: false, message: 'Failed to create user' };
        }
    } else {
        console.log('User already exists');
        return { status: false, message: 'Email aready registered' };
    }
}

export async function login(email: string) {
    const userQuery = query(
        collection(firebase, 'users'),
        where('email', '==', email)
    );
    const snapshot = await getDocs(userQuery);
    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    if (data) {
        return data[0];
    } else {
        return null;
    }
}

export async function updateProduct(
    id: string,
    product: any
): Promise<boolean> {
    try {
        const q = query(
            collection(firebase, 'products'),
            where('id', '==', id)
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        if (data.length > 0) {
            const docRef = doc(firebase, 'products', data[0].id);
            await updateDoc(docRef, product);
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error updating product:', error);
        return false;
    }
}

export async function deleteProduct(id: string) {
    try {
        const q = query(
            collection(firebase, 'products'),
            where('id', '==', id)
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        if (data.length > 0) {
            const docRef = doc(firebase, 'products', data[0].id);
            await deleteDoc(docRef);
        } else {
            console.log('Product not found');
        }
    } catch (error) {
        console.error('Error deleting product:', error);
    }
}
