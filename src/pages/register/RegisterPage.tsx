import {type SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {registerSchema} from "./validate.ts";
import type {IRegisterType} from "./types.ts";
import {useState} from "react";
import {useNavigate} from "react-router";
import type {ILoginResponse} from "../login/types.ts";
import api from "../../api/axiosInstance.ts";

const RegisterPage = () => {

    const [preview, setPreview] = useState<string | null>(null);

    const defaultValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        imageFile: null
    }

    const {
        register,
        handleSubmit,
        setValue, //для запису даних у react-hook-form
        //reset,
        formState: {errors, isDirty}, //якщо є помилки
    } = useForm<IRegisterType>({
        resolver: zodResolver(registerSchema),
        defaultValues
    });

    const navigate = useNavigate();

    const onSubmit = async (data: IRegisterType) => {
        try {
            //відправляє http-запит методом post за допомогою axios на сервер
            const response = await api.post<ILoginResponse>('/account/register', data);
            localStorage.setItem("auth", response.data.token);
            navigate("/"); // перехід на головну

            //повертає дані юзера
            //console.log('Успішна відповідь сервера:', response.data);
        } catch (error) {
            //видає помилку
            console.error('Помилка при відправці:', error);
            //setError("root", { message: "Дані вказано невірно" }); //записуємо помилку що дані вказані невірно
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;

        setValue("imageFile", file, { shouldValidate: true });

        if (file) {
            const url = URL.createObjectURL(file);
            setPreview(url);
        } else {
            setPreview(null);
        }
    }

    return (
            <div className="flex items-center justify-center px-4 mt-10">
                <div className="w-full max-w-md p-8 space-y-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
                    <h1 className="text-2xl font-bold text-center text-gray-900">Реєстрація</h1>

                    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-300 bg-gray-100 flex items-center justify-center">
                                {preview ? (
                                    <img
                                        src={preview}
                                        alt="Прев'ю аватару"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-xs text-gray-400">Фото</span>
                                )}
                            </div>

                            <label className="text-sm font-medium text-indigo-600 cursor-pointer hover:text-indigo-700">
                                Обрати зображення
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </label>

                            {errors.imageFile && (
                                <div className="text-red-700 text-sm">{errors.imageFile.message}</div>
                            )}
                        </div>

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