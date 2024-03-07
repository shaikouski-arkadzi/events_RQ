import { useState } from 'react';
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion';

import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import EventItem from './EventItem.jsx';
import { getEvents } from '../../util/http.js';

export default function NewEventsSection() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['events'],
    queryFn: getEvents,
    //staleTime: 5000, //время через сколько отправится запрос
    //gcTime: 30000 //время через сколько сбросится кэш
  });

  const [expanded, setExpanded] = useState(null);

  const handleViewDetails = (id) => {
    setExpanded((prevId) => {
      if (prevId === id) {
        return null;
      }

      return id;
    });
  }

  let content;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = <ErrorBlock error={error} />;
  }

  if (data) {
    content = (
      <motion.ul
        className="events-list"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.05
            }
          }
        }}
      >
        {data.map((event) => (
          <motion.li
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 }
            }}
            key={event.id}
          >
            <EventItem 
              event={event}
              onViewDetails={() => handleViewDetails(event.id)}
              isExpanded={expanded === event.id}
            />
          </motion.li>
        ))}
      </motion.ul>
    );
  }

  return (
    <section className="content-section" id="new-events-section">
      <header>
        <h2>Recently added events</h2>
      </header>
      {content}
    </section>
  );
}
