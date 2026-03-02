import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

// Função para traduzir mensagens de erro para português
function traduzirErro(msg) {
    if (!msg) return '';
    if (msg.includes('These credentials do not match our records')) return 'E-mail ou senha incorretos.';
    if (msg.includes('The email field is required')) return 'O campo e-mail é obrigatório.';
    if (msg.includes('The password field is required')) return 'O campo senha é obrigatório.';
    if (msg.includes('password')) return 'Senha inválida.';
    if (msg.includes('email')) return 'E-mail inválido.';
    return msg;
}

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            {/* Tela de login personalizada, tudo em português */}
            <Head title="Entrar" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="E-mail" className="text-gray-800 font-bold" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full text-gray-600"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email && traduzirErro(errors.email)} className="mt-2" />

                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Senha" className="text-gray-800 font-bold" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full text-gray-600"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password && traduzirErro(errors.password)} className="mt-2" />

                </div>

                <div className="mt-4 block">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            Lembrar-me
                        </span>
                    </label>
                </div>

                <div className="mt-4 flex items-center justify-end">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
                        >
                            Esqueceu sua senha?
                        </Link>
                    )}

                    <PrimaryButton className="ms-4 bg-blue-700 hover:bg-blue-800" disabled={processing}>
                        Entrar
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
