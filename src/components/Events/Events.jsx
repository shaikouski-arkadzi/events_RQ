import { Link, Outlet } from 'react-router-dom';

import Header from '../Header.jsx';
import EventsIntroSection from './EventsIntroSection.jsx';
import FindEventSection from './FindEventSection.jsx';
import NewEventsSection from './NewEventsSection.jsx';
import {motion} from 'framer-motion';

export default function Events() {
  return (
    <>
      <Outlet />
      <Header>
        <motion.div
          whileHover={{scale: 1.1}}
          transition={{type: 'spring', stiffness: 500}}
        >
          <Link to="/events/new" className="button">
            New Event
          </Link>
        </motion.div>
      </Header>
      <main>
        <EventsIntroSection />
        <NewEventsSection />
        <FindEventSection />
      </main>
    </>
  );
}
