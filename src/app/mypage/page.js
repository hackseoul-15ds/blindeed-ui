"use client"

import TransgateConnect from "@zkpass/transgate-js-sdk"
import { Button, Select } from "antd"
import { Typography } from "antd"

import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

const { Title } = Typography

const APP_ID = "9cadc9d3-77c5-4c70-a32d-c419e74a8ed4"
const userId = 1

async function attest(schemaId, router) {
  try {
    const connector = new TransgateConnect(APP_ID)
    const isAvailable = await connector.isTransgateAvailable()
    if (!isAvailable) {
      return alert("Please install zkPass TransGate")
    }

    const res = await connector.launch(schemaId)

    console.log(res)
    const resp = await axios.post(
      `http://172.18.45.169:8080/verification/${userId}`,
      JSON.stringify({ schemaId, proof: res }),
      { headers: { "Content-Type": "application/json" } }
    )
    console.log(resp)

    location.reload()
  } catch (err) {
    console.error(err)
    alert(JSON.stringify(err))
  }
}

function Attestation({ tags }) {
  const [selectedTag, setSelectedTag] = useState(tags[0]?.value)
  const router = useRouter()

  return (
    <div className="flexitems-center">
      <Select
        defaultValue={tags[0]?.value}
        options={tags.map(({ value, displayText }) => ({
          value,
          label: displayText,
        }))}
        value={selectedTag}
        onSelect={value => setSelectedTag(value)}
        className="mr-3 min-w-24"
        size="small"
      />
      <Button
        type="primary"
        onClick={() =>
          attest(
            tags.find(({ value }) => value === selectedTag).schemaId,
            router
          )
        }
        size="small"
      >
        Attest
      </Button>
    </div>
  )
}

export default function Page() {
  const [myInfo, setMyInfo] = useState({})
  const [conditions, setConditions] = useState([])

  useEffect(() => {
    ;(async () => {
      const resp = await axios.get(
        `http://172.18.45.169:8080/condition?userId=${userId}`
      )
      const { user, conditions } = resp.data

      setMyInfo(user)
      setConditions(conditions)
      console.log(user, conditions)
    })()
  }, [])

  const transformedConditions = conditions.map(condition => ({
    ...condition,
    attested: condition.tags.find(({ value }) =>
      myInfo.tags.find(({ value: userTagValue }) => value === userTagValue)
    )?.displayText,
  }))

  return (
    <div>
      <Title level={3}>My Tags</Title>
      {transformedConditions.map(({ title, tags, attested }) => (
        <div className="flex items-center py-1" key={title}>
          {title}:&nbsp; {attested || <Attestation tags={tags} />}
        </div>
      ))}
    </div>
  )
}
