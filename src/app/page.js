"use client"

import Poll from "@/components/Poll"
import axios from "axios"
import { useEffect, useState } from "react"

// const polls = [
//   {
//     id: 1,
//     title: "Poll 1",
//     content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id arcu interdum, finibus lectus ut, suscipit dolor. Nulla pharetra dui vel orci rhoncus rhoncus a quis libero. Vestibulum magna odio, lacinia eget arcu non, pretium volutpat elit. Maecenas dui turpis, aliquam vitae feugiat ac, semper in libero. Cras egestas dignissim pulvinar. Donec mattis vel erat vitae pharetra. Nulla eu purus auctor, consectetur lorem sed, lacinia libero. Phasellus accumsan eros euismod massa vestibulum, eu consequat enim tempor. Sed aliquet tortor sit amet leo faucibus venenatis. Aenean rhoncus ex non neque molestie, eget bibendum augue sagittis. Maecenas tellus nisi, egestas ut egestas nec, commodo vitae nulla.

// Ut vestibulum bibendum massa, eget vestibulum felis facilisis pharetra. Integer nec sollicitudin velit. Proin iaculis eros quis metus consequat faucibus. Maecenas luctus lectus non tincidunt condimentum. Vestibulum congue mattis semper. Suspendisse molestie velit dictum, feugiat mi eu, laoreet velit. Nunc id mauris sed risus dictum mollis.

// Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer varius sem id massa convallis bibendum. Pellentesque vitae odio blandit, tristique leo quis, laoreet sapien. Nulla sed pharetra risus. Nunc placerat pellentesque urna vel blandit. Morbi non nibh eleifend, scelerisque risus eget, aliquam massa. Suspendisse vel porttitor odio, nec faucibus eros.`,
//     pollOptions: [
//       {
//         id: 1,
//         title: "맞다",
//         count: 30,
//       },
//       {
//         id: 2,
//         title: "아니다",
//         count: 5,
//       },
//     ],
//     conditions: [
//       {
//         id: 1,
//         title: "Age",
//         tags: [
//           {
//             id: 1,
//             value: "age_20s",
//             schemaId: "5408834bba27466aa3d0fa0c874fd513",
//             displayText: "Age is 20s",
//           },
//           {
//             id: 2,
//             value: "age_30s",
//             schemaId: "04987d0ee03540b381407a7f1747074a",
//             displayText: "Age is 30s",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: 2,
//     title: "Poll 2",
//     content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id arcu interdum, finibus lectus ut, suscipit dolor. Nulla pharetra dui vel orci rhoncus rhoncus a quis libero. Vestibulum magna odio, lacinia eget arcu non, pretium volutpat elit. Maecenas dui turpis, aliquam vitae feugiat ac, semper in libero. Cras egestas dignissim pulvinar. Donec mattis vel erat vitae pharetra. Nulla eu purus auctor, consectetur lorem sed, lacinia libero. Phasellus accumsan eros euismod massa vestibulum, eu consequat enim tempor. Sed aliquet tortor sit amet leo faucibus venenatis. Aenean rhoncus ex non neque molestie, eget bibendum augue sagittis. Maecenas tellus nisi, egestas ut egestas nec, commodo vitae nulla.

// Ut vestibulum bibendum massa, eget vestibulum felis facilisis pharetra. Integer nec sollicitudin velit. Proin iaculis eros quis metus consequat faucibus. Maecenas luctus lectus non tincidunt condimentum. Vestibulum congue mattis semper. Suspendisse molestie velit dictum, feugiat mi eu, laoreet velit. Nunc id mauris sed risus dictum mollis.

// Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer varius sem id massa convallis bibendum. Pellentesque vitae odio blandit, tristique leo quis, laoreet sapien. Nulla sed pharetra risus. Nunc placerat pellentesque urna vel blandit. Morbi non nibh eleifend, scelerisque risus eget, aliquam massa. Suspendisse vel porttitor odio, nec faucibus eros.`,
//     pollOptions: [
//       {
//         id: 3,
//         title: "잘못했다",
//         count: 20,
//       },
//       {
//         id: 4,
//         title: "잘못안했다",
//         count: 100,
//       },
//     ],
//     conditions: [
//       {
//         id: 2,
//         title: "Salary",
//         tags: [
//           {
//             id: 3,
//             value: "salary_8000",
//             schemaId: "5408834bba27466aa3d0fa0c874fd513",
//             displayText: "Salary is within range 8000~9000",
//           },
//           {
//             id: 4,
//             value: "salary_9000",
//             schemaId: "04987d0ee03540b381407a7f1747074a",
//             displayText: "Salary is within range 9000~10000",
//           },
//         ],
//       },
//     ],
//   },
// ]

const userId = 1

export default function Home() {
  const [polls, setPolls] = useState([])

  useEffect(() => {
    ;(async () => {
      const resp = await axios.get(
        `http://172.18.45.169:8080/poll?userId=${userId}`
      )
      const polls = resp.data

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
