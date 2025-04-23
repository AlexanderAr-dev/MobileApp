import { useQuery } from '@tanstack/react-query';
import { api } from '../api/api'

export const useMonths = () => {
    return useQuery({
        queryKey: ['months'],
        queryFn: api.getAllMonths,
        select: (res) => res.data,
    });
};
