import {
    addDoc,
    collection,
    getDocs,
    getFirestore,
    query,
    where,
} from 'firebase/firestore';
import app from './init';

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
