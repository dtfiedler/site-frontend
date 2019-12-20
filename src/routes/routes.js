
import HistoryIcon from '@material-ui/icons/History';
import SearchIcon from '@material-ui/icons/Search';
import { Search, History } from '../pages';

const routes = [
    {
        path: '/search',
        title: 'Search',
        icon: SearchIcon,
        component: Search,
      },
      {
        path: '/history',
        title: 'History',
        icon: HistoryIcon,
        component: History
      }
]

export default routes;