import { Link } from 'react-router-dom';

const EventItem = ({ event, onViewDetails, isExpanded }) => {
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  return (
    <article className="event-item">
      <img src={event.image} alt={event.title} />
      <div className="event-item-content">
        <div>
          <h2>{event.title}</h2>
          <p className="event-item-date">{formattedDate}</p>
        </div>
        <div className={`challenge-item-details ${isExpanded ? 'expanded' : ''}`}>
          <p>
            <button onClick={onViewDetails}>
              View Details
              <span className="challenge-item-details-icon">&#9650;</span>
            </button>
          </p>

          {isExpanded && (
            <div>
              <p className="challenge-item-description">
                {event.description}
              </p>
            </div>
          )}
        </div>
        <p>
          <Link to={`/events/${event.id}`} className="button">
            View Details
          </Link>
        </p>
      </div>
    </article>
  );
};

export default EventItem;
