import { IconProps } from "../../types";
import GameIcon from "../common/GameIcon";
import HomeIcon from "../common/HomeIcon";
import LeaderboardIcon from "../common/LeaderboardIcon";
import SettingsIcon from "../common/SettingsIcon";


interface NavItem {
  to: string;
  label: string;
  icon: React.FC<IconProps>;
}

const navData: NavItem[] = [
  { to: '/', label: 'Home', icon: HomeIcon },
  { to: '/games', label: 'Games', icon: GameIcon },
  { to: '/leaderboard', label: 'Leaders board', icon: LeaderboardIcon },
  { to: '/settings', label: 'Settings', icon: SettingsIcon },
];

export default navData;
