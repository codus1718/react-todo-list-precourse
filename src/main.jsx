import React, { useState } from 'react';
import TodoList from './TodoList';

// App 컴포넌트: 전체 Todo 앱을 관리하는 컴포넌트
function App() {
    // todos: 할 일 목록 상태
    // input: 입력 필드 상태
    // filter: 필터 상태 (all, active, completed)
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all'); 

  // 할 일 추가 함수
  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { text: input, completed: false }]);
      setInput('');
    }
  };

  // 입력 필드 변경 핸들러
  const handleInputChange = (e) => setInput(e.target.value);

  // 입력 필드에서 Enter 키 누를 때 호출
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') addTodo();
  };

  // 할 일 삭제 함수
  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, idx) => idx !== index);
    setTodos(newTodos);
  };

  // 할 일 완료 상태 토글 함수
  const toggleComplete = (index) => {
    setTodos(prevTodos => 
      prevTodos.map((todo, idx) => 
        idx === index ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // 필터링된 할 일 목록 반환 함수
  const filterTodos = () => {
    switch (filter) {
      case 'completed':
        return todos.filter(todo => todo.completed);
      case 'active':
        return todos.filter(todo => !todo.completed);
      default:
        return todos;
    }
  };

  return (
    <div className="App">
      <h1>todos</h1>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="What needs to be done?"
      />
      {/* 필터 버튼들 */}
      <div>
        <button onClick={() => { setFilter('all'); console.log('Filter set to all'); }}>All</button>
        <button onClick={() => { setFilter('active'); console.log('Filter set to active'); }}>Active</button>
        <button onClick={() => { setFilter('completed'); console.log('Filter set to completed'); }}>Completed</button>
      </div>
      {/* TodoList 컴포넌트에 할 일 목록, 삭제 함수, 완료 상태 토글 함수 전달 */}
      <TodoList todos={todos} deleteTodo={deleteTodo} toggleComplete={toggleComplete} />
    </div>
  );
}

export default App;
