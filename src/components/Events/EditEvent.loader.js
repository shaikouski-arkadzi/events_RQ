import { getEvent, queryClient } from '../../util/http.js';

export const loader = ({ params }) => {
  //fetchQuery = useQuery
  return queryClient.fetchQuery({
    queryKey: ['events', params.id],
    queryFn: () => getEvent({ id: params.id }),
  });
}
