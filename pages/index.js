import Head from 'next/head'
import Banner from '../components/Banner'
import Footer from '../components/Footer';
import Header from '../components/Headers'
import LargeCard from '../components/LargeCard';
import MediumCard from '../components/MediumCard';
import Modal from '../components/Modal';
import SmallCard from '../components/SmallCard';

export default function Home({exploreData, cardsData}) {

  return (
    <div className="">
      <Head>
        <title>Airbnb</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Modal />
      <Banner />
      <main className='max-w-7xl mx-auto px-8 sm:px-16'>
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5">Explore Nearby</h2>
          {/* pull some data from server - api endpoints */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {exploreData?.map((item) => (
            <SmallCard key={item.location} img={item.img} distance={item.distance} location={item.location}/>
          ))}
          </div>
        </section>
        
            
        <section>
          <h2 className="text-4xl font-semibold pb-5 pt-2 mt-4">Live Anywhere</h2>
            <div className="flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3">
              {cardsData?.map((item) => (
            <MediumCard key={item.title} img={item.img} title={item.title}/>
          ))}
            </div>
        </section>
        <section>
          <LargeCard 
          img="https:links.papareact.com/4cj"
          title="The Greatest Outdoors"
          description="Wishlists curated by Airbnb."
          buttonText="Get Inspired"/>
        </section>      
      </main>
      <Footer />
    </div>
  )
}

export async function getStaticProps(){
  const exploreData = await fetch('https://links.papareact.com/pyp')
  .then(
     res => res.json()
  );

  const cardsData = await fetch('https://links.papareact.com/zp1')
  .then (
    res => res. json()
  )
  return {
    props: {
      exploreData,
      cardsData

    }
  }
}