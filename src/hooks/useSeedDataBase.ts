import { useMutation } from '@tanstack/react-query';
import { api } from '../api/api';

export const useSeedDatabase = () => {
    return useMutation({
        mutationFn: api.seedDatabase,
    });
};
