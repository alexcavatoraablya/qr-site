import {type SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {registerSchema} from "./validate.ts";
import type {IRegisterType} from "./types.ts";

const RegisterPage = () => {

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isDirty}, //якщо є помилки
    } = useForm<IRegisterType>({
        resolver: zodResolver(registerSchema),
        mode: "onChange"
    });

    const onSubmit: SubmitHandler<IRegisterType> = (data) => {
        console.log("Валідні дані форми:", data);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center justify-center px-4 mt-20">
                <div className="w-full max-w-md p-8 space-y-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
                    <h1 className="text-2xl font-bold text-center text-gray-900">Реєстрація</h1>

                    <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Ім'я</label>
                                <input  {...register('firstName')}
                                        //{errors.firstName && <p style={{ color: 'red' }}>{errors.firstName.message}</p>}
                                    type="Firstname"
                                    required
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Прізвище</label>
                                <input {...register('lastName')}
                                       //{errors.lastName && <p style={{ color: 'red' }}>{errors.lastName.message}</p>}
                                    type="Lastname"
                                    required
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                />
                            </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input {...register('email')}
                                   //{errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
                                type="email"
                                required
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
                            <input {...register('password')}
                                   //{errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
                                type="password"
                                required
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Підтвердження пароля</label>
                            <input {...register('confirmPassword')}
                                //{errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword.message}</p>}
                                type="confirmpassword"
                                required
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            />
                        </div>


                        <button
                            type="submit"
                            disabled={!isDirty}
                            className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-medium transition-colors"
                        >
                            Заруєструватися
                        </button>
                    </form>
                </div>
            </div>
        </form>
    );
}

export default RegisterPage;