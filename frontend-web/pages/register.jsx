import { useState } from 'react';
import { useRouter } from 'next/router';
import { registerUser } from '../services/userService';

export default function Register() {
    const [form, setForm] = useState({ username: '', email: '', password: '' });
    const router = useRouter();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async () => {
        await registerUser(form);
        router.push('/login');
    };

    return (
        <div>
            <h2>Đăng ký</h2>
            <input name="username" placeholder="Tên đăng nhập" onChange={handleChange} />
            <input name="email" placeholder="Email" onChange={handleChange} />
            <input name="password" type="password" placeholder="Mật khẩu" onChange={handleChange} />
            <button onClick={handleSubmit}>Đăng ký</button>
        </div>
    );
}
