import { useQuery } from '@tanstack/react-query';
import { api } from '../api/api';

export const useDays = (monthId: number) => {
    return useQuery({
        queryKey: ['days', monthId],
        queryFn: () => api.getDaysByMonthId(monthId),
        enabled: !!monthId,
        select: (res) => res.data,
    });
};
