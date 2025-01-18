
import style from './App.module.scss';
import { Pages } from '../pages';

const App = (): JSX.Element => {
  return (
    <div className={style.App}>
      <Pages />
    </div>
  );
};

export default App;
