import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api/api';

export const useExpenses = (dayId: number) => {
    return useQuery({
        queryKey: ['expenses', dayId],
        queryFn: () => api.getExpensesByDayId(dayId),
        enabled: !!dayId,
        select: (res) => res.data,
    });
};

export const useCreateExpense = () => {
    const controller = useMutation({
        mutationFn:async (newExpense: ) => {}
    })
};

export const useUpdateExpense = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: any }) =>
            api.updateExpense(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['expenses'] });
        },
    });
};

export const useDeleteExpense = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => api.deleteExpense(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['expenses'] });
        },
    });
};
