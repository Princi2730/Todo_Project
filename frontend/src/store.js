import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reduxtoolkit/authSlice'
import loginReducer from './reduxtoolkit/loginSlice'
import todosReducer from './reduxtoolkit/Todos';

export const store = configureStore({
  reducer: {
      auth:authReducer,
      login:loginReducer,
      createTodos:todosReducer,
      
  },
})