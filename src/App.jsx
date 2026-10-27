import { usePath } from './router.jsx';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import Welcome from './pages/Welcome.jsx';
import ResetPassword from './pages/ResetPassword.jsx';

// Each page is a component in src/pages/, routed by its kebab-cased file name.
const routes = {
  '/signup': Signup,
  '/login': Login,
  '/welcome': Welcome,
  '/reset-password': ResetPassword,
};

export default function App() {
  const path = usePath();
  const Page = routes[path] ?? Signup;
  return <Page />;
}
