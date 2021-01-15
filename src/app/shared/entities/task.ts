export type Status = 'TODO' | 'PROGRESS' | 'DONE';
export interface ITask {
    id: number;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    labels: string[];
    status: Status;
}
