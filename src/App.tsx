import { Board } from '@cpns/Board/Board';
import { Keyboard } from '@cpns/Keyboard/Keyboard';
import { Heading } from '@cpns/Heading/Heading';
import { RootState } from '@shared/types/redux';
import { useSelector } from 'react-redux';

const App = () => {
  const board = useSelector((s: RootState) => s.board.board);

  return (
    <div className="h-[100vh] overflow-y-auto bg-slate-900">
      <Heading>Wordle</Heading>
      <Board board={board} />
      <Keyboard />
    </div>
  );
};

export default App;
