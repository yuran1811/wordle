import { useAppSelector } from '@/redux/hooks';
import { Board } from '@cpns/Board/Board';
import { Keyboard } from '@cpns/Keyboard/Keyboard';

const App = () => {
  const board = useAppSelector((s) => s.board.board);

  return (
    <div className="h-screen overflow-y-auto bg-slate-800">
      <a
        href="https://github.com/yuran1811/wordle"
        target="_blank"
        rel="noreferrer noopener"
      >
        <div className="mt-2 px-2 py-4 text-center text-3xl font-bold text-white">
          Wordle
        </div>
      </a>

      <Board board={board} />
      <Keyboard />
    </div>
  );
};

export default App;
