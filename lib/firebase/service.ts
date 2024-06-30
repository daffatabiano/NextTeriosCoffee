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
