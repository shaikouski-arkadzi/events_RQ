import { redirect } from 'react-router-dom';
import { updateEvent, queryClient } from '../../util/http.js';

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const updatedEventData = Object.fromEntries(formData);
  await updateEvent({ id: params.id, event: updatedEventData });
  await queryClient.invalidateQueries(['events']);
  return redirect('../');
}
