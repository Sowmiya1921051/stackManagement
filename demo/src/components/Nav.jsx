
function Nav() {
    return (
      <div><nav className="bg-violet-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">MyApp</div>
        <ul className="flex space-x-4">
          <li>
            <a href="#" className="text-gray-300 hover:text-white">Home</a>
          </li>
          <li>
            <a href="#" className="text-gray-300 hover:text-white">About</a>
          </li>
          <li>
            <a href="#" className="text-gray-300 hover:text-white">Contact</a>
          </li>
        </ul>
      </div>
    </nav></div>
    )
  }
  
  export default Nav