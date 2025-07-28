
const Navbar = () => {
    return (
        <>
            <div className="flex py-3 flex-wrap justify-around bg-green-700 font-bold text-white ">
                <h1 className="text-lg font-semibold cursor-pointer">ToDo App</h1>
                <ul className="flex gap-[40px] text-m">
                    <li className="cursor-pointer">Home</li>
                    <li className="cursor-pointer">Products</li>
                    <li className="cursor-pointer">About</li>
                    <li className="cursor-pointer">Contact</li>
                </ul>


            </div>
        </>
    )
}

export default Navbar
