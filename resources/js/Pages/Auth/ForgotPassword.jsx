import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

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

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Recuperar Senha" />

            <div className="mb-4 text-sm text-gray-800 font-bold">
                Esqueceu sua senha? Sem problemas. Informe seu e-mail e enviaremos um link para redefinir sua senha.
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600 dark:text-green-400">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData('email', e.target.value)}
                />

                <InputError message={errors.email && traduzirErro(errors.email)} className="mt-2" />

                <div className="mt-4 flex items-center justify-end">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Enviar link de redefinição
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
