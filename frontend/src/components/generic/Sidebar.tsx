import { ArrowDownTrayIcon, BeakerIcon, BoltIcon, BookmarkIcon, Cog6ToothIcon, GiftIcon, QuestionMarkCircleIcon, RectangleStackIcon, UserIcon, WrenchScrewdriverIcon } from "@heroicons/react/24/solid";
import { NavLink } from "react-router";
import Tooltip from "./Tooltip";
import { useContext } from "react";
import { UserDataContext } from "../../UserDataContext";

export default function Sidebar({
	appVersion = "0.0.0"
}) {
	const { userData } = useContext(UserDataContext)

const tabs = [
	{ route: "/config", label: "Config", icon: Cog6ToothIcon },
	{ route: "/", label: "Cards", icon: RectangleStackIcon },
	{ route: "/characters", label: "Characters", icon: UserIcon },
	{ route: "/relics", label: "Relics", icon: GiftIcon },
	{ route: "/potions", label: "Potions", icon: BeakerIcon },
	{ route: "/events", label: "Events", icon: QuestionMarkCircleIcon },
	{ route: "/powers", label: "Buffs/Debuffs", icon: BoltIcon },
];

const buildMod = () => {
	fetch('http://localhost:3000/api/build', {
  	method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(userData)
})
	.then(response => response.json())
	.then(data => console.log(data))
  .catch(error => console.error('Error:', error));
}

const modActions = [
	{ function: () => console.log("Import") , label: "Import Mod", icon: ArrowDownTrayIcon},
	{ function: () => console.log("Save") , label: "Save Mod", icon: BookmarkIcon},
	{ function: buildMod, label: "Build Mod", icon: WrenchScrewdriverIcon},
]

  return (
	<nav className="w-20 h-screen rounded-lg flex flex-col p-4 justify-between overflow-hidden">
		<div className="flex flex-col space-y-2">
			{tabs.map((tab, index) => {
				const Icon = tab.icon

				return (
					<NavLink to={tab.route} key={index}>
						{({ isActive }) => (
							<Tooltip content={tab.label} position="right">
								<div className={
									isActive
									? "w-full flex items-center justify-center p-3 rounded-lg cursor-pointer bg-primary transition-colors duration-150"
									: "w-full flex items-center justify-center p-3 rounded-lg cursor-pointer hover:bg-primary/20 transition-colors duration-150"
								}
								>
									<Icon className="w-5 h-5"/>
								</div>
							</Tooltip>
						)}
					</NavLink>
				)
			})}
		</div>
		<div className="flex flex-col space-y-2">
			{modActions.map((action) => {
				const Icon = action.icon

				return (
					<Tooltip content={action.label} position="right" key={action.label}>
						<button 
							className="w-full flex items-center justify-center p-3 rounded-lg cursor-pointer hover:bg-primary/20 transition-colors duration-150"
							onClick={action.function}	
						>
							<Icon className="w-5 h-5"/>
						</button>
					</Tooltip>
				)
			})}
			<a href="https://github.com/kevinbrasileiro/forge-the-spire" target="_blank" className="text-xs text-center mb-2 hover:underline">v{appVersion}</a>
		</div>
	</nav>
  )
}
