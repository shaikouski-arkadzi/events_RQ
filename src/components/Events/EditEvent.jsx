import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { updateEvent, queryClient, getEvent } from '../../util/http.js';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';

const EditEvent = () => {
  const navigate = useNavigate();
  const params = useParams();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['events', params.id],
    queryFn: () => getEvent({ id: params.id }),
  });

  const { mutate } = useMutation({
    mutationFn: updateEvent,
    //выполняется после отправки запроса до получения данных от сервера
    onMutate: async (data) => {
      const newEvent = data.event;
      //отменяем загрузку новых данных по запросу
      await queryClient.cancelQueries({ queryKey: ['events', params.id] });
      const previousEvent = queryClient.getQueryData(['events', params.id]);

      //сетим в закэшированнные данные новые данные
      queryClient.setQueryData(['events', params.id], newEvent);
      //переносим в context
      return { previousEvent };
    },
    onError: (error, data, context) => {
      queryClient.setQueryData(['events', params.id], context.previousEvent);
    },
    //отрабатывает после любого исхода мутации
    onSettled: () => {
      queryClient.invalidateQueries(['events', params.id]);
    }
  });

  const handleSubmit = (formData) => {
    mutate({ id: params.id, event: formData });
    navigate('../');
  }

  const handleClose = () => {
    navigate('../');
  }

  let content;

  if (isPending) {
    content = (
      <div className="center">
        <LoadingIndicator />
      </div>
    );
  }

  if (isError) {
    content = (
      <>
        <ErrorBlock error={error} />
        <div className="form-actions">
          <Link to="../" className="button">
            Okay
          </Link>
        </div>
      </>
    );
  }

  if (data) {
    content = (
      <EventForm inputData={data} onSubmit={handleSubmit}>
        <Link to="../" className="button-text">
          Cancel
        </Link>
        <button type="submit" className="button">
          Update
        </button>
      </EventForm>
    );
  }

  return <Modal onClose={handleClose}>{content}</Modal>;
}

export default EditEvent;