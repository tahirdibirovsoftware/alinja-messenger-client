
import style from './App.module.scss';
import { Copyright } from '../shared/ui/Copy/Copyright';
import { Pages } from '../pages';

const App = (): JSX.Element => {
  return (
    <div className={style.App}>
      <Pages />
      <Copyright />
    </div>
  );
};

export default App;
