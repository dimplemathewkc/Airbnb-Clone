import Header from "../components/Headers";
import Map from "../components/Map"
import Footer from "../components/Footer"
import { useRouter } from "next/dist/client/router";
import { format } from "date-fns";
import InfoCard from "../components/InfoCard";

const Search = ({searchResult}) => {
    const router = useRouter();
    const {location, startDate, endDate, numberOfGuest} = router.query;
    const formatted_startDate = format(new Date(startDate), 'dd MMMM yy')
    const formatted_endDate = format(new Date(endDate), 'dd MMMM yy')
    const range = `${formatted_startDate} - ${formatted_endDate}`
    return ( 
        <div>
            <Header placeholder={`${location} | ${range} |${numberOfGuest}`}/>
            <main className="grid-cols-1 md:flex">
                <section className="flex-grow pt-14 px-6" >  
                    <p className="text-xs">300+ Stays {range} in {location} for {numberOfGuest} guests</p>
                    <h1 className="text-3xl font-semibold mt-2 mb-6">Stay in <span className="text-red-400">{location}</span></h1>
                    <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
                        <p className="button">Cancellation Flexibility</p>
                        <p className="button">Type of Place</p>
                        <p className="button">Price</p>
                        <p className="button">More Filters</p>
                    </div>
                    <div className="flex flex-col">
                        {searchResult.map(({img, location,title,description,star, price, total}) => (
                            <InfoCard 
                             key={img}
                             img={img}
                             location={location}
                             title={title}
                             description={description}
                             star={star}
                             price={price}
                             total={total}
                            />
                        ))}
                        
                    </div>
                </section>
                <section class="flex-grow pt-14 px-6 xl:inline-flex xl:min-w-[600px]">
                    <Map searchResult={searchResult} />
                </section>
            </main>
            <Footer />
        </div>
        
     );
}
 
export default Search;

export async function getServerSideProps(){
    const searchResult = await fetch("https://links.papareact.com/isz")
    .then(
        res => res.json()
    )
    return {
        props:{
            searchResult,
        },
    }
}