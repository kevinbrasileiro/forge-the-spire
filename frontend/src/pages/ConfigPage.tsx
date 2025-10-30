import { useContext } from "react"
import { UserDataContext } from "../UserDataContext"
import { Input } from "../components/generic/Input"

export default function ConfigPage() {
  const { userData, setUserData } = useContext(UserDataContext)

  const handleTextInputChange = (field: string, value: string) => {
    setUserData(prev => ({
      ...prev,
      modMeta: {
        ...prev.modMeta,
        [field]: value || ""
      }
    }))
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="max-w-7xl">
        <h1 className="text-3xl tracking-widest text-center">
          Forge the Spire
        </h1>
        <h1 className="text-xl text-gold/75 font-light tracking-widest mb-6 text-center">
          Mod Metadata
        </h1>
      </div>
      <div className="flex flex-col gap-4 w-[48rem]">
        <div className="flex gap-x-4">
          <Input
            label="Mod Name"
            value={userData.modMeta.name}
            onChange={(e) => handleTextInputChange("name", e.target.value)}
          />
          <Input
            label="Mod Id"
            value={userData.modMeta.id}
            onChange={(e) => handleTextInputChange("id", e.target.value.toLowerCase().trim())}
          />
        </div>
        <div className="flex gap-x-4">
          <Input
            label="Author(s)"
            value={userData.modMeta.author}
            onChange={(e) => handleTextInputChange("author", e.target.value)}
          />
          <Input
            label="Mod Version"
            value={userData.modMeta.version}
            onChange={(e) => handleTextInputChange("version", e.target.value)}
            placeholder="1.0.0"
          />
        </div>
          <Input
            label="Mod Description"
            value={userData.modMeta.description}
            onChange={(e) => handleTextInputChange("description", e.target.value)}
            multiline
            height="140px"
          />
      </div>
    </div>
  )
}
