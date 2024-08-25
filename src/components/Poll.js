import { Button, Card, Progress, Radio, Space, Tag, Typography } from "antd"
import axios from "axios"
import { useState } from "react"

const { Title, Paragraph } = Typography

const userId = 1

export default function Post({
  id,
  title,
  content,
  pollOptions,
  conditions,
  conditionConfirmed,
  voted,
}) {
  const [selectedOption, setSelectedOption] = useState(null)
  const [viewResult, setViewResult] = useState(false)

  const optionsTotalCount = pollOptions.reduce(
    (prev, { count }) => prev + count,
    0
  )

  const canVote = conditionConfirmed && !voted
  const isVoting = canVote && !viewResult

  return (
    <Card>
      <Title level={5}>{title}</Title>
      <Paragraph>{content}</Paragraph>
      <div className="border">
        <div className="border-b p-3">Poll</div>
        <div className="p-3">
          <div className="mb-2">
            {conditions.map(({ id, title, tags }) => (
              <div className="py-1" key={id}>
                {title}:{" "}
                {tags.map(({ id, displayText }) => (
                  <Tag bordered={false} color="magenta" key={id}>
                    {displayText}
                  </Tag>
                ))}
              </div>
            ))}
          </div>
          <div>
            <span>Voting Options:</span>
            {pollOptions.map(({ id, title, count }) => (
              <div
                key={id}
                className={`flex my-2 p-2 ${
                  isVoting && "cursor-pointer hover:bg-slate-100"
                } ${isVoting && "border-2"} rounded ${
                  isVoting && selectedOption === id && "border-blue-400"
                }`}
                onClick={() => {
                  if (!voted) {
                    setSelectedOption(id)
                  }
                }}
              >
                <div className="basis-24 flex-shrink-0">{title}</div>
                {(!canVote || voted || viewResult) && (
                  <Progress
                    percent={Math.round((count / optionsTotalCount) * 100)}
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
                        `http://172.18.45.169:8080/vote?userId=${userId}`,
                        JSON.stringify({
                          id: 1,
                          pollOptions: [{ id: selectedOption }],
                        }),
                        {
                          headers: {
                            "Content-Type": "application/json",
                          },
                        }
                      )
                      console.log("Vote", resp)
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
