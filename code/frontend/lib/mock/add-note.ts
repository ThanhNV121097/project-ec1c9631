export type Note = {
  id: number;
  text: string;
  created_at: string;
};

export const initialNotes: Note[] = [
  { id: 103, text: 'Order printer paper before Friday meeting.', created_at: '2025-02-14 09:20' },
  { id: 102, text: 'Call Sam about the lunch plan.', created_at: '2025-02-14 08:05' },
  { id: 101, text: 'Write release note for sticky notes preview.', created_at: '2025-02-13 19:40' },
];
