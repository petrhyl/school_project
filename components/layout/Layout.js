import MainNavigation from './MainNavigation';
import cssStyles from './Layout.module.css';

function Layout(props) {
  return (
    <div>
      <MainNavigation />
      <main className={cssStyles.main}>{props.children}</main>
    </div>
  );
}

export default Layout;
