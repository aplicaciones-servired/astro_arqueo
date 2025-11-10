import { useLogin } from "@/Services/Login";


export default function LoginForm() {
  const { username, setUsername, password, setPassword, handleSubmit } = useLogin();

  return (
    <div className="font-sans">
      <div className="relative min-h-screen flex flex-col sm:justify-center items-center bg-gray-100">
        <div className="relative sm:max-w-sm w-full">
          <div className="card bg-blue-400 shadow-lg w-full h-full rounded-3xl absolute transform -rotate-6"></div>
          <div className="card bg-red-400 shadow-lg w-full h-full rounded-3xl absolute transform rotate-6"></div>

          <div className="relative w-full rounded-3xl px-6 py-4 bg-gray-100 shadow-md">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img loading="lazy" src={"gane.webp"} className="h-30" alt="Logo Gane" />
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-900">
                    Usuario
                  </label>
                  <div className="mt-2">
                    <input
                      name="username"
                      type="text"
                      placeholder="CP1123456789"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-gray-300 placeholder:text-gray-400 shadow-lg hover:bg-blue-100 focus:outline-2 focus:outline-blue-400"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                    Contraseña
                  </label>
                  <div className="mt-2">
                    <input
                      name="password"
                      type="password"
                      placeholder="*****"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-gray-300 placeholder:text-gray-400 shadow-lg hover:bg-blue-100 focus:outline-2 focus:outline-blue-400"
                    />
                  </div>
                </div>

                <div className="mt-7">
                  <button
                    type="submit"
                    className="cursor-pointer bg-gradient-to-tr from-blue-600 to-red-600 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner transition-transform duration-300 hover:scale-105">
                    Iniciar Sesión
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
