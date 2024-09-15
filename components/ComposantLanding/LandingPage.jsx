import Header from '../header/Header'
import Carousel from '../corps/Caroussel'
import Footer from '../footer/Footer'
import Image from 'next/image'
import Link from 'next/link'

function LandingPage(){
    return(
        <>

            <Header/>
            <Carousel/>

            {/* ---------------------------DIVISION 2-------------------------- */}
            <div className="bg-gray-100">
                <div className='contener-second'>
                    <h1>notre solution</h1>
                    <p>AgriMarket is a marketplace that connects producers and buyers in Cameroon.</p>
                    <div className='contener-ol'>
                        <div className='contener-ol-abs'>
                        <img src="/asset/images/venn_diagram-86237fd7d36cf102e842a7e327e490137502292585d150a47faa520bc8980db1.png"/>
                        </div>


                        <div className='contener-ol-text'>
                            <p>We manage the transactions of agricultural products through a digital platform, supported by our network of partner services. AgriMarket facilitates online payments between buyers and sellers, quality control, and end-to-end freight management.</p>
                            <strong><p>We offer you the opportunity to easily sell your crops on our platform.</p></strong>
                            
                        </div>
                    </div>
                    <Link href="/marcher"><button type="button" class="text-white bg-green-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-white-300 font-medium rounded-lg text-sm px-16 py-2 m-16 text-center dark:bg-white-600 dark:hover:bg-green-700 dark:focus:ring-green-800">EXPLORER MARCHER</button></Link>
                </div>
            </div>

            {/* -----------------------------------DIVISION 3-------------------------- */}


            {/* ------------------------------DIVISION 4--------------------------- */}

            <div id='Noservice' className='contener-n4'>

                <div className="mt-12">
                <h1 className="text-3xl font-semibold text-green-600 text-center mb-8">Our Products and Services</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h4 className="text-2xl font-semibold mb-4">Fresh Vegetables</h4>
                        <p className="text-gray-700">
                            We offer a variety of fresh, locally grown vegetables. From leafy greens to root vegetables, all our
                            produce is harvested at peak freshness.
                        </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h4 className="text-2xl font-semibold mb-4">Organic Fruits</h4>
                        <p className="text-gray-700">
                            Our selection of organic fruits includes apples, berries, citrus fruits, and more. Grown without
                            pesticides, ensuring they are safe and healthy.
                        </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h4 className="text-2xl font-semibold mb-4">Farm Equipment</h4>
                        <p className="text-gray-700">
                            We also supply modern farming equipment to support farmers in improving productivity and efficiency in
                            their operations.
                        </p>
                        </div>
                    </div>
                </div>
                <div className='contener-pro-n4'>
                    <div className="contener-image">
                        <Image  src="/asset/images/Services.jpg" width={900} 
                        height={1000} /> 
                    </div>
                </div>
                
            </div>
            
            {/* <Footer/>         */}
    </>
    )
}

export default LandingPage