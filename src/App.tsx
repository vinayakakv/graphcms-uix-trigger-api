import {
  Wrapper,
  useFormSidebarExtension,
  FormSidebarExtensionDeclaration,
} from "@graphcms/uix-react-sdk"
import { useEffect, useState } from "react"

const declaration: FormSidebarExtensionDeclaration = {
  name: "Trigger API",
  description: `
    Trigger a POST endpoint.
    Sends current entity data in the JSON body.
    Sends API key in 'authorization' header.
  `,
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
  },
}

function SidebarComponent() {
  const { form, extension, model } = useFormSidebarExtension()
  const [dirty, setDirty] = useState(false)
  const [values, setValues] = useState<Record<string, any>>()
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    form.getState().then(result => {
      setDirty(result.dirty)
      setValues(result.values)
    })
  }, [form])
  const API_KEY = extension.config.API_KEY as string
  const ENDPOINT = extension.config.ENDPOINT as string
  const triggerApi = async () => {
    setLoading(true)
    setMessage("")
    await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({ model: model.apiId, ...values }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`API returned ${response.status}`)
        }
        setMessage("Success")
      })
      .catch((error: Error) => setMessage(`Error: ${error.message}`))
      .finally(() => setLoading(false))
  }
  return (
    <>
      {dirty && <p>Save the content before triggering API</p>}
      <button
        onClick={async () => await triggerApi()}
        disabled={dirty || loading}
      >
        {loading ? "..." : "Trigger API"}
      </button>
      {message && <p>{message}</p>}
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
