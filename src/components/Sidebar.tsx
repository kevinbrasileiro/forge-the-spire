import { ArrowDownTrayIcon, BeakerIcon, BookmarkIcon, CloudArrowUpIcon, Cog6ToothIcon, GiftIcon, QuestionMarkCircleIcon, RectangleStackIcon, UserIcon } from "@heroicons/react/24/solid";
import { NavLink } from "react-router";

const tabs = [
	{ route: "/config", label: "Config", icon: Cog6ToothIcon },
	{ route: "/", label: "Cards", icon: RectangleStackIcon },
	{ route: "/characters", label: "Characters", icon: UserIcon },
	{ route: "/relics", label: "Relics", icon: GiftIcon },
	{ route: "/potions", label: "Potions", icon: BeakerIcon },
	{ route: "/events", label: "Events", icon: QuestionMarkCircleIcon },
];

export default function Sidebar({
	appVersion = "0.0.0"
}) {
  return (
	<nav className="w-20 h-screen rounded-lg flex flex-col p-4 justify-between overflow-hidden">
		<div className="flex flex-col space-y-2">
			{tabs.map((tab, index) => {
				const Icon = tab.icon;

				return (
					<NavLink to={tab.route} key={index}>
						{({ isActive }) => (
							<div className={
								isActive
								? "w-full flex items-center justify-center p-3 rounded-lg cursor-pointer bg-primary transition-colors duration-150"
								: "w-full flex items-center justify-center p-3 rounded-lg cursor-pointer hover:bg-primary/20 transition-colors duration-150"
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

			<button
			onClick={() => console.log("import")}
			>
				<div className="w-full flex items-center justify-center p-3 rounded-lg cursor-pointer hover:bg-primary/20 transition-colors duration-150" title="Import Mod">
					<ArrowDownTrayIcon className="w-5 h-5"/>
				</div>
			</button>

			<button
			onClick={() => console.log("save")}
			>
				<div className="w-full flex items-center justify-center p-3 rounded-lg cursor-pointer hover:bg-primary/20 transition-colors duration-150" title="Save Mod">
					<BookmarkIcon className="w-5 h-5"/>
				</div>
			</button>

			<button
			onClick={() => console.log("export")}
			>
				<div className="w-full flex items-center justify-center p-3 rounded-lg cursor-pointer hover:bg-primary/20 transition-colors duration-150" title="Export Mod">
					<CloudArrowUpIcon className="w-5 h-5"/>
				</div>
			</button>

			<a href="https://github.com/kevinbrasileiro/forge-the-spire" target="_blank" className="text-xs text-center mb-2 hover:underline">v{appVersion}</a>
		</div>
	</nav>
  )
}
