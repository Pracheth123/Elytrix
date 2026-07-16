import { useEffect, useState } from 'react';
import { fetchContent } from './api.js';
import fallback from './data/fallback.json';

import Header from './components/Header.jsx';
import MobileActionBar from './components/MobileActionBar.jsx';
import Divider from './components/Divider.jsx';

// Blueprint sections 1 → 13, in the specified build order
import Hero from './sections/Hero.jsx';
import About from './sections/About.jsx';
import Credentials from './sections/Credentials.jsx';
import Registration from './sections/Registration.jsx';
import Conditions from './sections/Conditions.jsx';
import Services from './sections/Services.jsx';
import CareerTimeline from './sections/CareerTimeline.jsx';
import Resources from './sections/Resources.jsx';
import Publications from './sections/Publications.jsx';
import Reviews from './sections/Reviews.jsx';
// Hidden for now: booking/appointment section disabled — restore the import
// and the <Booking /> element below to bring it back.
// import Booking from './sections/Booking.jsx';
import Location from './sections/Location.jsx';
import Faq from './sections/Faq.jsx';
import Footer from './sections/Footer.jsx';

export default function App() {
  // Render immediately from the local fallback, then swap in the API payload —
  // the page never blanks if the API or MongoDB is down.
  const [content, setContent] = useState(fallback);

  useEffect(() => {
    let cancelled = false;
    fetchContent().then((data) => {
      if (!cancelled && data) setContent(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <Header profile={content.profile} />
      {/* pt offsets the floating fixed header, which no longer occupies page flow */}
      <main className="pb-16 pt-20 md:pb-0 sm:pt-24">
        <Hero hero={content.hero} profile={content.profile} />
        <About bio={content.bio} profile={content.profile} />
        <Credentials
          qualifications={content.qualifications}
          memberships={content.memberships}
          fellowships={content.fellowships}
        />
        <Registration registration={content.registration} />
        <Conditions conditions={content.conditions} />
        <Divider />
        <Services services={content.services} profile={content.profile} />
        <CareerTimeline careerTimeline={content.careerTimeline} profile={content.profile} />
        <Resources resources={content.resources} />
        <Publications publications={content.publications} fellowships={content.fellowships} />
        <Divider />
        <Reviews reviews={content.reviews} />
        {/* Hidden for now: <Booking booking={content.booking} profile={content.profile} /> */}
        <Location clinic={content.clinic} profile={content.profile} />
        <Faq faqs={content.faqs} />
      </main>
      <Footer footer={content.footer} profile={content.profile} />
      <MobileActionBar profile={content.profile} />
    </>
  );
}
