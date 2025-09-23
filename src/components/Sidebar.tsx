import { ArrowDownTrayIcon, ArrowUpTrayIcon, BeakerIcon, BookmarkIcon, Cog6ToothIcon, GiftIcon, QuestionMarkCircleIcon, RectangleStackIcon, UserIcon } from "@heroicons/react/24/solid";
import { NavLink } from "react-router";

const tabs = [
	{ route: "/config", label: "Config", icon: Cog6ToothIcon },
	{ route: "/", label: "Cards", icon: RectangleStackIcon },
	{ route: "/characters", label: "Characters", icon: UserIcon },
	{ route: "/relics", label: "Relics", icon: GiftIcon },
	{ route: "/potions", label: "Potions", icon: BeakerIcon },
	{ route: "/events", label: "Events", icon: QuestionMarkCircleIcon },
];

const modActions = [
	{ route: "/a", label: "Import Mod", icon: ArrowDownTrayIcon },
	{ route: "/aa", label: "Save Mod", icon: BookmarkIcon },
	{ route: "/aaa", label: "Export Mod", icon: ArrowUpTrayIcon },
]

export default function Sidebar({
	appVersion = "0.0.0"
}) {
  return (
	<nav className="w-20 h-[calc(100vh-32px)] rounded-lg flex flex-col p-3 justify-between overflow-hidden">
		<div className="flex flex-col space-y-2">
			{tabs.map((tab, index) => {
				const Icon = tab.icon;

				return (
					<NavLink to={tab.route} key={index}>
						{({ isActive }) => (
							<div className={
								isActive
								? "w-full flex items-center justify-center p-3 rounded-lg cursor-pointer bg-primary transition-colors duration-300"
								: "w-full flex items-center justify-center p-3 rounded-lg cursor-pointer hover:bg-primary/20 transition-colors duration-300"
							}
							title={tab.label}
							>
								<Icon className="w-5 h-5"/>
							</div>
						)}
					</NavLink>
				);
			})}
		</div>
		<div className="flex flex-col space-y-2">
			{modActions.map((item, index) => {
				const Icon = item.icon;

				// TODO: This should be buttons
				return (
					<NavLink to={item.route} key={index}>
						{({ isActive }) => (
							<div className={
								isActive
								? "w-full flex items-center justify-center p-3 rounded-lg cursor-pointer bg-primary transition-colors duration-300"
								: "w-full flex items-center justify-center p-3 rounded-lg cursor-pointer hover:bg-primary/20 transition-colors duration-300"
							}
							title={item.label}
							>
								<Icon className="w-5 h-5"/>
							</div>
						)}
					</NavLink>
				);
			})}
			<a href="https://github.com/kevinbrasileiro/forge-the-spire" target="_blank" className="text-xs text-center mb-2 hover:underline">v{appVersion}</a>
		</div>
	</nav>
  )
}
