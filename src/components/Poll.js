import { API_URL, USERNAME } from "@/consts"
import { Button, Card, Progress, Tag, Typography } from "antd"
import axios from "axios"
import { useState } from "react"

const { Title, Paragraph } = Typography

export default function Post({
  _id,
  title,
  content,
  options,
  conditions,
  conditionMet,
  voted,
}) {
  const [selectedOption, setSelectedOption] = useState(null)
  const [viewResult, setViewResult] = useState(false)

  const optionsTotalCount = options.reduce(
    (prev, { voters }) => prev + voters.length,
    0
  )

  const canVote = conditionMet && !voted
  const isVoting = canVote && !viewResult

  return (
    <Card>
      <Title level={5}>{title}</Title>
      <Paragraph>{content}</Paragraph>
      <div className="border">
        <div className="border-b p-3">Poll</div>
        <div className="p-3">
          {/* <div className="mb-2">
            {conditions.map(andConditions => JSON.stringify(andConditions))}
          </div> */}
          <div>
            <span>Voting Options:</span>
            {options.map(({ name, voters }) => (
              <div
                key={name}
                className={`flex my-2 p-2 ${
                  isVoting && "cursor-pointer hover:bg-slate-100"
                } ${isVoting && "border-2"} rounded ${
                  isVoting && selectedOption === name && "border-blue-400"
                }`}
                onClick={() => {
                  if (!voted) {
                    setSelectedOption(name)
                  }
                }}
              >
                <div className="basis-24 flex-shrink-0">{name}</div>
                {(!canVote || voted || viewResult) && (
                  <Progress
                    percent={Math.round(
                      (voters.length / optionsTotalCount) * 100
                    )}
                  />
                )}
              </div>
            ))}
          </div>
          <div>
            {canVote && !voted ? (
              !viewResult ? (
                <>
                  <Button
                    block
                    type="primary"
                    className="mb-1"
                    disabled={selectedOption == null}
                    onClick={async () => {
                      const resp = await axios.post(
                        `${API_URL}/vote?username=${USERNAME}`,
                        JSON.stringify({
                          pollId: _id,
                          option: selectedOption,
                        }),
                        {
                          headers: {
                            "Content-Type": "application/json",
                          },
                        }
                      )
                      console.log("Vote", resp)
                      location.reload()
                    }}
                  >
                    Vote
                  </Button>
                  <Button block type="link" onClick={() => setViewResult(true)}>
                    View Result
                  </Button>
                </>
              ) : (
                <Button block type="link" onClick={() => setViewResult(false)}>
                  Vote
                </Button>
              )
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}
