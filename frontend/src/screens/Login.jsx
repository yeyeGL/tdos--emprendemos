import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useState } from "react";

const Login = () => {
  const redirect = useNavigate();

  const {
    register: login,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/api/login", data);
      console.log(res.data);
      reset()
      redirect("/home");
    } catch (error) {
      console.log("Error", error.response.data);
    }
  });

  const errorMessages = Object.values(errors).map((error) => error.message);

  return (
    <section className="flex h-screen"  style={{ backgroundImage: `url(/img/fondov4.png)` }} >
      {/* Lado izquierdo */}
      <div className="hidden md:flex flex-1 rounded-lg bg-gradient-to-tl from-secondary via-green-400 to-green-800 from-30% via-50% to-90% items-center justify-center p-10 animate-jump animate-once animate-duration-[3000ms] animate-delay-[2000ms]">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold mb-4 text-white text-login-left animate-duration-[4000ms] animate-delay-[4000ms] ">
           Bienvenidos a la pagina oficial de TdoS Emprendemos
          </h1>
          <p className="text-xl mb-4 text-green-900 font-semibold text-login-left animate-duration-[5000ms] animate-delay-[5000ms] ">
            Aca fomentamos los emprendimientos de los estudiantes
          </p>
          <p className="text-lg text-green-800 font-bold text-login-left animate-duration-[6000ms] animate-delay-[6000ms] ">
            Ingresa y mira los productos de los estudiantes o publica tus productos
          </p>
        </div>
      </div>

      {/* Lado derecho con la imagen de fondo y el formulario centrado */}
      <div
        className="flex flex-1 items-center justify-center bg-cover bg-left-center relative"
        style={{ backgroundImage: `url(/img/fondov1.png)` }}
      >
        <div className="flex flex-col items-center justify-center w-full max-w-md">

          {/* Título que solo aparece en dispositivos móviles */}
          <h1 className="text-3xl font-extrabold mb-6 text-center text-green-700 block md:hidden form-login">
            Bienvenidos
            <p>TDOS-EMPRENDEMOS</p>
          </h1>
          <form onSubmit={onSubmit} className="form-login">
            <h2 className="text-3xl font-extrabold mb-6 text-center text-green-700">Iniciar Sesion</h2>

            <div className="mb-4 relative">
              <input
                type="email"
                {...login("email", {
                  required: "Email requerido",
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                    message: "Email invalido",
                  },
                })}
                placeholder="Email"
                className="inputs-login pl-10"
              />
            </div>

            <div className="mb-6 relative">
              <input
                type={showPassword ? "text" : "password"}
                {...login("password", {
                  required: "Contraseña requerida",
                  minLength: {
                    value: 6,
                    message:"La contraseña debe contener al menos 6 caracteres",
                  },
                })}
                placeholder="Contraseña"
                className="inputs-login pl-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-4 text-green-600"
              >
                {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
              </button>
            </div>

            {errorMessages.length > 0 && (
              <div className="mb-4 text-red-600 font-semibold">
                {errorMessages.map((msg, index) => (
                  <p key={index}>{msg}</p>
                ))}
              </div>
            )}

          <button type="submit" className="button-login">Iniciar Sesion</button>

            <div className="mt-4 text-center">
              <h1 className="font-semibold">¿No tienes una cuenta?</h1>
              <Link
                to="/register"
                className="text-green-800 text-base hover:text-green-700 transition-colors duration-300 ease-in-out relative group font-bold"
              >
                Crear una cuenta
                <span className="absolute left-0 bottom-0 w-0.5 h-0.5 bg-green-900 transition-all duration-300 ease-in-out group-hover:w-full"></span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
