interface BASE_AUTH_TYPE {
    email: string;
    password: string;
    username: string;
    passwordRepeat: string;
    role: string;
}

interface BASE_REGISTER_TYPE extends React.EventHandler<any> {
    preventDefault: () => void;
    target: {
        email: {
            value: string;
        };
        username: {
            value: string;
        };
        password: {
            value: string;
        };
        passwordRepeat: {
            value: string;
        };
    };
}
