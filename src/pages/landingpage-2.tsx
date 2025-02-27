import BeatsToday from '~/components/home/cta';
import Hero from '~/components/home/hero';
import ProMade from '~/components/home/prosMade';
import Tabs from '~/components/home/tabs';
import OurCustomers from '~/components/home/testimonial';
import Navbar from '~/layouts/appbar';
import Footer from '~/layouts/footer';

export default function Home() {
  return (
    <div className='bg-[#181524]'>
      <Navbar />
      <Hero />
      <ProMade />
      <Tabs />
      <OurCustomers />
      <BeatsToday />
      <Footer />
    </div>
  );
}
