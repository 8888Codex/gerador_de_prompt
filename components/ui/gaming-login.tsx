'use client';
import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, MessageSquare } from 'lucide-react';
import { supabase } from '../../src/integrations/supabase/client';

interface LoginFormProps {
    onSuccess: () => void;
}

interface FormInputProps {
    icon: React.ReactNode;
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}

// FormInput Component
const FormInput: React.FC<FormInputProps> = ({ icon, type, placeholder, value, onChange, required }) => {
    return (
        <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
                {icon}
            </div>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                className="w-full pl-10 pr-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-blue-500/50 transition-colors"
            />
        </div>
    );
};

// Main LoginForm Component
const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
    const [mode, setMode] = useState<'login' | 'signup'>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        setMessage(null);

        try {
            if (mode === 'signup') {
                const { error: signUpError } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            whatsapp: whatsapp,
                        },
                    },
                });
                if (signUpError) throw signUpError;
                setMessage("Cadastro realizado! Verifique seu e-mail para confirmar a conta.");
            } else {
                const { error: signInError } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (signInError) throw signInError;
                
                setIsSuccess(true);
                await new Promise(resolve => setTimeout(resolve, 500));
                onSuccess();
            }
        } catch (err: any) {
            setError(err.message || 'Ocorreu um erro.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const toggleMode = (e: React.MouseEvent) => {
        e.preventDefault();
        setMode(prev => prev === 'login' ? 'signup' : 'login');
        setError(null);
        setMessage(null);
    };

    return (
        <div className="p-8 rounded-2xl bg-gray-900/80 border border-gray-700">
            <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold mb-2 text-white">
                    {mode === 'login' ? 'Bem-vindo ao Codex' : 'Crie sua Conta'}
                </h2>
                <p className="text-white/80">
                    {mode === 'login' ? 'Faça login para continuar.' : 'Preencha os dados para se cadastrar.'}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <FormInput
                    icon={<Mail className="text-white/60" size={18} />}
                    type="email"
                    placeholder="Endereço de e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                {mode === 'signup' && (
                    <FormInput
                        icon={<MessageSquare className="text-white/60" size={18} />}
                        type="tel"
                        placeholder="Número do WhatsApp (Opcional)"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                    />
                )}

                <div className="relative">
                    <FormInput
                        icon={<Lock className="text-white/60" size={18} />}
                        type={showPassword ? "text" : "password"}
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white focus:outline-none transition-colors"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>

                {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                {message && <p className="text-green-400 text-sm text-center">{message}</p>}

                {mode === 'login' && (
                    <div className="flex items-center justify-end">
                        <a href="#" className="text-sm text-white/80 hover:text-white transition-colors">
                            Esqueceu a senha?
                        </a>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 rounded-lg ${isSuccess
                            ? 'animate-success bg-green-500'
                            : 'bg-blue-600 hover:bg-blue-700'
                        } text-white font-medium transition-all duration-200 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40`}
                >
                    {isSubmitting ? (mode === 'login' ? 'Entrando...' : 'Cadastrando...') : (mode === 'login' ? 'Continuar' : 'Criar Conta')}
                </button>
            </form>

            <p className="mt-8 text-center text-sm text-white/60">
                {mode === 'login' ? 'Não tem uma conta?' : 'Já tem uma conta?'}
                {' '}
                <a href="#" onClick={toggleMode} className="font-medium text-white hover:text-blue-300 transition-colors">
                    {mode === 'login' ? 'Crie uma' : 'Faça login'}
                </a>
            </p>
        </div>
    );
};

const LoginPage = {
    LoginForm,
};

export default LoginPage;