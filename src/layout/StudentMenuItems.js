import {
    UilHome,
    UilFocusAdd,
    UilBookReader,
    UilArrowGrowth,
    UilAt,
    UilBagAlt,
    UilBookAlt,
    UilBookOpen,
    UilCalendarAlt,
    UilChartBar,
    UilChat,
    UilCheckSquare,
    UilCircle,
    UilClipboardAlt,
    UilClock,
    UilCompactDisc,
    UilCreateDashboard,
    UilDatabase,
    UilDocumentLayoutLeft,
    UilEdit,
    UilEnvelope,
    UilExchange,
    UilExclamationOctagon,
    // UilExpandArrowsAlt,
    UilFile,
    UilFileShieldAlt,
    UilHeadphones,
    UilIcons,
    UilImages,
    UilLayerGroup,
    UilMap,
    UilPresentation,
    UilQuestionCircle,
    UilSearch,
    UilServer,
    UilSetting,
    UilShoppingCart,
    UilSquareFull,
    UilTable,
    UilUsdCircle,
    UilUsersAlt,
    UilFacebookMessenger,
  } from '@iconscout/react-unicons';
  import { Menu } from 'antd';
  import React from 'react';
  import { useTranslation } from 'react-i18next';
  import { useDispatch, useSelector } from 'react-redux';
  import { NavLink } from 'react-router-dom';
  
  import UilEllipsisV from '@iconscout/react-unicons/icons/uil-ellipsis-v';
  import propTypes from 'prop-types';
  import { NavTitle } from './Style';
  import versions from '../demoData/changelog.json';
  import { changeDirectionMode, changeLayoutMode, changeMenuMode } from '../redux/themeLayout/actionCreator';
  
  function MenuItems({ toggleCollapsed }) {
    const { t } = useTranslation();
  
    function getItem(label, key, icon, children, type) {
      return {
        key,
        icon,
        children,
        label,
        type,
      };
    }
  
    const { topMenu } = useSelector((state) => {
      return {
        topMenu: state.ChangeLayoutMode.topMenu,
      };
    });
  
    const dispatch = useDispatch();
  
    const path = '/student';
    const pathName = window.location.pathname;
    const pathArray = pathName && pathName !== '/' ? pathName.split(path) : [];
    const mainPath = pathArray.length > 1 ? pathArray[1] : '';
    const mainPathSplit = mainPath.split('/');
  
    const [openKeys, setOpenKeys] = React.useState(
      !topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : [],
    );
  
    const onOpenChange = (keys) => {
      setOpenKeys(keys[keys.length - 1] !== 'recharts' ? [keys.length && keys[keys.length - 1]] : keys);
    };
  
    const onClick = (item) => {
      if (item.keyPath.length === 1) setOpenKeys([]);
    };
  
    const changeLayout = (mode) => {
      dispatch(changeLayoutMode(mode));
    };
    const changeNavbar = (topMode) => {
      const html = document.querySelector('html');
      if (topMode) {
        html.classList.add('ninjadash-topmenu');
      } else {
        html.classList.remove('ninjadash-topmenu');
      }
      dispatch(changeMenuMode(topMode));
    };
    const changeLayoutDirection = (rtlMode) => {
      if (rtlMode) {
        const html = document.querySelector('html');
        html.setAttribute('dir', 'rtl');
      } else {
        const html = document.querySelector('html');
        html.setAttribute('dir', 'ltr');
      }
      dispatch(changeDirectionMode(rtlMode));
    };
  
    const darkmodeActivated = () => {
      document.body.classList.add('dark-mode');
    };
  
    const darkmodeDiactivated = () => {
      document.body.classList.remove('dark-mode');
    };
  
    const items = [
      getItem(
        <NavLink onClick={toggleCollapsed} to={path}>
            {t('Home')}
        </NavLink>,
        'home',
        !topMenu && <UilHome />,
      ),
      getItem(t('Learn and Practise'), 'Learn and Practise', !topMenu && <UilBookReader />, [
        getItem(
          <NavLink onClick={toggleCollapsed} to={`${path}/course`}>
            {t('Course Curriculum and Classes')}
          </NavLink>,
          'Course Curriculum and Classes',
          null,
        ),
        getItem(
          <NavLink onClick={toggleCollapsed} to={`${path}/assignments`}>
            {t('All Assignment')}
          </NavLink>,
          'All Assignment',
          null,
        ),
        getItem(
          <NavLink onClick={toggleCollapsed} to={`${path}/assesments`}>
            {t('All Assesment')}
          </NavLink>,
          'All Assesment',
          null,
        ),
        getItem(
          <NavLink onClick={toggleCollapsed} to={`${path}/leaderboard`}>
            {t('Leader Board')}
          </NavLink>,
          'Leader Board',
          null,
        ),
      ]),
      getItem(t('Community'), 'Community', !topMenu && <UilFacebookMessenger />, [
        getItem(
            <NavLink onClick={toggleCollapsed} to={`${path}/whatsapp`}>
                {t('WhatsApp')}
            </NavLink>,
            'whatsapp',
            null,
        ),
        getItem(
            <NavLink onClick={toggleCollapsed} to={`${path}/slack`}>
                {t('Slack')}
            </NavLink>,
            'slack',
            null,
        ),
        getItem(
            <NavLink onClick={toggleCollapsed} to={`${path}/discussionhub`}>
                {t('Discussion Hub')}
            </NavLink>,
            'discussionhub',
            null,
        ),
      ]),
      getItem(t('More'), 'More', !topMenu && <UilFocusAdd />, [
        getItem(
            <NavLink onClick={toggleCollapsed} to={`${path}/personaldetail`}>
                {t('Personal Detail')}
            </NavLink>,
            'personaldetail',
            null,
        ),
        getItem(
            <NavLink onClick={toggleCollapsed} to={`${path}/helpcentre`}>
                {t('Help Center')}
            </NavLink>,
            'helpcentre',
            null,
        ),
      ]),
    ];
  
    return (
      <Menu
        onOpenChange={onOpenChange}
        onClick={onClick}
        mode={!topMenu || window.innerWidth <= 991 ? 'inline' : 'horizontal'}
        // // eslint-disable-next-line no-nested-ternary
        defaultSelectedKeys={
          !topMenu
            ? [
                `${
                  mainPathSplit.length === 1 ? 'home' : mainPathSplit.length === 2 ? mainPathSplit[1] : mainPathSplit[2]
                }`,
              ]
            : []
        }
        defaultOpenKeys={!topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : []}
        overflowedIndicator={<UilEllipsisV />}
        openKeys={openKeys}
        items={items}
      />
    );
  }
  
  MenuItems.propTypes = {
    toggleCollapsed: propTypes.func,
  };
  
  export default MenuItems;
  