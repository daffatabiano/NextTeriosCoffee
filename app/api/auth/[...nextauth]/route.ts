import { login } from '@/lib/firebase/service';
import { compare } from 'bcrypt';
import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            type: 'credentials',
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                const { email, password } = credentials as {
                    email: string;
                    password: string;
                };
                const user: any = await login(email);
                if (user) {
                    const passwordConfirm = await compare(
                        password,
                        user.password
                    );
                    if (passwordConfirm) {
                        return user;
                    }
                    return null;
                } else {
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        jwt: async ({ token, account, user }: any) => {
            if (account?.provider === 'credentials') {
                token.id = user?.id;
                token.username = user?.username;
                token.email = user?.email;
                token.role = user?.role;
                token.image = user?.imageUrl;
            }
            return token;
        },
        async session({ session, token }: any) {
            if ('id' in token) {
                session.user.id = token.id;
            }
            if ('username' in token) {
                session.user.username = token.username;
            }
            if ('imageUrl' in token) {
                session.user.imageUrl = token.imageUrl;
            }
            if ('role' in token) {
                session.user.role = token.role;
            }
            if ('email' in token) {
                session.user.email = token.email;
            }
            if ('updated_At' in token) {
                session.user.updated_At = token.updated_At;
            }
            if ('created_At' in token) {
                session.user.created_At = token.created_At;
            }
            return session;
        },
    },
    pages: {
        signIn: '/login',
    },
};

// export default NextAuth(authOptions)

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
