import { createSlice } from "@reduxjs/toolkit";
import { Logger } from "sass";

export const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    subject: 0,
    subJectName:"SCIENCE",
    questionLength: 10,
    answers: [],
    mark: 0,
  },
  reducers: {
    selectSubject: (state, action) => {
      state.subject = action.payload;
    },
    findQuestionLength: (state, action) => {
      state.questionLength = action.payload;
    },
    checkAnswer: (state, action) => {
      const { questionNumber, selectedOption, correctOption } = action.payload;
      const existingAnswerIndex = state.answers.findIndex(
        (answer) => answer.questionNumber === questionNumber
      );

      if (existingAnswerIndex >= 0) {
        state.answers[existingAnswerIndex] = {
          questionNumber,
          selectedOption,
          correctOption,
        };
      } else {
        state.answers.push({
          questionNumber,
          selectedOption,
          correctOption,
        });
      }
      console.log("n is", state.answers[0]);
    },
    setMark: (state) => {
      state.mark = state.answers.reduce((total, answer) => {
        if (answer.selectedOption === answer.correctOption) {
          return total + 4;
        } else {
          return total - 1;
        }
      }, 0);
      console.log("mark is", state.mark);
    },
    clearSession: (state) => {
      state.answers = [];
    },
    setSubjectName:(state,action)=>{
      state.subJectName=action.payload
      console.log('sub name',state.subJectName);
    }
  },
});

export const { selectSubject, findQuestionLength, checkAnswer, setMark,clearSession,setSubjectName } =
  quizSlice.actions;
export default quizSlice.reducer;
