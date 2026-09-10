import {type SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import type {ILoginType} from "./types.ts";
import {loginSchema} from "./validate.ts";
import clsx from "clsx";
import axios from "axios";
import api from "../../api/axiosInstance.ts";

const LoginPage = () => {
    const defaultValues : ILoginType =
    {
        email: "",
        password: ""
    }

    const {
        register,
        handleSubmit,
        //reset,
        setError, //Дозволяє в React-Hook-Form записувати помилку
        formState: {errors, isDirty}, //якщо є помилки
    } = useForm<ILoginType>({
        resolver: zodResolver(loginSchema),
        defaultValues
    });

    //оголошується функція. приймає дані які ввів юзер
    const onSubmit: SubmitHandler<ILoginType> = async (data: ILoginType) => {
        try {
            //відправляє http-запит методом post за допомогою axios на сервер
            const response = await api.post('/account/login', data);
            //повертає дані юзера
            console.log('Успішна відповідь сервера:', response.data);
        } catch (error) {
            //видає помилку
            console.error('Помилка при відправці:', error);
            setError("root", { message: "Дані вказано невірно" }); //записуємо помилку що дані вказані невірно
        }
    };

    return (
        <>
            <div className="flex items-center justify-center px-4 mt-10">
                <div className="w-full max-w-md p-8 space-y-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
                    <h1 className="text-2xl font-bold text-center text-gray-900">Вхід</h1>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                        {errors.root && (
                            <div className="text-red-700 text-sm text-center">{errors.root.message}</div>
                        )}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                className={clsx(
                                    "w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:outline-none",
                                    {
                                        "border-red-500 focus:ring-red-500": errors.email,
                                        "border-gray-300 focus:ring-indigo-500": !errors.email,
                                    }
                                )}
                                {...register("email")}
                            />
                            {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
                            <input
                                type="password"
                                className={clsx(
                                    "w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:outline-none",
                                    {
                                        "border-red-500 focus:ring-red-500": errors.password,
                                        "border-gray-300 focus:ring-indigo-500": !errors.password,
                                    }
                                )}
                                {...register("password")}
                            />
                            {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
                        </div>


                        <button
                            type="submit"
                            // disabled={!isDirty}
                            className="w-full py-2.5 cursor-pointer rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-medium transition-colors"
                        >
                            Увійти
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default LoginPage;