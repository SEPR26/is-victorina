const answers = [
  { q_id: 1, answer: "a" },
  { q_id: 2, answer: "a" },
  { q_id: 3, answer: "a" },
  { q_id: 4, answer: "a" },
  { q_id: 5, answer: "a" },
  { q_id: 6, answer: "a" },
];

const questions = [
  {
    id: 1,
    question: "test1",
    options: [
      { answer: "a", description: "answer a" },
      { answer: "b", description: "answer b" },
      { answer: "c", description: "answer c" },
    ],
  },
  {
    id: 2,
    question: "test2",
    options: [
      { answer: "a", description: "answer a" },
      { answer: "b", description: "answer b" },
      { answer: "c", description: "answer c" },
    ],
  },
  {
    id: 3,
    question: "test3",
    options: [
      { answer: "a", description: "answer a" },
      { answer: "b", description: "answer b" },
      { answer: "c", description: "answer c" },
    ],
  },
  {
    id: 4,
    question: "test4",
    options: [
      { answer: "a", description: "answer a" },
      { answer: "b", description: "answer b" },
      { answer: "c", description: "answer c" },
    ],
  },
  {
    id: 5,
    question: "test5",
    options: [
      { answer: "a", description: "answer a" },
      { answer: "b", description: "answer b" },
      { answer: "c", description: "answer c" },
    ],
  },
  {
    id: 6,
    question: "test6",
    options: [
      { answer: "a", description: "answer a" },
      { answer: "b", description: "answer b" },
      { answer: "c", description: "answer c" },
    ],
  },
];

export const api = {
  getQuestions: (limit) => {
    return questions.slice(0, limit);
  },
  getAnswers: (questions) => {
    return answers.filter((ans) => questions.some(({ id }) => id === ans.q_id));
  },
};
