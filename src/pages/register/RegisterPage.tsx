import {type SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {registerSchema} from "./validate.ts";
import type {IRegisterType} from "./types.ts";

const RegisterPage = () => {

    const defaultValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    }

    const {
        register,
        handleSubmit,
        //reset,
        formState: {errors, isDirty}, //якщо є помилки
    } = useForm<IRegisterType>({
        resolver: zodResolver(registerSchema),
        defaultValues
    });

    const onSubmit: SubmitHandler<IRegisterType> = (data) => {
        console.log("Валідні дані форми:", data);
    };

    return (
            <div className="flex items-center justify-center px-4 mt-10">
                <div className="w-full max-w-md p-8 space-y-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
                    <h1 className="text-2xl font-bold text-center text-gray-900">Реєстрація</h1>

                    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Ім'я</label>
                                <input  {...register('firstName')}
                                    type="Firstname"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                />
                                {errors.firstName && <p style={{ color: 'red' }}>{errors.firstName.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Прізвище</label>
                                <input {...register('lastName')}
                                    type="Lastname"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                />
                                {errors.lastName && <p style={{ color: 'red' }}>{errors.lastName.message}</p>}
                            </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input {...register('email')}
                                type="email"

                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            />
                            {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
                            <input {...register('password')}
                                type="password"

                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            />
                            {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Підтвердження пароля</label>
                            <input {...register('confirmPassword')}
                                type="confirmpassword"

                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            />
                            {errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword.message}</p>}
                        </div>


                        <button
                            type="submit"
                            disabled={!isDirty}
                            className="w-full py-2.5 cursor-pointer rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-medium transition-colors"
                        >
                            Заруєструватися
                        </button>
                    </form>
                </div>
            </div>
    );
}

export default RegisterPage;