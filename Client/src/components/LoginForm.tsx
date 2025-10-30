import { useLogin } from "../Services/Login";

export default function LoginForm() {
  
  const {
    username,
    setUsername,
    password,
    setPassword,
    handleSubmit,
  } = useLogin();

  return (
    <div className="font-sans">
      <div className="relative min-h-screen flex flex-col sm:justify-center items-center bg-gray-100">
        <div className="relative sm:max-w-sm w-full">
          <div className="card bg-blue-400 shadow-lg w-full h-full rounded-3xl absolute transform -rotate-6"></div>
          <div className="card bg-red-400 shadow-lg w-full h-full rounded-3xl absolute transform rotate-6"></div>

          <div className="relative w-full rounded-3xl px-6 py-4 bg-gray-100 shadow-md">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img loading="lazy" src={'gane.webp'} className="h-30" alt="Una descripción de mi imagen." />
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form action="#" method="POST" onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                    Username
                  </label>
                  <div className="mt-2">
                    <input
                      name="username"
                      type="text"
                      placeholder="CP1123456789"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      name="password"
                      type="password"
                      placeholder="*****"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2  shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                    />
                  </div>
                </div>

                <div className="mt-7">
                  <button
                    type="submit"
                    className="cursor-pointer middle none bg-linear-to-tr from-blue-600 to-red-600 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105">
                    Iniciar Sesion
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
