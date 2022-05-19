import {
  Wrapper,
  useFormSidebarExtension,
  FormSidebarExtensionDeclaration,
} from "@graphcms/uix-react-sdk"
import { useEffect, useState } from "react"

const declaration: FormSidebarExtensionDeclaration = {
  name: "POST API",
  description: "Call any POST endpoint",
  extensionType: "formSidebar",
  config: {
    API_KEY: {
      type: "string",
      displayName: "API Key",
      description: "The API Key, will be used in the Authorization header",
      required: true,
    },
    ENDPOINT: {
      type: "string",
      displayName: "API Endpoint",
      required: true,
    },
    INCLUDE_BODY: {
      type: "boolean",
      displayName: "Whether to include the complete object or not",
      required: true,
      defaultValue: true,
    },
  },
}

function SidebarComponent() {
  const { form } = useFormSidebarExtension()
  const [dirty, setDirty] = useState(false)
  const [values, setValues] = useState<Record<string, any>>()
  useEffect(() => {
    form.getState().then(result => {
      setDirty(result.dirty)
      setValues(result.values)
    })
  }, [form])
  return (
    <>
      {dirty && <p>Save the content before triggering API</p>}
      <button
        onClick={() => console.log(JSON.stringify(values, null, 2))}
        disabled={dirty}
      >
        Trigger API
      </button>
    </>
  )
}

function App() {
  return (
    <Wrapper declaration={declaration} debug>
      <SidebarComponent />
    </Wrapper>
  )
}

export default App
