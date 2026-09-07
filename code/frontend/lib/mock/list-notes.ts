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
    {
      id: 3,
      text: 'Call Khoa about review notes.',
      created_at: '2025-02-14 16:20',
    },
    {
      id: 2,
      text: 'Buy more sticky paper.',
      created_at: '2025-02-14 10:05',
    },
    {
      id: 1,
      text: 'Ship list notes UI first.',
      created_at: '2025-02-13 18:45',
    },
  ],
  total: 3,
};
