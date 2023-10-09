import Link from 'next/link';

export default function Profile() {
  return (
    <>
      <section
        className={
          'flex flex-col gap-4 px-12 pt-12 items-center justify-around text-center'
        }
      >
        <div className="bg-white shadow-md rounded m-auto h-auto flex">
          <div className="p-16 rounded shadow py-16 flex flex-col gap-4">
            <h2 className="text-2xl font-bold mb-8 text-center text-redMain">
              Atualizar dados
            </h2>
            <form className="flex flex-col gap-6 items-center">
              <div className="">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="Nome"
                />
              </div>
              <div className="">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Password"
                />
              </div>
              <div className="mb-4">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="phone"
                  type="text"
                  placeholder="Telefone"
                />
              </div>
              <div className="flex items-center justify-between">
                <Link
                  className="border-2 border-white bg-redMain text-white font-bold p-2 px-8 rounded-3xl focus:outline-none focus:shadow-outline"
                  href="/authenticated/profile"
                >
                  Atualizar
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
