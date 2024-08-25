"use client"

import TransgateConnect from "@zkpass/transgate-js-sdk"
import { Button, Select, Space } from "antd"
import { Typography } from "antd"
import { useEffect, useState } from "react"
import axios from "axios"
import Link from "next/link"
import { API_URL, USERNAME } from "@/consts"

const { Title } = Typography

const APP_ID = "9cadc9d3-77c5-4c70-a32d-c419e74a8ed4"

async function attest(schemaId) {
  try {
    const connector = new TransgateConnect(APP_ID)
    const isAvailable = await connector.isTransgateAvailable()
    if (!isAvailable) {
      return alert("Please install zkPass TransGate")
    }

    const res = await connector.launch(schemaId)

    const resp = await axios.post(
      `${API_URL}/verify?username=${USERNAME}`,
      JSON.stringify({ schemaId, proof: res }),
      { headers: { "Content-Type": "application/json" } }
    )

    location.reload()
  } catch (err) {
    console.error(err)
    alert(JSON.stringify(err))
  }
}

function Attestation({ tags }) {
  const [selectedTag, setSelectedTag] = useState(tags[0]?.tag)

  return (
    <div className="flexitems-center">
      <Select
        defaultValue={tags[0]?.tag}
        options={tags.map(({ tag, displayText }) => ({
          value: tag,
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
          attest(tags.find(({ tag }) => tag === selectedTag).schemaId)
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
  const [tags, setTags] = useState([])

  useEffect(() => {
    ;(async () => {
      const resp = await axios.get(`${API_URL}/mypage?username=${USERNAME}`)
      const user = resp.data

      setMyInfo(user)
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      const resp = await axios.get(`${API_URL}/tags`)
      const { tags } = resp.data

      setTags(tags)
    })()
  }, [])

  const transformedTagCategories = tags.map(({ category, tags }) => ({
    category,
    tags,
    attested: tags.find(({ tag }) =>
      myInfo.tags.find(userTag => tag === userTag)
    )?.displayText,
  }))

  return (
    <div>
      <Title level={2}>My Page</Title>
      <Space className="mb-3">
        <Link href="/login">Login</Link>
        <Link href="/logout">Logout</Link>
      </Space>
      <Title level={3}>My Tags</Title>
      {transformedTagCategories.map(({ category, tags, attested }) => (
        <div className="flex items-center py-1" key={category}>
          {category}:&nbsp; {attested || <Attestation tags={tags} />}
        </div>
      ))}
    </div>
  )
}
