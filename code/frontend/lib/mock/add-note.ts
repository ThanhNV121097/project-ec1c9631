export type Note = {
  id: number;
  text: string;
  created_at: string;
};

export type ListNotesResponse = {
  data: Note[];
  total: number;
};

export const listNotesResponse: ListNotesResponse = {
  data: [
    { id: 103, text: 'Order printer paper before Friday meeting.', created_at: '2025-02-14T09:20:00Z' },
    { id: 102, text: 'Call Sam about the lunch plan.', created_at: '2025-02-14T08:05:00Z' },
    { id: 101, text: 'Write release note for sticky notes preview.', created_at: '2025-02-13T19:40:00Z' },
  ],
  total: 3,
};

export const initialNotes = listNotesResponse.data;

