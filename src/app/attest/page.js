"use client"

import TransgateConnect from "@zkpass/transgate-js-sdk"

export default function Page() {
  const APP_ID = "9cadc9d3-77c5-4c70-a32d-c419e74a8ed4"
  const SCHEMA_ID = "cf5779ea59dc4cac811b2b365a9f04b8"

  const attest = async () => {
    try {
      const connector = new TransgateConnect(APP_ID)
      const isAvailable = await connector.isTransgateAvailable()
      if (!isAvailable) {
        return alert("Please install zkPass TransGate")
      }

      const res = await connector.launch(SCHEMA_ID)
      alert(JSON.stringify(res))
    } catch (err) {
      alert(JSON.stringify(err))
      console.error(err)
    }
  }

  return (
    <div className="flex justify-center items-center">
      <button
        className="bg-white rounded-xl p-3 text-black"
        onClick={() => attest()}
      >
        Attest
      </button>
    </div>
  )
}
