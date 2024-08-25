"use client"

import Poll from "@/components/Poll"
import { API_URL, USERNAME } from "@/consts"
import axios from "axios"
import { useEffect, useState } from "react"

export default function Home() {
  const [polls, setPolls] = useState([])

  useEffect(() => {
    ;(async () => {
      const resp = await axios.get(`${API_URL}/polls?username=${USERNAME}`)
      const { polls } = resp.data
      setPolls(polls)
    })()
  }, [])

  return (
    <main className="p-3">
      {polls.map(props => (
        <Poll {...props} key={props.id} />
      ))}
    </main>
  )
}
