import Image from "next/image"
import { 
    SearchIcon,
    GlobeAltIcon,
    MenuIcon,
    UserCircleIcon,
    UsersIcon 
} from '@heroicons/react/solid'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { useState } from "react"
import { useRouter } from "next/dist/client/router";
const Header = ({placeholder}) => {
    const [searchInput, setSearchInput] = useState('')
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [numberOfGuest, setNumberOfGuest] = useState(1)
    const router = useRouter();
    const selectRange = {
        startDate: startDate,
        endDate: endDate,
        key:'Selection'
    }
    const handleSelect = ranges => {
        setStartDate(ranges.Selection.startDate)
        setEndDate(ranges.Selection.endDate)
    }
    const search  = () =>{
        router.push({
            pathname:'/search',
            query:{
                location: searchInput,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                numberOfGuest: numberOfGuest
            } 
        })
    }
    
    return ( 
        <header className="sticky top-0 z-10 grid grid-cols-3 bg-white shadow-md p-5 md:px-10">
            {/* left */}
            <div onClick = {() => router.push("/")}className="relative flex items-center h-10 cursor-pointer my-auto"> 
                <Image src="https://links.papareact.com/qd3"
                layout="fill" 
                objectFit="contain"
                objectPosition="left"/>
            </div>
            {/* search */}
            <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
                <input type="text" value={searchInput}
                className="flex-grow pl-5 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400" 
                placeholder={placeholder || "Start your Search"} onChange={(e) => setSearchInput(e.target.value)} />
                <SearchIcon 
                className="hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2"/>
            </div>
            <div className="flex items-center justify-end space-x-4 text-gray-500">
                <p className="hidden md:inline cursor-pointer hover:text-red-400">Become a host</p>
                <GlobeAltIcon className="h-6 cursor-pointer hover:text-red-400"/>
                <div className="flex border-2 items-center space-x-2 p-2 rounded-full hover:border-red-400">
                    <MenuIcon className="h-6 hover:text-red-400"/>
                    <UserCircleIcon className="h-6 hover:text-red-400"/>
                </div>
            </div>
            {searchInput && (
                <div className="flex flex-col col-span-3 mx-auto">
                   <DateRangePicker
                    ranges={[selectRange]}
                    minDate={new Date()}
                    rangeColors={["#FD5B61"]}
                    onChange={handleSelect}
                    className="transition duration-500 ease-in-out"/>
                <div className="flex items-center border-b mb-4">
                    <h2 className="text-2xl flex-grow font-semibold">Number of Guests</h2>
                    <UsersIcon  className="h-5"/>
                    <input type="number" value={numberOfGuest}
                    className="w-12 pl-2 text-lg outline-none text-red-400" onChange={(e) => setNumberOfGuest(e.target.value)}/>
                </div>
                <div className="flex">
                    <button className="flex-grow text-gray-500" onClick={()=>setSearchInput('')}>Cancel</button>
                    <button className="flex-grow text-red-400" onClick={search}>Search</button>
                </div>
                </div>

                
            )}
        </header> 

    );
}
 
export default Header;